'use strict'
const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var elemPressed, currRipple, removeCountdown, tooltipDelayTimer, hovering = false, totalTooltips = 0, sbOpen = false, inputMenu, chooserDate = [], sbTimer;

function addRipplesTo(elem) {
	elem.addEventListener("mousedown", createRipple);
	elem.addEventListener("mouseup", removeRipple);
	elem.addEventListener("mouseout", () => endRipples(true));
}

function createRipple(event) {
	var container, ripple = document.createElement("div"), ref = elemPressed ? document.getElementById(elemPressed.id) : true,
		style, color, bgcolor;
	if (!elemPressed || elemPressed != event.target || ref) {
		if (elemPressed && ref) elemPressed.removeChild(document.getElementById("_ripple-container"));
		container = document.createElement("div");
		elemPressed = event.target;
		container.classList.add("-ripple-container");
		container.id = "_ripple-container";
		elemPressed.appendChild(container);
	} else container = document.getElementById("_ripple-container");
	style = window.getComputedStyle(elemPressed);
	color = style.getPropertyValue("color");
	bgcolor = style.getPropertyValue("background-color");
	bgcolor = bgcolor.substring(0, bgcolor.length - 1).split("(")[1].split(",");
	if (color !== "rgb(0, 0, 0)") ripple.style.backgroundColor = color;
	else if (+bgcolor[0] + +bgcolor[1] + +bgcolor[2] > 500 && !(bgcolor.length > 3 && +bgcolor[3] < .3)) ripple.style.backgroundColor = "#6c6c6c";
	ripple.classList.add("-ripple-item");
	ripple.style.left = event.offsetX + "px";
	ripple.style.top = event.offsetY + "px";
	container.appendChild(ripple);
	currRipple = ripple;
	setTimeout(() => ripple.classList.add("-ripple-visible"), 0);
}

function removeRipple() {
	var rip = currRipple, cont = document.getElementById("_ripple-container");
	if (rip) setTimeout(function() {
		rip.style.opacity = 0;
		setTimeout(function() {
			if (cont && cont.contains(rip)) cont.removeChild(rip);
			if (!removeCountdown) endRipples();
		}, 300);
	}, 200);
}

function endRipples(confirm) {
	var cont = document.getElementById("_ripple-container");
	if (elemPressed && document.getElementById(elemPressed.id)) {
		if (confirm) {
			removeRipple();
			setTimeout(endRipples, 300);
		} else if (cont && cont.childElementCount === 0) {
			elemPressed.removeChild(cont);
			elemPressed = undefined;
			clearTimeout(removeCountdown);
			removeCountdown = undefined;
		} else removeCountdown = setTimeout(endRipples, 20);
	}
}

function addTooltip(elem, optTooltip) {
	if (elem) {
		if (!elem.id) elem.id = "tooltip_" + totalTooltips;
		if (optTooltip) elem.setAttribute("tooltip", optTooltip);
		elem.addEventListener("mouseover", preTooltip);
		elem.addEventListener("mouseout", closeTooltip);
		elem.addEventListener("mousedown", closeTooltip);
		totalTooltips++;
	}
}

function preTooltip(event) {
	hovering = true;
	tooltipDelayTimer = setTimeout(function() {if (hovering) tooltip(event)}, 500);
}

function tooltip(event) {
	var parent = event.target, viewHeight = window.screen.availHeight, viewWidth = document.body.clientWidth, rect = parent.getBoundingClientRect(),
		tooltip = document.createElement("div"), ripple = document.createElement("div"), locY = event.pageY + parent.clientHeight + 10,
		locX = event.pageX, top = rect.top + parent.scrollTop + parent.clientHeight + 10, left = rect.left + (parent.clientWidth / 2);
	if (locY + 52 >= viewHeight) {
		top = rect.top + parent.scrollTop - 42;
		tooltip.classList.add("-tooltip-bottom");
	}
	if (locX + 62 >= viewWidth) {
		left = viewWidth - 4;
		tooltip.classList.add("-tooltip-right");
	}
	tooltip.classList.add("-tooltip");
	tooltip.appendChild(document.createTextNode(parent.getAttribute("tooltip")));
	tooltip.style.left = Math.round(left) + "px";
	tooltip.style.top = Math.round(top) + "px";
	tooltip.id = "_tooltip_" + parent.id;
	ripple.classList.add("-ripple");
	tooltip.appendChild(ripple);
	document.body.appendChild(tooltip);
	setTimeout(
		function() {
			tooltip.classList.add("-tooltip-visible");
			ripple.classList.add("-tooltip-visible");
		}, 0
	);
}

