'use strict';
const checklist = {
	items: [],
	currentItem: null
};
var checklistID, moveElem, moveID, notesOpen = false, itemDragDown = false;

document.addEventListener("DOMContentLoaded", () => load(checklist));
document.addEventListener("keypress", function(k) {
	if (k.key === "Enter" && !checklist.currentItem) addItem(true);
	else if (k.key === "Enter" && checklist.currentItem && !notesOpen) saveChecklistOptions();
	else if (k.code === "Minus" && k.altKey && k.path[0].classList.contains("text")) {
		k.preventDefault();
		if (k.path[0].parentNode.previousElementSibling) k.path[0].parentNode.previousElementSibling.children[1].focus();
		else if (!k.path[0].parentNode.previousElementSibling && k.path[0].parentNode.nextElementSibling) k.path[0].parentNode.nextElementSibling.children[1].focus();
		sendMessage("removeItem", getItemID("list", k));
		k.path[0].parentNode.remove();
		snackbar("Removed Checklist Item");
		if (checklist.items.length === 0) animateEmpty();
	}
});

function copyURL() {
	chrome.tabs.query(
		{ active: true, },
		tabs => document.getElementById("options_input").value = tabs[0].url
	);
}

var animateEmpty = () => document.getElementById("list").classList.add("empty-animate");

function load(list) {
	var add = document.getElementById("add"), del = document.getElementById("delete"), copy = document.getElementById("copy"),
		save = document.getElementById("options_save"), notes_save = document.getElementById("notes_save"),
		filter = document.getElementById("filter");
	save.addEventListener("click", saveChecklistOptions);
	notes_save.addEventListener("click", closeNote);
	del.addEventListener("click", function(evt) {
		sendMessage("removeItem", getItemID("list", checklist.currentItem));
		checklist.currentItem.remove();
		document.getElementById("menu_options").classList.remove("open");
		if (checklist.length === 0) animateEmpty();
	})
	addRipplesTo(add);
	addRipplesTo(filter);
	addRipplesTo(del);
	addRipplesTo(copy);
	addRipplesTo(save);
	addRipplesTo(notes_save);
	addRipplesTo(document.getElementById("filterDate"));
	addRipplesTo(document.getElementById("filterPriority"));
	addRipplesTo(document.getElementById("filterCompletion"));
	addTooltip(add, "New Item");
	addTooltip(copy, "Use Current Tab");
	addTooltip(filter, "Sort List");
	add.addEventListener("click", addItem);
	copy.addEventListener("click", copyURL);
	filter.addEventListener("click", () => openOptions("filter", "filter-menu"));
	document.getElementById("options_date").addEventListener("focus", openInputMenu);
	document.getElementById("filterDate").addEventListener("click", () => filterChecklist("list", "Date", getItemDue));
	document.getElementById("filterPriority").addEventListener("click", () => filterChecklist("list", "Priority", getItemPriority));
	document.getElementById("filterCompletion").addEventListener("click", () => filterChecklist("list", "Completion", getItemCompletion));
	document.body.addEventListener("click", (evt) => closeOptions(evt, "filter-menu"));
	document.getElementById("options_slider").addEventListener("input", updateSlider);
	document.getElementById("overlay").addEventListener("click", saveChecklistOptions);
	document.getElementById("menu_options").addEventListener("mousedown", function(evt) {
		var elem = evt.target, dates = document.getElementById("date_chooser");
		if (dates.classList.contains("menu-open") && !dates.contains(elem) && !(elem.nodeName === "INPUT" && elem.id === "options_date"))
			closeInputMenu();
	});
	document.getElementById("date_prev").addEventListener("click", () => modifyDate(-1));
	document.getElementById("date_next").addEventListener("click", () => modifyDate(1));
	chrome.storage.sync.get(['checklist', 'darkMode'], ({checklist, darkMode}) => {
		if (checklist.length > 0) list.items = checklist;
		if (darkMode) document.body.classList.add('dark');
		addStoredChecklist();
	});
	window.addEventListener("mouseup", () => stopChecklistDrag());
}

function addItem(sync) {
	var list = document.getElementById("list"), container = document.createElement("div"), check = document.createElement("input"),
		text = document.createElement("input"), options = document.createElement("div");
	container.classList.add("itm");
	check.classList.add("check");
	check.type = "checkbox";
	check.addEventListener("change", evt => sendMessage("checkItem", getItemID("list", evt)));
	text.classList.add("text");
	text.type = "text";
	text.addEventListener("keyup", evt => sendMessage("setText", getItemID("list", evt), evt.target.value));
	options.classList.add("options");
	options.addEventListener("click", checklistOptions);
	options.addEventListener("mousedown", checklistPreDrag);
	options.addEventListener("mouseup", () => itemDragDown = false);
	options.addEventListener("mouseout", () => itemDragDown = false);
	addTooltip(options, "Item Options");
	addRipplesTo(options);
	container.appendChild(check);
	container.appendChild(text);
	container.appendChild(options);
	list.appendChild(container);
	if (sync) {
		text.focus();
		sendMessage("addItem");
	}
	return container;
}

function checklistPreDrag(evt) {
	itemDragDown = true;
	setTimeout(function() {
		if (itemDragDown) dragChecklistItem(evt)
	}, 300);
}

function addStoredChecklist() {
	for (let i = 0; i < checklist.items.length; i++) {
		var info = checklist.items[i], itm = addItem(false);
		checklist.currentItem = itm;
		itm.setAttribute("priority", info[2]);
		itm.firstChild.checked = info[0];
		itm.children[1].value = info[1];
		setPriority(checklist.items[i][2], false);
		for (let j = 0; j < checklist.items[i][3].length; j++) addPin(checklist.items[i][3][j], false);
		if (checklist.items[i][4].length > 0) addDate(checklist.items[i][4].join("/"), false);
	}
	checklist.currentItem = void 0;
}

function setPriority(priority, sync) {
	checklist.currentItem.setAttribute("priority", priority);
	checklist.currentItem.classList.remove("priority-low", "priority-high");
	checklist.currentItem.children[0].classList.remove("check-priority-high");
	if (priority === 0) {
		checklist.currentItem.classList.add("priority-low");
	} else if (priority >= 190) {
		checklist.currentItem.classList.add("priority-high");
		checklist.currentItem.children[0].classList.add("check-priority-high");
	}
	if (sync) sendMessage("setPriority", checklistID, priority)
}

function addPin(url, sync) {
	var file = document.createElement("a"), segments = url.split("."), extension = segments[segments.length - 1],
		firstSect = url.substring(0, 30);
	file.classList.add("checklist-file");
	if (url.substring(0, 4) === "http" || url.substring(0, 8) === "file:///") {
		file.href = url;
		file.target = "_blank";
		switch (extension) {
			case "pdf":
				file.classList.add("file");
				addTooltip(file, "View File")
				break;
			case "png":
			case "jpg":
			case "gif":
			case "jpeg":
				file.classList.add("file-image");
				addTooltip(file, "View Image");
				break;
			case "mp4":
			case "webm":
			case "mkv":
				file.classList.add("file-video");
				addTooltip(file, "Open Video");
				break;
			default:
				addTooltip(file, "View Website");
		}
		if (firstSect === "https://drive.google.com/file/" || firstSect === "https://docs.google.com/docume") {
			file.classList.add("file");
			file.setAttribute("tooltip", "View File");
		} else if (firstSect === "https://docs.google.com/presen") {
			file.classList.add("file-presentation");
			file.setAttribute("tooltip", "View Slides");
		} else if (url.substring(0, 10) === "data:image") {
			file.classList.add("file-image-error");
			file.setAttribute("tooltip", "Image Unavailable");
			file.removeAttribute("href");
		} else if (firstSect === "https://photos.google.com/phot") {
			file.classList.add("file-image");
			file.setAttribute("tooltip", "View Image");
		} else if (firstSect === "https://www.youtube.com/watch?" || url.substring(0, 17) === "https://youtu.be/") {
			file.classList.add("file-video");
			file.setAttribute("tooltip", "Open Video");
		}
	} else {
		file.addEventListener("click", viewNote);
		file.setAttribute("note", url);
		file.classList.add("file-note");
		addTooltip(file, "Edit Note");
	}
	addRipplesTo(file);
	checklist.currentItem.classList.add("input-file");
	checklist.currentItem.appendChild(file);
	if (sync) sendMessage("addFile", checklistID, url);
}