function closeTooltip(event) {
	var elem = document.getElementById("_tooltip_" + event.target.id);
	hovering = false;
	clearTimeout(tooltipDelayTimer);
	if (elem) elem.style.opacity = 0;
	setTimeout(
		function() {
			if (elem && document.body.contains(elem)) document.body.removeChild(elem);
		}, 200
	);
}

function snackbar(txt) {
	var sb = document.getElementById("snackbar");
	sb.firstChild.nodeValue = txt;
	if (sbOpen) {
		clearTimeout(sbTimer);
		sb.style.animation = "snackbar .5s ease";
		setTimeout(() => sb.style.removeProperty("animation"), 500);
	} else {
		sb.classList.add("snackbar-visible");
		sbOpen = true;
	}
	sbTimer = setTimeout(function() {
		sb.classList.remove("snackbar-visible");
		sbOpen = false;
	}, 150 * txt.length);
}

function getItemID(search, evt) {
	var list = document.getElementById(search), itm;
	if (search == "checklist_body") itm = evt;
	else if (search == "list" && evt.classList && evt.classList.contains("itm")) itm = evt;
	else if (search == "list") itm = evt.target.parentNode;
	for (var i = 0; i < list.childElementCount; ++i) if (list.children[i] == itm) break;
	return i;
}

function sendMessage(type, id, content) {
	switch (type) {
		case "addItem":
			checklist.items.push([false, "", 100, [], [], []]);
			break;
		case "removeItem":
			checklist.items.splice(id, 1);
			break;
		case "checkItem":
			var itm = checklist.items[id];
			if (itm && itm[0]) itm[0] = false;
			else itm[0] = true;
			break;
		case "setText":
			checklist.items[id][1] = content;
			break;
		case "setPriority":
			checklist.items[id][2] = content;
			break;
		case "addFile":
			checklist.items[id][3].push(content);
			break;
		case "removeFile":
			checklist.items[id][3].splice(0, 1);
			break;
		case "setGroup":
			checklist.items[id][5][0] = content;
			break;
		case "updateItem":
			if (content[2] == null) content[2] = 100;
			if (content[3][0] == void 0) content[3].splice(0, 1);
			checklist.items[id] = content;
			break;
		case "moveItem":
			var itemToMove = checklist[id];
			checklist.items.splice(id, 1);
			checklist.items.splice(content, 0, itemToMove);
			break;
		case "setDate":
			checklist.items[id][4] = content;
			break;
	}
	chrome.storage.sync.set({checklist: checklist.items});
}

function getCountdown(m, d, y) {
	var t = new Date(), month = t.getMonth() + 1, day = t.getDate(), year = t.getFullYear(), daysLeft = 0;
	while (y < year && m > month) {
		daysLeft -= monthLength[m - 1];
		--m;
	}
	while ((y > year && m <= month) || y < year) {
		daysLeft += 365;
		if (y > year) --y;
		else ++y;
	}
	if (month > m) {
		daysLeft += getCountdown(12, 31);
		month = 1;
		day = 0;
	}
	if (month === m) return daysLeft + d - day;
	while (month < m) {
		daysLeft += monthLength[month - 1] - day;
		day = 0;
		++month;
	}
	return daysLeft + d;
}

function openOptions(id, opt) {
	var btn = document.getElementById(id), options = document.getElementById(opt);
	if (opt == "feed_options" && currentFeed != -1) options.removeAttribute("open");
	if (opt == "feed_options") currentFeed = id.substring(12);
	setTimeout(function() {
		options.setAttribute("open", "");
		options.style.left = (btn.getBoundingClientRect().left - options.clientWidth + 45) + "px";
		options.style.top = btn.parentNode.offsetTop + 8 + "px";
	}, 10);
}

function closeOptions(elem, opt) {
	if (!elem.target.classList.contains(opt)) document.getElementById(opt).removeAttribute("open");
}