function addDate(date, sync) {
	var btn = document.createElement("div"), d;
	if (date.length < 6) date += "/" + new Date().getFullYear();
	d = new Date(date);
	btn.classList.add("checklist-date");
	btn.setAttribute("date", (+d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());
	if (sync) sendMessage("setDate", checklistID, [(+d.getMonth() + 1), d.getDate(), d.getFullYear()]);
	d.setMonth(d.getMonth());
	btn.setAttribute("dueDate", d.getDate());
	btn.setAttribute("dueDay", d.toString().split(' ')[0]);
	addTooltip(btn, "Due Date");
	checklist.currentItem.classList.add("input-date");
	checklist.currentItem.appendChild(btn);
}

function removePin(elemClass, removeClass) {
	for (let i = 3; i < checklist.currentItem.childElementCount; i++) {
		var itm = checklist.currentItem.children[i];
		if (itm.classList.contains(elemClass)) {
			itm.remove();
         if (elemClass == "checklist-file") sendMessage("removeFile", checklistID, itm.href);
         else if (elemClass == "checklist-date") sendMessage("setDate", checklistID, []);
			break;
		}
	}
	checklist.currentItem.classList.remove(removeClass);
}

function updateSlider(evt) {
	var label = document.getElementById("slider_text");
	evt.target.style.background = "linear-gradient(to right, var(--color-accent) " + evt.target.value + "px, #d1d1d1 " + evt.target.value + "px)";
	if (evt.target.value == 0) {
		evt.target.classList.add("slider-none");
		label.firstChild.nodeValue = "Low";
	}
	else if (evt.target.value >= 190) label.firstChild.nodeValue = "High";
	else {
		evt.target.classList.remove("slider-none");
		label.firstChild.nodeValue = "Medium";
	}
}

function checklistOptions(evt) {
	checklist.currentItem = evt.target.parentNode;
	checklistID = getItemID("list", checklist.currentItem);
	var slider = document.getElementById("options_slider"), menu = document.getElementById("menu_options"),
		link = document.getElementById("options_input"), file = checklist.currentItem.children[3],
		dateItem = checklist.currentItem.children[4] ? checklist.currentItem.children[4] : checklist.currentItem.children[3],
		dateInput = document.getElementById("options_date"), date = [];
	if (file && file.href) link.value = file.href;
	else if (file && file.getAttribute("note")) link.value = file.getAttribute("note");
	if (dateItem && dateItem.classList.contains("checklist-file")) dateItem = void 0;
	if (dateItem) date = dateItem.getAttribute("date").split("/");
	dateInput.value = date.join("/");
	slider.value = checklist.currentItem.getAttribute("priority");
	slider.dispatchEvent(new Event('input'));
	menu.classList.add("open");
}

function saveChecklistOptions() {
	var slider = document.getElementById("options_slider"), menu = document.getElementById("menu_options"),
		link = document.getElementById("options_input"), date = document.getElementById("options_date");
	menu.classList.remove("open");
	removePin("checklist-file", "input-file");
	removePin("checklist-date", "input-date");
	if (link.value.length > 0) addPin(link.value, true);
	if (date.value.length > 0) addDate(date.value, true);
	link.value = "";
	date.value = "";
	setPriority(parseInt(slider.value), true);
	checklist.currentItem = void 0;
	closeInputMenu();
}

function viewNote(evt) {
	notesOpen = true;
	checklist.currentItem = evt.target.parentNode;
	checklistID = getItemID("list", checklist.currentItem);
	document.getElementById("note_editor").value = evt.target.getAttribute("note");
	document.getElementById("menu_notes").classList.add("open");
}

function closeNote() {
	notesOpen = false;
	var link = document.getElementById("note_editor"),
		date = checklist.currentItem.lastElementChild.classList.contains("checklist-date") ? checklist.currentItem.lastElementChild.getAttribute("date") : void 0;
	removePin("checklist-file", "input-file");
	removePin("checklist-date", "input-date");
	if (link.value.length > 0) addPin(link.value, true);
	if (date) addDate(date, true);
	document.getElementById("menu_notes").classList.remove("open");
	link.value = "";
	checklist.currentItem = void 0;
	checklistID = void 0;
}

function dragChecklistItem(evt) {
	var body = document.getElementById("list"), end = document.createElement("div");
	for (let i = 0, l = body.childElementCount; i < l; i++) {
		body.children[i].addEventListener("mouseover", addChecklistDrop);
	}
	end.id = "list_end";
	end.classList.add("itm", "itm-end");
	end.addEventListener("mouseover", addChecklistDrop);
	body.appendChild(end);
	moveElem = evt.target.parentNode;
	moveID = getItemID("list", moveElem);
	window.addEventListener("mousemove", updateChecklistDrag);
}

function addChecklistDrop(evt) {
	var itm = evt.target, body = document.getElementById("list");
	for (let i = body.childElementCount - 1, l = 0; i >= l; i--) {
		if (body.children[i].classList.contains("itm-drop")) body.children[i].remove();
	}
	while (!itm.classList.contains("itm")) itm = itm.parentNode;
	if (!itm.previousElementSibling || (itm.previousElementSibling && !itm.previousElementSibling.classList.contains("itm-drop"))) {
		var drop = document.createElement("div");
		drop.addEventListener("mouseup", stopChecklistDrag);
		drop.classList.add("itm-drop");
		itm.parentNode.insertBefore(drop, itm);
	}
}

function updateChecklistDrag(evt) {
	if (!moveElem.classList.contains("itm-moving")) {
		moveElem.classList.add("itm-moving");
		moveElem.style.width = moveElem.parentNode.clientWidth - 5 + "px";
	}
	moveElem.style.left = evt.pageX + "px";
	moveElem.style.top = evt.pageY + "px";
}

function stopChecklistDrag(evt) {
	var body = document.getElementById("list"), end = document.getElementById("list_end"), dest;
	if (evt) body.insertBefore(moveElem, evt.target.nextElementSibling);
	if (end) end.remove();
	for (let i = body.childElementCount - 1, l = 0; i >= l; i--) {
		body.children[i].removeEventListener("mouseover", addChecklistDrop);
		if (body.children[i].classList.contains("itm-drop")) body.children[i].remove();
	}
	if (moveElem && evt && moveID !== dest) {
		dest = getItemID("list", moveElem);
		sendMessage("moveItem", moveID, dest);
	}
	if (moveElem) {
		moveElem.style.left = "auto";
		moveElem.style.top = "auto";
		moveElem.style.width = "98%";
		moveElem.classList.remove("itm-moving");
	}
	moveElem = void 0;
	window.removeEventListener("mousemove", updateChecklistDrag);
}