function getItemDue(elem) {
	if (!elem.classList.contains("input-date")) return 9999;
	else {
		var date = elem.lastElementChild.getAttribute("date").split("/");
		return getCountdown(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
	}
}

function getItemPriority(elem) {
	if (elem.classList.contains("priority-high")) return 0;
	else if (elem.classList.contains("priority-low")) return 2;
	else return 1;
}

function getItemCompletion(elem) {
	if (elem.firstElementChild.checked) return 1;
	else return 0;
}

function filterChecklist(id, type, method) {
	var list = document.getElementById(id);
	for (let i = 0; i < list.childElementCount - 1; ++i) {
		for (let j = 0; j < list.childElementCount - 1; ++j) {
			var itm1 = method(list.children[j]), itm2 = method(list.children[j + 1]);
			if (itm2 < itm1) {
				var firstElem = list.children[j], swapElem = list.children[j + 1], temp = document.createElement("div"),
					moveID = getItemID(id, firstElem), dest = getItemID(id, swapElem);
			   firstElem.parentNode.insertBefore(temp, firstElem);
			   swapElem.parentNode.insertBefore(firstElem, swapElem);
			   temp.parentNode.insertBefore(swapElem, temp);
			   temp.parentNode.removeChild(temp);
				sendMessage("moveItem", moveID, dest);
			}
		}
	}
	snackbar("Sorted Checklist by " + type);
}

function modifyDate(modifier) {
	chooserDate[0] += modifier;
	if (chooserDate[0] > 11) {
		chooserDate[0] = 0;
		chooserDate[1]++;
	} else if (chooserDate[0] < 0) {
		chooserDate[0] = 11;
		chooserDate[1]--;
	}
	buildMonth(document.getElementById("date_chooser"));
}

function buildMonth(chooser) {
	while (chooser.lastElementChild.firstChild) chooser.lastElementChild.firstChild.remove();
	if (chooserDate.length == 0) {
		let d = new Date();
		chooserDate = [d.getMonth(), d.getFullYear()];
	}
	let days = monthLength[chooserDate[0]],
		monthStart = new Date(chooserDate[0] + 1 + "/1/" + chooserDate[1]).getDay();
	chooser.children[1].firstChild.nodeValue = months[chooserDate[0]];
	for (let i = 0; i < monthStart; i++) {
		var day = document.createElement("div");
		day.classList.add("date-item", "date-item-special");
		chooser.lastElementChild.appendChild(day);
	}
	for (let i = 0; i < days; i++) {
		var d = new Date(), day = document.createElement("div");
		day.classList.add("date-item");
		if (d.getFullYear() >= chooserDate[1] && d.getMonth() > chooserDate[0] || (d.getMonth() == chooserDate[0] && i < d.getDate() - 1)) day.style.color = "#8c8c8c";
		day.appendChild(document.createTextNode(i + 1));
		day.setAttribute("date", (chooserDate[0] + 1) + "/" + (i + 1) + "/" + chooserDate[1]);
		day.addEventListener("click", evt => inputMenu.value = evt.target.getAttribute("date"));
		chooser.lastElementChild.appendChild(day);
	}
	if (inputMenu.id === "options_date") chooser.style.top = inputMenu.offsetTop + 36 + (chooser.clientHeight < 100 ? 238 : chooser.clientHeight) + "px";
}

function openInputMenu(evt) {
	inputMenu = evt.target;
	if (evt.target.classList.contains("date-input") || evt.target.id === "options_date") {
		var chooser = document.getElementById("date_chooser");
		if (evt.target.id !== "options_date") chooser.style.top = evt.target.offsetTop + "px";
		else document.getElementById("menu_options").style.height = "91%";
		chooser.classList.add("menu-open");
		if (document.getElementById("date_title").firstChild.nodeValue !== months[chooserDate[0] - 1]) buildMonth(chooser);
	} else if (evt.target.getAttribute("purpose").indexOf("Color") !== -1) {
		var chooser = document.getElementById("color_chooser");
		if (chooser.childElementCount === 1) {
			for (let i = 0, l = colors.length; i < l; i++) {
				var colorItem = document.createElement("div");
				colorItem.classList.add("color-item");
				colorItem.style.backgroundColor = "#" + colors[i];
				addTooltip(colorItem, "#" + colors[i]);
				colorItem.addEventListener("click", evt => inputMenu.value = evt.target.getAttribute("tooltip"));
				chooser.appendChild(colorItem);
				switch (i) {
					case 0: colorItem.style.borderTopLeftRadius = "7px";
						break;
					case 5: colorItem.style.borderTopRightRadius = "7px";
						break;
					case 12: colorItem.style.borderBottomLeftRadius = "7px";
						break;
					case 17: colorItem.style.borderBottomRightRadius = "7px";
				}
			}
		}
		chooser.style.top = evt.target.offsetTop + "px";
		chooser.classList.add("menu-open");
	} else closeInputMenu();
}

function closeInputMenu() {
	var colors = document.getElementById("color_chooser"), dates = document.getElementById("date_chooser");
	if (dates.classList.contains("menu-open")) {
		dates.classList.remove("menu-open");
		if (inputMenu.id === "options_date") document.getElementById("menu_options").style.height = "70%";
	} else if (colors && colors.classList.contains("menu-open")) colors.classList.remove("menu-open");
	inputMenu = void 0;
}
