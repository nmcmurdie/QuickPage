'use strict'
const widgets = [
		['div','card|card-search',['resizable:'],[['input','search-box',['type:text'],[]]],[]],
		['div','card|card-pushbullet',[],[
			['span','card-title|full-title|card-title-pushbullet',[],['PushBullet']],
			['input','input-text',['type:text','required:','id:reminder_ttl'],[]],
			['label','reminder-label',['for:reminder_ttl'],['Title']],
			['input','input-text',['type:text','required:','id:reminder_bdy'],[]],
			['label','reminder-label',['for:reminder_bdy'],['Body']],
			['div','btn|icon|reminder-btn',['ripple:','id:reminder_btn',sendReminder],[]]
		],[requestPushbulletInfo]],
		['div','card|card-calc',[],[
			['span','num|num-special|num-clear', ['id:num_clear',() => addNum(this.id.substring(4))],['C']],
			['span','readout', ['id:calc_readout','contentEditable:'],['0']],
			['br','',[],[]],
			['span','num',['id:num_7',() => addNum(this.id.substring(4))],['7']],
			['span','num',['id:num_8',() => addNum(this.id.substring(4))],['8']],
			['span','num',['id:num_9',() => addNum(this.id.substring(4))],['9']],
			['span','num|num-special', ['id:num_multiply',() => addNum(this.id.substring(4))],['\u00D7']],
			['br','',[],[]],
			['span','num',['id:num_4',() => addNum(this.id.substring(4))],['4']],
			['span','num',['id:num_5',() => addNum(this.id.substring(4))],['5']],
			['span','num',['id:num_6',() => addNum(this.id.substring(4))],['6']],
			['span','num|num-special', ['id:num_divide',() => addNum(this.id.substring(4))],['\u00F7']],
			['br','',[],[]],
			['span','num',['id:num_1',() => addNum(this.id.substring(4))],['1']],
			['span','num',['id:num_2',() => addNum(this.id.substring(4))],['2']],
			['span','num',['id:num_3',() => addNum(this.id.substring(4))],['3']],
			['span','num|num-special', ['id:num_minus',() => addNum(this.id.substring(4))],['-']],
			['br','',[],[]],
			['span','num',['style:width:52px','id:num_period',() => addNum(this.id.substring(4))],['.']],
			['span','num',['id:num_0',() => addNum(this.id.substring(4))],['0']],
			['span','num|num-special',['id:num_plus',() => addNum(this.id.substring(4))],['+']],
			['span','num|num-special|num-solve',['id:num_solve',() => addNum(this.id.substring(4))],['=']]
		],[]],
		['div','card|card-weather',['resizable:'],[
			['span','card-title|card-title-weather',['id:weather_title'],['WEATHER']],
			['div','weather-desc',['id:weather_desc'],[
				['span','weather-temp',['id:weather_temp'],['-']],
				['span','weather-condition',['id:weather_condition'],['-']]
			]],
			['img','weather-icon',['alt:Current Weather','id:weather_icon','src:res/weather.svg'],[]]
		],[]],
		['div','card|card-stopwatch',['resizable:'],[
			['span','card-title',[],['TIMER']],
			['div','center|stpw-text',['id:stpw_text'],[
				['span','stpw-min',['id:stpw_min'],['0']],
				['span','stpw-sec',['id:stpw_sec'],['00']],
				['span','stpw-milli',['id:stpw_milli'],['00']]
			]],
			['div','icon|stpw-main',['paused:true','id:stpw_main','ripple:',stopwatch],[]],
			['div','icon|stpw-reset',['id:stpw_reset','ripple:',reset],[]
		]],[]],
		['div','card|card-time',['resizable:'],[
			['span','card-title',[],['DATE']],
			['div','',[],[['span','time',['id:time'],['9:20']],
			['br','',[],[]],
			['span','date',['id:date'],['Monday, January 1']]]
		]],[]],
		['div','card|card-rss',['resizable:'],[
			['a','card-title|full-title|card-title-rss',['target:blank','rel:noopener noreferrer'],['NEWS FEED']],
			['feed','',[],[]]
		],['href:Website URL','~backgroundColor:Color']],
		['div','card|card-spotify',['resizable:'],[
			['div','spotify-container',[],[
				['span','card-title|card-title-spotify',[],['Spotify']],
				['img','spotify-album-art',['alt:','id:spotify_albumArt'],[]],
				['div','spotify-track-title|spotify-title-dark',['id:spotify_title'],[
					['a','spotify-actual-title',[],['No Song Information']]
				]],
				['div','spotify-expand',['id:spotify_expand','ripple:',() => spotifyExpand()],[]],
				['div','spotify-footer',[],[
					['div','spotify-like|icon',['id:spotify_like',() => setSpotifyLike(void 0, true)],["<svg class='spotify-like-image' width='24' height='24' viewBox='0 0 24 24'><path d='M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z' /></svg><svg class='spotify-like-image' width='24' height='24' viewBox='0 0 24 24'><path d='M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z' /></svg>"]],
					['div','',[],[
						['div','spotify-previous|icon',['id:spotify_previous',() => spotifyPlaying(spotifyPrevious)],["<svg class='spotify-previous-image' width='38' height='38' viewBox='0 0 38 38'><rect x='6' y='6' width='2' height='12'/><path d='M9.5,12l8.5,6V6L9.5,12z M16,14.14L12.97,12L16,9.86V14.14z'/></svg>"]],
						['div','spotify-media|icon',['id:spotify_media','ripple:','paused:',() => spotifyPlaying(spotifyMedia)],[]],
						['div','spotify-next|icon',['id:spotify_next',() => spotifyPlaying(spotifyNext)],["<svg class='spotify-next-image' width='38' height='38' viewBox='0 0 38 38'><path d='M6,18l8.5-6L6,6V18z M8,9.86L11.03,12L8,14.14V9.86z'/><rect x='16' y='6' width='2' height='12'/></svg>"]]
					]],
					['div','spotify-placeholder|icon',[],[]]
				]]
			]
		]],[]],
		['div','card|card-checklist',['resizable:'],[
			['span','card-title|full-title|card-title-checklist',[],['Checklist']],
			['div','checklist-filter',['id:filter_btn',function() {openOptions(this.id, "checklist_filter")}],[]],
			['div','checklist-add',[function() {addChecklistItem(this.nextElementSibling)}],[]],
			['div','checklist-body',['id:checklist_body'],[['span','checklist-empty',[],[]]]]
		],[]],
		['div','card|card-bookmarks',['resizable:'],[
			['span','card-title|full-title|card-title-bookmarks',[],['Chrome Apps']],
			['div','bookmarks-body',[],[['div','bookmarks-item',[],['No Apps Found']],]]
		],[]]
	],
	colors = ["f44336", "E91E63", "9C27B0", "673AB7", "3F51B5", "2196F3", "03A9F4", "00BCD4", "009688", "4CAF50", "8BC34A", "CDDC39", "FFC107", "FF9800", "FF5722", "795548", "9E9E9E", "607D8B"],
	apiBaseURL = 'https://api.sweepkey.net/';
const spotify = {
	authRecheckTime: new Date().getTime(),
	fullscreen: false,
	updateTimer: null,
	authToken: null,
	authOpen: false,
	songTitle: ''
};
const stpw = {
	referenceTime: -1,
	differenceTime: 0,
	timer: null
}
const checklist = {
	items: [],
	moveID: null,
	currentItem: null,
	draggingItem: false
}
var currentWidget = [], feedsToLoad = [], widgetsAdded = [], totalWidgets = 0, currentFeed = -1,
	online = false, updateWeather = false, moveElem,
	resizeElem;

window.addEventListener("DOMContentLoaded", setup);
window.addEventListener("online", toggleConnection);
window.addEventListener("offline", toggleConnection);
window.addEventListener("keydown", k => {
	if (k.key === "Enter") {
		let elem = k.path[0];
		if (elem) {
			if (elem.classList.contains("checklist-input")) addChecklistItem(elem.parentNode.parentNode);
			else if (elem.classList.contains("search-box")) {
				var val = elem.value.trim().replace(/ /gi, '+');
				if (val.length > 0) window.location = "https://www.google.com/search?q=" + val;
			} else if (document.getElementById("request_info").classList.contains("menu-open")) document.getElementById("request_submit").click();
		}
	} else if (k.code === "Minus" && k.altKey && k.path[0].classList.contains("checklist-input")) {
		k.preventDefault();
		checklist.currentItem = k.path[0].parentNode;
		removeChecklistItem();
	}
});
window.addEventListener("webkitfullscreenchange", () => {
	if (!document.webkitIsFullScreen) spotifyHide();
});

function setup() {
	var status = navigator.onLine, body = document.getElementById("body");
	chrome.storage.sync.get(['opened', 'vars', 'darkMode'], ({opened, vars, darkMode}) => {
		if (!opened) welcome();
		if (vars && Object.keys(vars).length === 0) chrome.storage.sync.set({vars: []});
		else if (vars) vars.forEach(itm => window[itm.key] = itm.val);
		if (darkMode) document.body.classList.add("dark");
	});
	pushWidgets(status);
	setTime();
	addClickListeners();
	document.querySelectorAll(".ripple").forEach(addRipplesTo);
}

function getVar(name, keys, callback) {
	if (typeof keys !== "object") keys = [keys];
	chrome.storage.sync.get(name, res => {
		let arr = [];
		if (res && res[name]) keys.forEach((elem, index) => {
			let itm = res[name].find(itm => itm.key === keys[index]);
			arr.push(itm ? itm.val : void 0);
		});
		if (arr.length <= 1) callback(arr[0]);
		else callback(arr);
	});
}

function setVar(name, keys, values, callback) {
	if (typeof keys !== 'object') {
		keys = [keys];
		values = [values];
	}
	chrome.storage.sync.get(name, res => {
		if (!res[name]) res[name] = [];
		keys.forEach((elem, index) => {
			let obj = res[name].find(elem => elem.key === keys[index]);
			if (obj) obj.val = values[index];
			else {
				res[name].push({key: keys[index], val: values[index]});
				if (name === 'vars') window[keys[index]] = values[index];
			}
		});
		let obj = new Object();
		obj[name] = res[name];
		chrome.storage.sync.set(obj, () => {
			if (callback) callback();
		});
	});
}

function removeVar(name, key) {
	chrome.storage.sync.get(name, res => {
		res[name].forEach((elem, index) => {
			if (elem.key === key) {
				res[name].splice(index, 1);
				if (name === 'vars') window[key] = void 0;
				let obj = new Object();
				obj[name] = res[name];
				chrome.storage.sync.set(obj);
				return;
			}
		});
	});
}

function setAttribute(key, type, val) {
	getVar('widgets', key, res => {
		let edited = false
		for (let i = 0; i < res.attributes.length; ++i)
			if (res.attributes[i].key === type) {
				edited = true;
				res.attributes[i].val = val;
				break;
			}
		if (!edited) res.attributes.push({key: type, val: val});
		setVar('widgets', key, res);
	});
}

function getElements(...ids) {
	let elements = [];
	for (let i = 0; i < ids.length; i++) {
		elements.push(document.getElementById(ids[i]));
	}
	return elements;
}

function toggleConnection(event) {
	var refreshBtn = document.getElementById("refreshFeed");
	if (typeof event === "boolean") online = event;
	else if (event.type === "online") online = true;
	else online = false;
	if (online) {
		refreshBtn.classList.remove("disabled");
		if (feedsToLoad.length > 0) loadFeeds();
		if (updateWeather) getWeather();
		getVar('vars', 'SpotifyOAuth', res => {
			if (res) spotifyPlaying(updateSpotifyPlayer);
		});
	} else if (!online) refreshBtn.classList.add("disabled");
}

function loadFeeds() {
	for (let i = 0, l = feedsToLoad.length; i < l; i++) {
		var feed = feedsToLoad[i], feedBody = feed.children[1];
		if (feedBody.childElementCount === 1) feedBody.removeChild(feedBody.firstElementChild);
		loadRSS(feedBody, feed.getAttribute("href"), feed.id, false);
	}
	feedsToLoad = [];
}

function addOfflineError(el) {
	var feedBody = el.children[1], errorText = document.createElement("span");
	errorText.classList.add("feed-loading", "feed-error");
	errorText.appendChild(document.createTextNode("No Internet Connection"));
	feedBody.appendChild(errorText);
}

function setSpotifyOAuth() {
	if (new Date().getTime() - spotify.authRecheckTime > 600000) {
		var wgts = document.getElementById("body").children;
		for (let i = 1, l = wgts.length; i < l; i++)
			if (wgts[i].classList.contains("card-rss")) feedsToLoad.push(wgts[i]);
		if (online) loadFeeds();
		spotify.authRecheckTime = new Date().getTime();
	}
	getVar('vars', 'SpotifyRefresh', res => {
		if (!res && !spotify.authOpen) requestSpotifyAuth();
		else {
			request("GET", `${apiBaseURL}spotifyrefresh?refresh_token=${res}`, void 0, response => {
				if (response.access_token) {
					spotify.authToken = response.access_token + "%" + new Date().getTime();
					setVar('vars', 'SpotifyOAuth', spotify.authToken);
					updateSpotifyPlayer(response, false);
				}
			});
		}
	});
}

function request(type, url, headers, callback, params) {
	if (online) {
		var req = new XMLHttpRequest();
		req.open(type, url, true);
		if (headers) {
			for (let i = 0, l = headers.length; i < l; i++) {
				var contents = headers[i].split(":");
				req.setRequestHeader(contents[0], contents[1]);
			}
		}
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				var response;
				try {
					response = JSON.parse(req.responseText);
				} catch(err) {
					response = req.responseText;
				}
				if (req.status !== 200 && req.status !== 204 && req.status !== 401) throw response;
				else if (callback) callback(response, req.status);
			}
		}
		if (type === "GET" || params == null) req.send();
		else if (type === "POST" || type === "DELETE") {
			var paramString = params.join("&");
			req.send(paramString);
		}
	}
}

function pushWidgets(status) {
	for (let i = 0, l = widgets.length; i < l; i++) {
		var widget = createWidget(widgets[i], 'no-ripples');
		widget.id = "widget_" + i;
		widget.classList.add("add-menu-widget");
		addTooltip(widget, "Add Widget");
		widget.addEventListener("click", evt => toggleWidget(evt.target.id));
		addRipplesTo(widget);
		document.getElementById("widget_preview").appendChild(widget);
	}
	addStoredWidgets(status);
}

function addStoredWidgets(online) {
	chrome.storage.sync.get('widgets', res => {
		if (Object.keys(res).length === 0) {
			res['widgets'] = [];
			chrome.storage.sync.set(res);
		}
		if (res['widgets'].length === 0) body.appendChild(createWidget(['div','icon|no-widgets',[],['No Widgets']]));
		else {
			var doc = document.createDocumentFragment();
			for (let i = 0; i < res['widgets'].length; ++i) {
				let data = res['widgets'][i], ID = data.key, type = data.val.type, attributes = data.val.attributes, widget;
				widget = createWidget(widgets[type]);
				widget.id = ID;
				attributes.forEach(attribute => widget.setAttribute(attribute.key, attribute.val));
				doc.appendChild(widget);
				widgetsAdded[type] = widget.classList[1];
				if (!widget.classList.contains("card-rss")) {
					var preview = document.getElementById("widget_" + type);
					preview.setAttribute("added", "");
					preview.setAttribute("tooltip", "Remove Widget");
				}
				else {
					if (ID >= totalWidgets) totalWidgets = ID + 1;
					feedsToLoad.push(widget);
					if (!online) addOfflineError(widget);
				}
				if (widget.classList.contains("card-weather")) updateWeather = true;
				else if (widget.classList.contains("card-checklist")) {
					chrome.storage.sync.get('checklist', function(r) {
						if (Object.keys(r).length > 0) checklist.items = r.checklist;
						addStoredChecklist();
					});
				} else if (widget.classList.contains("card-spotify")) getVar('vars', ['SpotifyOAuth', 'SpotifyTitle'], args => {
					addTooltip(document.getElementById("spotify_expand"), "Fullscreen");
					spotify.authToken = args[0];
					if (args[0] && new Date().getTime() - args[0].split("%")[1] < 1800000) {
						if (args[1]) doVibrant();
						setTimeout(() =>
							spotifyPlaying(req => {
								if (req.is_playing) document.getElementById("spotify_media").removeAttribute("paused");
								updateSpotifyPlayer(req, true);
							}
						), 700);
						setInterval(() => spotifyPlaying(req => updateSpotifyPlayer(req, false)), 4000);
					}
				});
			}
			body.appendChild(doc);
		}
		toggleConnection(online);
		chrome.management.getAll(findExtensions);
	});
}

function findExtensions(extInfo) {
	var wgt = document.getElementById("body").querySelector(".bookmarks-body"), remove = false;
	if (wgt) {
		for (let i = 0, l = extInfo.length; i < l; i++) {
			if (extInfo[i].type === "hosted_app") {
				var iconURL = extInfo[i].icons ? 'background-image:url(' + extInfo[i].icons[extInfo[i].icons.length - 1].url + ')' : '';
				var item = createWidget(['div','bookmarks-item',['style:' + iconURL],[extInfo[i].name]]);
				item.id = extInfo[i].id;
				item.addEventListener("click", function() {chrome.management.launchApp(this.id)}, false);
				wgt.appendChild(item);
				remove = true;
			}
		}
		if (remove) wgt.removeChild(wgt.firstChild);
	}
}

function removeWidget(id) {
	var wgtID;
	if (id.type == "click") wgtID = currentFeed
	else wgtID = id;
	var wgt = document.getElementById(wgtID);
	if (wgt && wgt.classList.contains("card-rss")) totalWidgets--;
	if (wgt) wgt.remove();
	toggleWidget(-1);
	if (id == 7) spotify.authOpen = false;
	removeVar('widgets', +wgtID);
	document.getElementById("feed_options").removeAttribute("open");
	document.getElementById("checklist_filter").removeAttribute("open");
	snackbar("Removed Widget");
}

function toggleWidget(id) {
	var widget = document.getElementById(id), body = document.getElementById("body"), isEmpty = true;
	if (id != -1 && widget.getAttribute("added") == undefined) {
		var el = createWidget(widgets[id.substring(7)]);
		if (el.classList.contains("card-rss")) el.id = totalWidgets;
		else el.id = id.substring(7);
		currentWidget[0] = el;
		currentWidget[1] = document.getElementById(id);
		requestInfo(el, id.substring(7));
		toggleAddMenu();
	} else if (id != -1) {
		removeWidget(id.substring(7));
		widget.removeAttribute("added");
		widget.setAttribute("tooltip", "Add Widget");
	}
	for (let i = 0, l = body.childElementCount; i < l; ++i)
		if (body.children[i].classList.contains("card") || body.children[i].classList.contains("no-widgets")) isEmpty = false;
	if (isEmpty) body.appendChild(createWidget(['div','icon|no-widgets',[],['No Widgets']]));
}

function requestInfo(widget, origin, editOptions) {
	var requestMenu = document.getElementById("request_info"), requestBody = document.getElementById("request_body"),
		submit = document.getElementById("request_submit"), info;
	document.getElementById("request_title").textContent = "Widget options";
	while (requestBody.firstChild) requestBody.removeChild(requestBody.firstChild);
	if (editOptions) info = editOptions;
	else info = widgets[origin][4];
	if (info.length > 0 && typeof info[0] === "function") info[0]();
	else {
		for (let i = 0, l = info.length; i < l; i++) {
			var optionalText = "", name = info[i].substring(1).split(":")[0];
			if (info[i].substring(0, 2).indexOf("~") != -1) {
				optionalText = " (Optional)";
				name = info[i].substring(2).split(":")[0];
			}
			var input = createWidget(['input','input-text',['type:text','spellcheck:false','title:'+info[i].split(":")[1]+optionalText,'required:','id:input_'+i,'purpose:'+info[i]],[]]),
				label = createWidget(['label','label-request',['for:input_'+i],[info[i].split(":")[1]+optionalText]]);
			getVar('vars', name, res => {
				if (info[i].substring(0, 1) == "_" && res != null) input.value = res;
			});
			input.addEventListener("focus", openInputMenu);
			label.style.marginBottom = "10px";
			requestBody.appendChild(input);
			requestBody.appendChild(label);
			if (i == 0) input.focus();
		}
	}
	if (info.length == 0) submitRequest(origin);
	else if (editOptions) {
		currentWidget[0] = widget;
		currentWidget[1] = origin;
		requestMenu.classList.add("menu-open")
		submit.removeEventListener("click", submitRequest, false);
		submit.addEventListener("click", submitEdit, false);
		submit.textContent = "SET";
		document.getElementById("request_cancel").addEventListener("click", cancelEdit, false);
	} else {
		submit.textContent = "ADD";
		requestMenu.classList.add("menu-open")
		submit.setAttribute("origin", origin);
	}
}

function submitRequest(type) {
	if (type.target != undefined) type = type.target.getAttribute("origin");
	var requestBody = document.getElementById("request_body"), reqNodes = requestBody.childNodes, attributes = [], rssURL;
	for (let i = 0, l = reqNodes.length; i < l; i++) {
		var purpose = reqNodes[i].getAttribute("purpose"), nodeContent = reqNodes[i].value, optional = false;
		if (!purpose) continue;
		else if (purpose.indexOf("~") != -1) {
			purpose = purpose.substring(0, purpose.indexOf("~")) + purpose.substring(purpose.indexOf("~") + 1);
			optional = true;
		}
		var vName = purpose.split(":")[0];
		if (reqNodes[i].tagName === "INPUT" && reqNodes[i].value.length === 0 && !optional) return;
		else if (purpose.substring(0, 1) === "_") {
			var varName = vName.substring(1);
			if (nodeContent.length === 0) removeVar('vars', varName);
			else setVar('vars', varName, nodeContent);
			window[varName] = nodeContent;
		} else if (nodeContent.length > 0) {
			if (currentWidget[0].classList.contains("card-rss")) rssURL = nodeContent;
			else {
				currentWidget[0].setAttribute(vName, nodeContent);
				attributes.push({key: vName, val: nodeContent});
			}
		}
	}
	if (!currentWidget[0].classList.contains("card-rss")) {
		currentWidget[1].setAttribute("added", "");
		currentWidget[1].setAttribute("tooltip", "Remove Widget");
	} else if (rssURL) findFeedURL(rssURL, url => {
		if (url === 404) snackbar("Unable to Find Feed URL");
		else {
			currentWidget[0].setAttribute('href', url);
			attributes.push({key: 'href', val: url});
			let wgt = {attributes: attributes, type: +type};
			setVar('widgets', +currentWidget[0].id, wgt, () => {
				if (!online) addOfflineError(currentWidget[0]);
				else loadFeeds();
			});
			addWidget();
		}
		feedsToLoad.push(currentWidget[0]);
		totalWidgets++;
	});
	switch (currentWidget[0].classList[1]) {
		case "card-bookmarks":
			chrome.management.getAll(findExtensions);
			break;
		case "card-time":
			setTime();
			break;
		case "card-spotify":
			setupSpotifyWidget();
			break;
		case "card-checklist":
			addStoredChecklist();
			break;
		case "card-weather":
			getWeather();
	}
	if (!currentWidget[0].classList.contains('card-rss')) addWidget(attributes, type);
	document.getElementById("request_info").classList.remove("menu-open");
}

function setupSpotifyWidget() {
	setSpotifyOAuth();
	getVar('vars', 'SpotifyOAuth', res => {
		if (res) spotifyPlaying(updateSpotifyPlayer);
	});
	setInterval(() => spotifyPlaying(req => updateSpotifyPlayer(req, false)), 2000);
}

function addWidget(attributes, type) {
	let body = document.getElementById("body");
	body.appendChild(currentWidget[0]);
	for (let i = 0; i < body.childElementCount; ++i)
		if (body.children[i].classList.contains("no-widgets"))
			body.children[i].remove();
	if (attributes) setVar("widgets", +currentWidget[0].id, {attributes: attributes, type: +type});
	if (body.scrollTop < currentWidget[0].offsetTop) body.scrollTop = currentWidget[0].offsetTop;
}

function submitEdit() {
	var submitMenu = document.getElementById("request_info"), edited = false,
		submit = document.getElementById("request_submit"),
		bodyElems = document.getElementById("request_body").children;
	submitMenu.classList.remove("menu-open");
	submit.addEventListener("click", submitRequest, false);
	submit.removeEventListener("click", submitEdit, false);
	for (let i = 0, l = bodyElems.length; i < l; i++) {
		if (bodyElems[i].nodeName === "INPUT" && bodyElems[i].value.length !== 0) {
			edited = true;
			var purpose = bodyElems[i].getAttribute("purpose").split(":")[0], val = bodyElems[i].value;
			if (purpose.substring(0, 1) === "~") purpose = purpose.substring(1);
			currentWidget[0].setAttribute(purpose, val);
			setAttribute(+currentWidget[0].id, purpose, val);
		}
	}
	if (edited && currentWidget[0].classList.contains("card-rss")) refreshFeed(false);
}

function cancelEdit(evt) {
	var submit = document.getElementById("request_submit");
	submit.removeEventListener("click", submitEdit, false);
	submit.addEventListener("click", submitRequest, false);
	evt.target.removeEventListener("click", cancelEdit, false);
}

function createWidget(arr, extra) {
	var el = document.createElement(arr[0]),
		classes = arr[1].split("|"), dtl = arr[3];
	for (let i = 0, l = classes.length; i < l; i++) if (classes[i] != '') el.classList.add(classes[i]);
	for (let j = 0, l = arr[2].length; j < l; j++) {
		var itm = arr[2][j];
		if (typeof itm == "function") el.addEventListener("click", itm, false);
		else {
			var attr = itm.substring(0, itm.indexOf(":")), val = itm.substring(itm.indexOf(":") + 1);
			if (attr === "ripple" && extra !== "no-ripples") addRipplesTo(el);
			else if (attr !== "id" || (attr === "id" && extra !== "no-ripples")) el.setAttribute(attr, val);
		}
	}
	if (dtl.length > 0 && typeof dtl[0] == "string") {
		if (/<[a-z][\s\S]*>/i.test(dtl[0])) el.innerHTML += dtl[0];
		else el.appendChild(document.createTextNode(dtl));
	} else if (dtl.length > 0 && typeof dtl[0] !== "string") for (let k = 0, l = dtl.length; k < l; k++) el.appendChild(createWidget(dtl[k], extra));
	return el;
}

function addClickListeners() {
	window.addEventListener("mouseup", function() {stopChecklistDrag();});
	document.getElementById("addWidgets").addEventListener("click", toggleAddMenu);
	document.getElementById("widgets_resize").addEventListener("click", toggleResize);
	document.getElementById("add_cancel").addEventListener("click", toggleAddMenu);
	document.getElementById("request_cancel").addEventListener("click", () => document.getElementById("request_info").classList.remove("menu-open"));
	document.getElementById("request_submit").addEventListener("click", submitRequest);
	document.body.addEventListener("click", (evt) => closeOptions(evt, "feed_options"));
	document.body.addEventListener("click", (evt) => closeOptions(evt, "checklist_filter"));
	document.body.addEventListener("mouseup", stopResize);
	document.body.addEventListener("mouseup", stopMove);
	document.getElementById("refreshFeed").addEventListener("click", refreshFeed);
	document.getElementById("deleteFeed").addEventListener("click", removeWidget);
	document.getElementById("editFeed").addEventListener("click", editFeed);
	document.getElementById("filterDate").addEventListener("click", () => filterChecklist("checklist_body", "Date", getItemDue));
	document.getElementById("filterPriority").addEventListener("click", () => filterChecklist("checklist_body", "Priority", getItemPriority));
	document.getElementById("filterCompletion").addEventListener("click", () => filterChecklist("checklist_body", "Completion", getItemCompletion));
	document.getElementById("request_info").addEventListener("click", function(evt) {
		var elem = evt.target, colors = document.getElementById("color_chooser"), dates = document.getElementById("date_chooser");
		if (colors.classList.contains("menu-open") && !colors.contains(elem)
			&& !(elem.nodeName === "INPUT" && elem.getAttribute("purpose") != undefined && elem.getAttribute("purpose").indexOf("Color") !== -1)) {
			closeInputMenu();
		} else if (dates.classList.contains("menu-open") && !dates.contains(elem)
			&& !(elem.nodeName === "INPUT" && elem.classList.contains("date-input"))) {
			closeInputMenu();
		}
	});
	document.getElementById("sfs_bg").addEventListener("click", spotifyHide);
	document.getElementById("sfs_like").addEventListener("click", () => setSpotifyLike(void 0, true));
	document.getElementById("sfs_prev").addEventListener("click", () => spotifyPlaying(spotifyPrevious));
	document.getElementById("sfs_next").addEventListener("click", () => spotifyPlaying(spotifyNext));
	document.getElementById("sfs_media").addEventListener("click", () => spotifyPlaying(spotifyMedia));
	document.getElementById("date_prev").addEventListener("click", () => modifyDate(-1));
	document.getElementById("date_next").addEventListener("click", () => modifyDate(1));
}

function editFeed() {
	var feed = document.getElementById(currentFeed);
	var event = new CustomEvent("MouseEvent", {
  		detail: { target: feed }
	});
	feed.dispatchEvent(event);
	closeOptions(event, "feed_options");
	requestInfo(feed, -1, ['~backgroundColor:Color']);
}

function toggleAddMenu() {
	var menu = document.getElementById("add_menu");
	if (!menu.classList.contains("menu-open")) {
		menu.style.display = "block";
		setTimeout(() => menu.classList.add("menu-open"), 15);
	} else {
		menu.classList.remove("menu-open");
		setTimeout(() => menu.style.display = "none", 300);
	}
}

function toggleResize() {
	var wgtsMenu = document.getElementById("addWidgets_resize"),
		body = document.getElementById("body");
	chrome.storage.sync.get('widgets', widgets => {
		if (widgets['widgets'].length > 0) {
			var bool = !wgtsMenu.classList.contains("selected");
			wgtsMenu.classList.toggle("selected");
			for (let i = 0; i < body.children.length; ++i) {
				var node = body.children[i];
				node.classList.toggle("resizable");
				if (!node.classList.contains("no-widgets")) setMovable(bool, node);
				if (node.getAttribute("resizable") != undefined) setResize(bool, node);
			}
		}
	});
}

function getCoords(event) {
	var body = document.body.firstElementChild;
	return [event.clientX + body.scrollLeft, event.clientY + body.scrollTop];
}

function setMovable(bool, el) {
	if (bool) {
		var handle = document.createElement("div");
		handle.classList.add("move-handle");
		handle.classList.add("icon");
		handle.id = "move_" + el.id;
		handle.addEventListener("mousedown", startMove, false);
		setTimeout(() => handle.style.opacity = 1, 0);
		el.appendChild(handle);
	} else el.removeChild(document.getElementById("move_" + el.id));
}

function setResize(bool, el) {
	if (bool) {
		var handle = document.createElement("div"), triangle = document.createElement("div");
		handle.classList.add("resize-handle");
		handle.classList.add("icon");
		handle.id = "resize_" + el.id;
		handle.addEventListener("mousedown", startResize, false);
		triangle.classList.add("triangle");
		handle.appendChild(triangle);
		el.appendChild(handle);
		document.querySelector(".hud").classList.add("resizing");
	} else {
		el.removeChild(document.getElementById("resize_" + el.id));
		document.querySelector(".hud").classList.remove("resizing");
	}
}

function startResize(event) {
	resizeElem = event.target.parentNode;
	document.addEventListener("mousemove", updateResize, false);
}

function updateResize(evt) {
	var cursor = getCoords(evt),
		width = cursor[0] - resizeElem.offsetLeft,
		height = cursor[1] - resizeElem.offsetTop;
	resizeElem.style.width = width + "px";
	resizeElem.style.height = height + "px";
	detectMove(evt);
}

function stopResize(evt) {
	if (resizeElem) {
		let stl = resizeElem.getAttribute("style"), id = +resizeElem.id, style = "";
		for (let i = stl.length - 1; i >= 0; --i)
			if (!stl[i] === ' ' || !(stl[i - 1] === ';' || stl[i - 1] === ':'))
				style = stl[i] + style;
		getVar('widgets', id, wgt => {
			for (let i = 0; i < wgt.attributes.length; ++i) {
				if (wgt.attributes[i].key === 'style') {
					wgt.attributes.splice(i, 1);
					break;
				}
			}
			wgt.attributes.push({key: 'style', val: style});
			setVar('widgets', id, wgt);
		});
		document.removeEventListener("mousemove", updateResize, false);
		resizeElem = null;
	}
}

function startMove(event) {
	var body = document.getElementById("body"), destID = 0,
		nodesArray = Array.prototype.slice.call(body.children),
		coords = getCoords(event);
	body.classList.add("move-in-progress")
	moveElem = event.target.parentNode;
	moveElem.classList.add("moving");
	moveElem.style.left = coords[0] + "px";
	moveElem.style.top = coords[1] - body.scrollTop + "px";
	document.addEventListener("mousemove", updateMove, false);
	for (let i = 1, l = nodesArray.length + 1; i < l; i++) {
		var dest = createWidget(['div','move-dest',['id:dest_'+destID],[]]);
		if (nodesArray[i] != undefined) dest.style.height = nodesArray[i].clientHeight - 20 + "px";
		else dest.style.height = nodesArray[+i - 1].clientHeight + "px";
		if (nodesArray[i] != moveElem) {
			body.insertBefore(dest, nodesArray[i]);
			destID++;
		}
	}
}

function updateMove(event) {
	var coords = getCoords(event), winLimit = window.innerHeight, body = document.body.firstElementChild;
	moveElem.style.left = coords[0] + "px";
	moveElem.style.top = coords[1] - body.scrollTop + "px";
	detectMove(event);
}

function detectMove(event) {
	var body = document.body.firstElementChild;
	if (body.scrollHeight > window.innerHeight && event.pageY > (window.innerHeight / 3) * 2) body.scrollTop += 20;
	else if (body.scrollHeight > window.innerHeight && body.scrollTop > 0 && event.pageY < (window.innerHeight / 3)) body.scrollTop -= 20;
}

function stopMove(event) {
	if (moveElem && moveElem.classList.contains("card")) {
		var body = document.getElementById("body"), coords = getCoords(event),
			id = -1, index = -1, elem = moveElem, elemLanding, dest,
			chitlins = Array.prototype.slice.call(body.children);
		body.classList.remove("move-in-progress");
		document.removeEventListener("mousemove", updateMove, false);
		for (let i = 0, l = chitlins.length; i < l; ++i) {
			let node = chitlins[i];
			if (!node.classList.contains("moving")) {
				let rect = node.getBoundingClientRect();
				if (coords[0] >= rect.left && coords[0] <= rect.left + rect.width
					&& coords[1] >= rect.top + body.scrollTop && coords[1] <= rect.top + body.scrollTop + rect.height) {
					id = node.id.substring(5);
					elemLanding = node;
					break;
				}
			}
		}
		moveElem.classList.remove("moving");
		moveElem.style.removeProperty("left");
		moveElem.style.removeProperty("top");
		dest = chitlins[chitlins.indexOf(elemLanding) + 1];
		for (let i = chitlins.length - 1; i >= 0; --i) {
			if (chitlins[i].classList.contains("move-dest"))
				body.removeChild(chitlins[i]);
		}
		while (elem = elem.previousElementSibling) ++index;
		chrome.storage.sync.get('widgets', wgts => {
			let widgets = wgts['widgets'], destIndex = body.childElementCount, moveIndex, moveInfo;
			widgets.forEach((widget, index) => {
				if (elemLanding.classList.contains("card") && widget.key === +elemLanding.id) destIndex = index;
				else if (dest && widget.key === +dest.id) destIndex = index;
				if (widget.key === +moveElem.id) {
					moveIndex = index;
					moveInfo = widgets[index];
				}
			});
			if (id !== -1 && elemLanding.classList.contains("card")) {
				var temp = document.createElement("div");
				body.insertBefore(temp, elemLanding);
				body.insertBefore(elemLanding, moveElem);
				body.insertBefore(moveElem, temp);
				body.removeChild(temp);
				widgets[moveIndex] = widgets[destIndex];
				widgets[destIndex] = moveInfo;
			} else if (id !== -1 && id < index) {
				body.insertBefore(moveElem, body.children[+id + 1]);
				widgets.splice(moveIndex, 1);
				widgets.splice(destIndex, 0, moveInfo);
			} else if (id !== -1 && id > index) {
				body.insertBefore(moveElem, body.children[+id + 2]);
				widgets.splice(moveIndex, 1);
				widgets.splice(destIndex - 1, 0, moveInfo);
			}
			chrome.storage.sync.set({widgets: widgets});
			moveElem = void 0;
		});
	}
}

function welcome() {
	var welcome = document.getElementById("welcome");
	welcome.classList.add("menu-open");
	document.getElementById("welcome_go").addEventListener("click", () => {
		welcome.classList.remove("menu-open");
		chrome.storage.sync.set({opened: true});
	});
}

function createFeed(parent, xml, feedNum) {
	while (parent.firstChild) parent.removeChild(parent.firstChild);
	parent.parentNode.firstChild.href = xml.meta.link;
	parent.parentNode.firstChild.childNodes[0].nodeValue = xml.meta.title;
	var base = document.createDocumentFragment(), end = document.createElement("div"), currentWrapper;
	for (let i = 0, l = xml.entries.length; i < l; i++) {
		var wrapper, header, title, footer, desc, extra, author, date, url, ctx;
		wrapper = document.createElement("a");
		wrapper.classList.add("feed-entry");
		wrapper.href = xml.entries[i].link;
		wrapper.target = "_blank";
		wrapper.rel = "noopener noreferrer";
		header = document.createElement("div");
		header.classList.add("entry-header", "icon");
		url = Object.keys(xml.entries[i].image).length === 0
			? getImgURL(parent, xml.entries[i].description, header, i)
			: header.style.backgroundImage = `url(${apiBaseURL}resize?url=${xml.entries[i].image.url}&w=${parent.clientWidth})`;
		if (!header.style.backgroundImage) header.classList.add('empty-header');
		title = document.createElement("span");
		title.classList.add("entry-title");
		title.appendChild(document.createTextNode(xml.entries[i].title));
		footer = document.createElement("div");
		desc = document.createElement("span");
		desc.classList.add("entry-desc");
		desc.innerHTML = getDesc(xml.entries[i].summary ? xml.entries[i].summary : xml.entries[i]['atom:content']);
		extra = document.createElement("div");
		extra.classList.add("entry-extra");
		author = document.createElement("span");
		author.classList.add("entry-author");
		author.appendChild(document.createTextNode("By: " + xml.entries[i].author));
		date = document.createElement("span");
		date.classList.add("entry-date");
		date.appendChild(document.createTextNode(getDateStr(xml.entries[i].date)));
		footer.appendChild(desc);
		extra.appendChild(author);
		extra.appendChild(date);
		footer.appendChild(extra);
		header.appendChild(title);
		wrapper.appendChild(header);
		wrapper.appendChild(footer);
		base.appendChild(wrapper);
		currentWrapper = wrapper;
	}
	end.classList.add("feed-footer");
	end.appendChild(document.createTextNode("No More Entries Found"));
	base.appendChild(end);
	parent.appendChild(base);
}

function getDateStr(date) {
	var d = new Date(date), curr = new Date();
	if (d.getDate() == curr.getDate()) {
		var diff = curr.getHours() - d.getHours();
		if (diff === 0) {
			diff = curr.getMinutes() - d.getMinutes();
			if (diff === 0) return "Right now";
			else if (diff === 1) return "A minute ago";
			else return diff + " minutes ago";
		} else if (diff === 1) return "An hour ago";
		else return diff + " hours ago";
	} else {
		var diff = curr.getDate() - d.getDate();
		if (diff === 1) return "1 day ago";
		else return diff + " days ago";
	}
}

function refreshFeed(sendRefresh) {
	if (sendRefresh === void 0) sendRefresh = true;
	var fn = currentFeed, feed = document.getElementById(fn);
	loadRSS(feed.childNodes[1], feed.getAttribute("href"), fn, sendRefresh);
	document.getElementById("feed_options").removeAttribute("open");
}

function getDesc(desc) {
	if (typeof desc === 'object') desc = desc['#'];
	for (let i = 0; i < desc.length + 5; ++i) {
		['script', 'style'].forEach(tag => {
			let tagLength = tag.length + 2;

			if (desc.substring(i, i + tagLength) == `<${tag}>`) {
				for (let j = i + 1; j < desc.length + tagLength + 1; ++j) {
					if (desc.substring(j, j + tagLength + 1) == `</${tag}>`) {
						let begin = desc.substring(0, i), end = desc.substring(j + tagLength + 1, desc.length);
						desc = begin + end;
						break;
					}
				}
			}
		});
	}
	var temp = document.createElement("div");
	temp.innerHTML = desc;
	return temp.textContent.substring(0, 1000);
}

function getImgURL(parent, desc, header) {
	var imgTypes = ["jpg", "png", "jpeg"], url, yt = desc.search("youtube.com/embed");
	OUTER: for (let i = 0, l = imgTypes.length; i < l; i++) {
		for (let j = 0, d = desc.length; j < d; j++) {
			if (desc.charAt(j) === '.' && desc.substring(j + 1, j + imgTypes[i].length + 1) === imgTypes[i]) {
				var k = j;
				while (k > 0 && desc.charAt(k) !== '"') k--;
				url = desc.substring(k + 1, j + imgTypes[i].length + 1);
				if (url.search("blank") === -1) break OUTER;
			}
		}
	}
	if (yt !== -1) {
		var k = yt;
		while (k < desc.length && desc.charAt(k) !== '"') k++;
		url = "https://i3.ytimg.com/vi/" + desc.substring(yt + 18, k).split("?")[0] + "/sddefault.jpg";
	}
	if (url) header.style.backgroundImage = `url(${apiBaseURL}resize?url=${encodeURIComponent(url)}&w=${parent.clientWidth}`;
}

function requestPushbulletInfo() {
	document.getElementById("request_body").appendChild(document.createTextNode("Waiting for Authorization..."));
	const pushbulletClientID = "A6HQpc0h7BSwidCjxWZbGWsNimUyCm4g";
	getVar('vars', 'PBAccessToken', res => {
		if (!res) {
			var redirectURI = encodeURI(chrome.identity.getRedirectURL("oauth2")),
				authURL = "https://www.pushbullet.com/authorize?client_id=" + pushbulletClientID + "&redirect_uri=" + redirectURI + "&response_type=token";
			chrome.identity.launchWebAuthFlow({'url': authURL, 'interactive': true}, function(redirect_url) {
		    	if (redirect_url && redirect_url.indexOf("#") !== -1) {
					setVar('vars', 'PBAccessToken', redirect_url.split("=")[1]);
					request("GET", "https://api.pushbullet.com/v2/devices", ["Access-Token:" + redirect_url.split("=")[1]], addDevices);
		    	} else document.getElementById("request_body").textContent = "Authorization failed, please try again.";
			});
		} else request("GET", "https://api.pushbullet.com/v2/devices", ["Access-Token:" + res], addDevices);
	});
}

function addDevices(devices) {
	document.getElementById("request_body").firstChild.remove();
	getVar('vars', 'phoneID', phoneID => {
		var body = document.getElementById("request_body");
		if (devices.devices.length > 0) {
			for (let i = 0, l = devices.devices.length; i < l; ++i) {
				var device = devices.devices[i];
				var btn = createWidget(['div','pb-device-btn',['id:' + device.iden],[device.nickname]]);
				if (phoneID === device.iden) btn.classList.add("current-device");
				switch (device.type) {
					case "ios":
						btn.classList.add("device-ios");
						break;
					case "android":
						btn.classList.add("device-android");
						break;
					case "chrome":
						btn.textContent = "Chrome Extension";
						btn.classList.add("device-chrome");
						break;
				}
				btn.addEventListener("click", setDevice);
				addRipplesTo(btn);
				body.appendChild(btn);
			}
		} else body.appendChild(createWidget(['span','pushbullet-no-devices',[],['No Devices Found']]));
	});
}

function setDevice(event) {
	getVar('vars', 'phoneID', phoneID => {
		var iden = event.target.id;
		if (phoneID != undefined && phoneID == iden) {
			document.getElementById(phoneID).classList.remove("current-device");
			removeVar('vars', 'phoneID');
		} else if (phoneID != undefined) {
			document.getElementById(phoneID).classList.remove("current-device");
		}
		if (phoneID !== iden) {
			event.target.classList.add("current-device");
			setVar('vars', 'phoneID', iden);
		}
	});
}

function sendReminder() {
	getVar('vars', ['phoneID', 'PBAccessToken'], args => {
		var title = document.getElementById("reminder_ttl"), body = document.getElementById("reminder_bdy"), ttl = title.value;
		if (ttl.trim() == "" && body.value.trim() == "") return;
		else if (ttl.trim() == "") ttl = "Reminder";
		var req = new XMLHttpRequest();
		req.open("POST", "https://api.pushbullet.com/v2/pushes", true);
		req.setRequestHeader("Authorization", "Basic " + btoa(args[1] + ":"));
		req.setRequestHeader("Content-Type", "application/json");
		var params = {type : "note", title : ttl, body : body.value.trim()}
		if (args[0] != undefined && args[0].length > 0) params.device_iden = args[0];
		req.send(JSON.stringify(params));
		title.value = "";
		body.value = "";
		snackbar("Note Sent");
	});
}

function getDataURI(url, callback, inputSpotifyFS) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    	if (xhr.status === 200) {
        	if (inputSpotifyFS) callback(xhr.responseText, true);
        	else callback(xhr.responseText);
    	}
    };
    xhr.open('GET', `${apiBaseURL}basic?url=${encodeURIComponent(url)}`, true);
    xhr.send();
};

function requestSpotifyAuth() {
	getVar('widgets', 7, res => {
		if (res) {
			spotify.authOpen = true;
			const spotifyClientID = "d06ceeabd9c54023bd2aaefdf3846c86",
					scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state user-library-read user-library-modify';
			var redirectURI = chrome.identity.getRedirectURL("spotify"),
				authURL = "https://accounts.spotify.com/authorize?client_id=" + spotifyClientID + "&redirect_uri=" + encodeURIComponent(redirectURI) + "&response_type=code&scope=" + encodeURIComponent(scope);
			chrome.identity.launchWebAuthFlow({'url' : authURL, 'interactive' : true}, function(redirect_url) {
				if (redirect_url) request("GET", `${apiBaseURL}spotifyauth?redirect_uri=${redirectURI}&code=${redirect_url.split("=")[1]}`, undefined, response => {
					setVar('vars', ['SpotifyOAuth', 'SpotifyRefresh'], [response.access_token + "%" + new Date().getTime(), response.refresh_token]);
				});
			});
		}
	});
}

function spotifyMedia(req, status) {
	switch (status) {
		case 204:
			snackbar("No Active Device Found");
			break;
		case 401:
			setSpotifyOAuth();
			break;
		default:
			var media = document.getElementById("spotify_media"), sfsMedia = document.getElementById("sfs_media"), url = "play";
			if (req.is_playing) {
				url = "pause";
				media.setAttribute("paused", "");
				if (spotify.fullscreen) sfsMedia.setAttribute("paused", "");
				clearTimeout(spotify.updateTimer);
			} else {
				media.removeAttribute("paused");
				if (spotify.fullscreen) sfsMedia.removeAttribute("paused");
			}
			getVar('vars', 'SpotifyOAuth', res => request("PUT", "https://api.spotify.com/v1/me/player/" + url, ["Authorization:Bearer " + res], req => updateSpotifyPlayer(req, void 0, true)));
	}
}

function updateSpotifyPlayer(req, startCountdown, ignoreMedia) {
	let [media, sfsMedia] = getElements('spotify_media', 'sfs_media');
	if (media) {
		checkSpotifyLike(setSpotifyLike);
		if (!req.is_playing && !ignoreMedia && spotify.fullscreen) sfsMedia.setAttribute("paused", "");
		else if (!ignoreMedia && spotify.fullscreen) sfsMedia.removeAttribute("paused");
		if (!req.is_playing && !ignoreMedia) media.setAttribute("paused", "");
		else if (!ignoreMedia) media.removeAttribute("paused");

		getVar(
			'vars', 
			['SpotifyTitle', 'SpotifyAlbum', 'SpotifyAuthors', 'SpotifySongID'], 
			args => updatePlayerDetails(req, args, startCountdown)
		);
	}
}

function updatePlayerDetails(req, args, startCountdown) {
	let [storedTitle, storedAlbum, storedAuthors, storedID] = args;
	if (startCountdown === 401) {
		chrome.storage.local.get('SpotifyArt', res => document.getElementById("spotify_albumArt").src = res['SpotifyArt']);
		document.getElementById("spotify_title").firstElementChild.textContent = storedTitle + " - " + storedAuthors;
		doVibrant();
	}
	else if (widgetsAdded[7] && req.item?.id && req.item.id !== storedID) {
		if (req.item.name !== storedTitle) {
			let title = document.getElementById("spotify_title");
			let authors = req.item.artists.reduce((str, artist, index) => str + (index > 0 ? ' \u2022 ' : '') + artist.name, '');
			title.firstElementChild.textContent = req.item.name + " - " + authors;
			if (req.item.album.images.length === 0) {
				chrome.storage.local.remove('SpotifyArt');
				document.getElementById("spotify_albumArt").removeAttribute("src");
				media.removeAttribute("style");
				media.parentNode.classList.remove("dark");
				document.getElementById("spotify_next").removeAttribute("style");
				document.getElementById("spotify_previous").removeAttribute("style");
				document.getElementById("spotify_title").removeAttribute("style");
				document.getElementById("spotify_title").classList.add("spotify-title-dark");
				document.getElementById("spotify_expand").removeAttribute("style");
			}
			else if (storedAlbum !== req.item.album.name) getDataURI(req.item.album.images[0].url, doVibrant, true);
			setVar('vars', ['SpotifyTitle', 'SpotifyAuthors', 'SpotifyAlbum', 'SpotifySongID'], [req.item.name, authors, req.item.album.name, req.item.id], () => {
				if (storedAlbum === req.item.album.name && spotify.fullscreen) spotifyExpand(true);
			});
			if (startCountdown !== void 0) spotify.updateTimer = setTimeout(() => spotifyPlaying(updateSpotifyPlayer), req.item.duration_ms - req.progress_ms + 400);
		}
	}
}

function doVibrant(req) {
	let [art, media, next, previous, title, expand, like] = 
		getElements('spotify_albumArt', 'spotify_media', 'spotify_next', 'spotify_previous', 
					'spotify_title', 'spotify_expand', 'spotify_like');
	art.addEventListener("load", function() {
		var vibrant = new Vibrant(art), swatches = vibrant.swatches(), colors = [], color, bgColor;
		if (swatches.LightVibrant) colors = swatches.LightVibrant.rgb;
		else for (var swatch in swatches) {
			if (swatches.hasOwnProperty(swatch) && swatches[swatch])
				 colors = swatches[swatch].rgb;
		}
		color = "rgb(" + colors.join(",") + ")";
		var total = colors[0] + colors[1] + colors[2];
		if (total >= 680 || total <= 60) {
			media.parentNode.parentNode.classList.add("dark");
			color = "#4c4c4c";
			title.style.removeProperty("background-color");
			title.classList.add("spotify-title-dark");
		} else {
			media.parentNode.parentNode.classList.remove("dark");
			title.classList.remove("spotify-title-dark");
			title.style.backgroundColor = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + ",.5)";
		}
		next.firstElementChild.style.fill = color;
		previous.firstElementChild.style.fill = color;
		like.firstElementChild.style.fill = color;
		like.lastElementChild.style.fill = color;
		expand.style.backgroundColor = color;
		if (total <= 60) media.style.backgroundColor = "#fff";
		else media.style.backgroundColor = "rgb(" + colors.join(",") + ")";
	});
	if (req) {
		chrome.storage.local.set({ SpotifyArt: req }, () => {
			if (spotify.fullscreen) spotifyExpand(true);
		});
		art.src = req;
	} else getVar('vars', ['SpotifyTitle', 'SpotifyAuthors'], args => {
			document.getElementById("spotify_title").firstElementChild.textContent = args[0] + " - " + args[1];
			chrome.storage.local.get('SpotifyArt', req => {
				art.src = req['SpotifyArt'] ? req['SpotifyArt'] : '';
			});
			if (spotify.fullscreen) spotifyExpand(true);
	});
}

function spotifyNext(req, status) {
	if (status === 204) snackbar("No Active Device Found");
	else if (status === 401) setSpotifyOAuth();
	else request("POST", "https://api.spotify.com/v1/me/player/next", ["Authorization:Bearer " + spotify.authToken.split("%")[0]], () => {
		document.getElementById("spotify_media").removeAttribute("paused");
		setTimeout(() => spotifyPlaying(updateSpotifyPlayer), 700);
	});
}

function spotifyPrevious(req, status) {
	if (status === 204) snackbar("No Active Device Found");
	else if (status === 401) setSpotifyOAuth();
	else request("POST", "https://api.spotify.com/v1/me/player/previous", ["Authorization:Bearer " + spotify.authToken.split("%")[0]], () => {
		document.getElementById("spotify_media").removeAttribute("paused");
		setTimeout(() => spotifyPlaying(updateSpotifyPlayer), 700);
	});
}

function spotifyPlaying(callback) {
	if (spotify.authToken) {
		request(
			"GET", 
			"https://api.spotify.com/v1/me/player/currently-playing", 
			["Authorization:Bearer " + spotify.authToken.split("%")[0]], 
			callback
		);
	}
	else setSpotifyOAuth();
}

function checkSpotifyLike(callback) {
	if (spotify.authToken) {
		getVar('vars', 'SpotifySongID', songID => {
			request(
				"GET", 
				`https://api.spotify.com/v1/me/tracks/contains?ids=${songID}`, 
				["Authorization:Bearer " + spotify.authToken.split("%")[0]], 
				callback
			);
		});
	}
	else setSpotifyOAuth();
}

function setSpotifyLike(liked, toggle) {
	if (typeof liked === 'object') liked = liked[0];
	if (toggle === 200) toggle = false;

	let btn = spotify.fullscreen ? document.getElementById("sfs_like") : document.getElementById("spotify_like");
	if (toggle) {
		liked = !btn.hasAttribute("liked");
		getVar('vars', 'SpotifySongID', songID => {
			request(
				liked ? "PUT" : "DELETE", 
				`https://api.spotify.com/v1/me/tracks?ids=${songID}`, 
				["Authorization:Bearer " + spotify.authToken.split("%")[0]],
				() => snackbar(`${liked ? "Added to" : "Removed from"} your Liked Songs`)
			);
		});
	}
	if (liked) btn.setAttribute("liked", "");
	else btn.removeAttribute("liked");
}

function spotifyExpand(update) {
	spotify.fullscreen = true;
	let [sfsMedia, media, like] = getElements("sfs_media", "spotify_media", "spotify_like");
	setSpotifyLike(like.hasAttribute("liked"), false);

	if (!update && media.getAttribute("paused") != "") sfsMedia.removeAttribute("paused");
	else if (!update) sfsMedia.setAttribute("paused", "");

	getVar('vars', ['SpotifyAuthors', 'SpotifyTitle', 'SpotifyAlbum'], args => updateSpotifyExpandedPlayer(args, sfsMedia));
	if (!update) {
		snackbar("Click to Exit Fullscreen");
		var sfs = document.getElementById("sfs");
		sfs.style.display = "flex";
		setTimeout(() => sfs.classList.add("open"), 0);
		document.documentElement.webkitRequestFullscreen();
	}
}

function updateSpotifyExpandedPlayer(args, media) {
	if (args) {
		let [author, title, album] = args;
		document.getElementById("sfs_title").textContent = title ? title : "No Song Information";
		document.getElementById("sfs_album").textContent = (title === album) ? "Single" : album;
		document.getElementById("sfs_author").textContent = author ? author : "No Authors Found";
		if (title) {
			let [art, next, previous, info, bg, like] = getElements('sfs_art', 'sfs_next', 'sfs_prev', 'sfs_info', 'sfs_bg', 'sfs_like');
			chrome.storage.local.get('SpotifyArt', req => {
				let res = req['SpotifyArt'];
				if (res) art.addEventListener("load", () => {
					let vibrant = new Vibrant(art), swatches = vibrant.swatches(), colors = [], color;
					if (swatches.LightVibrant) colors = swatches.LightVibrant.rgb;
					else for (var swatch in swatches) {
						if (swatches.hasOwnProperty(swatch) && swatches[swatch]) colors = swatches[swatch].rgb;
					}
					color = "rgb(" + colors.join(",") + ")";
					let total = colors[0] + colors[1] + colors[2];
					if (total >= 690 || total <= 60) {
						media.parentNode.parentNode.classList.add("dark");
						color = "#4c4c4c";
					} else media.parentNode.parentNode.classList.remove("dark");
					like.lastElementChild.style.fill = color;
					like.firstElementChild.style.fill = color;
					next.firstElementChild.style.fill = color;
					previous.firstElementChild.style.fill = color;
					if (total <= 60) {
						media.style.backgroundColor = "#fff";
						info.style.backgroundColor = "rgba(255,255,255,.3)";
					} else {
						media.style.backgroundColor = "rgb(" + colors.join(",") + ")";
						info.style.backgroundColor = "rgba(" + colors.join(",") + ",.35)";
					}
					bg.style.background = "rgba(" + colors.join(",") + ",.5)";
				});
				art.src = res ?? "res/image.svg";
			});
		}
	}
}

function spotifyHide() {
	document.webkitExitFullscreen();
	spotify.fullscreen = false;
	var sfs = document.getElementById("sfs");
	sfs.classList.remove("open");
	setTimeout(() => sfs.style.display = "none", 600);
}

function setTime() {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], cd = [12,31];
	var time = document.getElementById("time"), date = document.getElementById("date"),
		d = new Date(), hrs = d.getHours(), mins = d.getMinutes(), countdown = document.getElementById("countdown");
	if (time) {
		if (hrs >= 13) {
			time.classList.add("PM");
			hrs -= 12;
		} else time.classList.remove("PM");
		if (mins < 10) mins = "0" + mins;
		time.textContent = hrs + ":" + mins;
		date.textContent = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
	}
	if (countdown) {
		if (countdown.firstChild) countdown.firstChild.remove();
		countdown.appendChild(document.createTextNode(getCountdown(cd[0], cd[1]) + " Days"));
	}
	if (widgetsAdded[3]) getWeather();
	getVar('vars', ['SpotifyOAuth', 'SpotifyRefresh'], args => {
		if (args && (!args[0] && args[1] || (args[0] && d.getTime() - args[0].split("%")[1] > 1800000))) setSpotifyOAuth();
	});
	setTimeout(setTime, (60 - d.getSeconds()) * 1000);
}

function addNum(num) {
	var parent = document.getElementById("calc_readout"), el = parent.firstChild, char = "";
	if (el == undefined) el = parent.appendChild(document.createTextNode(''));
	if (el.nodeValue === "ERROR") {
		el.nodeValue = "0";
		return;
	}
	if (!isNaN(num)) char = num;
	else {
		switch (num) {
			case "divide": char = "/"; break;
			case "multiply": char = "*"; break;
			case "plus": char = "+"; break;
			case "minus": char = "-"; break;
			case "period":
				if (el.nodeValue === "0") char = "0.";
				else char = ".";
				break;
			case "solve":
				var solution = solve(el.nodeValue);
				char = "";
				if (solution) el.nodeValue = solution;
				break;
			case "clear":
				char = "";
				el.nodeValue = 0;
		}
	}
	if (el.nodeValue == "0" && num != "clear" && num != "solve") el.nodeValue = char;
	else el.nodeValue += char;
}

function solve(str) {
	let operators = ['*', '/', '+', '-'], symbols = ['+', '-', '*', '/', '(', ')'], parsed = [''], parens = 0, ops = 0, nums = 0;
	for (let i = 0, char = str[0]; i < str.length; ++i, char = str[i]) {
		if (char === ' ') continue;
		else if (symbols.includes(char)) {
			parsed.push(char);
			if (operators.includes(char)) ++ops;
			else if (char === '(') ++parens;
			else --parens;
		}
		else if (i < str.length - 1 && (char === 'p' || char === 'P') && (str[i + 1] === 'i' || str[i + 1] === 'I')) {
			parsed.push(Math.PI);
			++i;
		}
		else if (symbols.includes(parsed[parsed.length - 1])) parsed.push(char);
		else parsed[parsed.length - 1] += char;
	}
	if (parsed[0] === '') parsed.shift();
	for (let i = parsed.length - 1, char = parsed[i]; i >= 0; --i, char = parsed[i]) {
		if (!isNaN(char)) {
			parsed[i] = +char;
			++nums;
		}
		if (i < parsed.length - 1 && !isNaN(char) && (parsed[i + 1] === '(' || parsed[i + 1] === Math.PI)) {
			parsed.splice(i + 1, 0, '*');
			++ops;
		}
	}
	if (parens !== 0 || nums - ops !== 1) return "ERROR";
	return parsed.length > 1 ? simplify(parsed) : parsed[0];
}

function simplify(expr) {
	const op = {
	    '+': (a, b) => a + b,
	    '-': (a, b) => a - b,
	    '*': (a, b) => a * b,
	    '/': (a, b) => a / b
	};

	if (expr.length === 1) return expr[0];
	let operations = (op1, op2) => {
		while (expr.length > 1 && expr.includes(op1) || expr.includes(op2))
			for (let i = 0, char = expr[0]; i < expr.length; ++i, char = expr[i]) {
				if (char === '(') {
					let endIndex = i + 1;
					for (let parens = 0; endIndex < expr.length; ++endIndex) {
						if (expr[endIndex] === ')' && parens === 0) break;
						else if (expr[endIndex] === '(') ++parens;
						else if (expr[endIndex] === ')') -- parens;
					}
					expr.splice(i, endIndex - i + 1, simplify(expr.slice(i + 1, endIndex)));
				}
				else if (i > 0 && (char === op1 || char === op2)) expr.splice(i - 1, 3, op[char](expr[i - 1], expr[i + 1]));
			}
		return expr;
	}
	expr = operations('(') && operations('*', '/') && operations('+', '-');
	return expr;
}

function findFeedURL(url, callback) {
	snackbar('Searching for Feed URL');
	if (url.substring(0, 6) !== "https:" && url.substring(0, 5) !== "http:") url = "https://" + url;
	if (url[url.length - 1] === '/') url = url.slice(0, -1);
	feednami.load(url, res => {
		if (!res.error) callback(url);
		else feednami.load(url + "/feed", res => {
			if (!res.error) callback(url + "/feed");
			else callback(404);
		});
	});
}

function makeFeedURL(url) {
	if (url.substring(url.length - 1) == "/") url = url.substring(0, url.length - 1);
	if (url.indexOf("www") == -1 && url.indexOf("http") == -1) url = "www." + url;
	else if (url.indexOf("www") == -1 && url.indexOf("http") != -1) url = "http://www." + url.substring(url.indexOf("://") + 3);
	if (url.indexOf("http") == -1) url = "http://" + url;
	return url;
}

function loadRSS(base, url, feedNum, isRefresh) {
	var refresh_btn = document.getElementById("feedOptions_" + feedNum);
	if (!url) return;
	url = makeFeedURL(url);
	if (!isRefresh && base.parentNode.getAttribute("backgroundColor") != undefined) base.parentNode.firstChild.style.backgroundColor = base.parentNode.getAttribute("backgroundColor");
	else if (!isRefresh) base.parentNode.firstChild.style.backgroundColor = "#" + colors[~~(Math.random() * (colors.length + 1))];
	if (refresh_btn == undefined) {
		var refresh = createWidget(['div','feed-options|feed-options-btn|icon',['id:feedOptions_'+feedNum,function() {openOptions(this.id, "feed_options")}],[]]);
		addRipplesTo(refresh);
		addTooltip(refresh, "Feed Options");
		addTooltip(base.parentNode.firstElementChild, "Go to Website");
		base.parentNode.appendChild(refresh);
	}
	if (base.childNodes.length === 0) {
		var loading = document.createElement("span");
		loading.classList.add("feed-loading");
		loading.appendChild(document.createTextNode("Loading ..."));
		base.appendChild(loading);
	}
	feednami.load(url, function(result) {
		if (isRefresh) snackbar("Feed Refreshed");
		if (result.error) {
			var loadText = base.firstChild;
			loadText.textContent = "This feed could not be loaded. Please make sure this website has an RSS feed and that you entered the correct URL";
			loadText.classList.add("feed-error");
		} else createFeed(base, result.feed, feedNum);
	});
}

function stopwatch() {
	var btn = document.getElementById("stpw_main"),
		reset = document.getElementById("stpw_reset"),
		text = document.getElementById("stpw_text");
	if (stpw.referenceTime === -1) stpw.referenceTime = new Date().getTime();
	if (btn.getAttribute("paused") === 'true') {
		if (stpw.differenceTime != 0) stpw.referenceTime += (new Date().getTime() - stpw.differenceTime);
		stpw.timer = setInterval(updateTime, 1);
		btn.removeAttribute("paused");
		reset.classList.remove("reset-visible");
		text.style.animation = "none";
	} else {
		stpw.differenceTime = new Date().getTime();
		clearInterval(stpw.timer);
		btn.setAttribute("paused", "true");
		reset.classList.add("reset-visible");
		text.style.animation = "stpw 1s infinite";
	}
}

function updateTime() {
	var timerMin = document.getElementById("stpw_min").childNodes[0],
		timerSec = document.getElementById("stpw_sec").childNodes[0],
		timerMilli = document.getElementById("stpw_milli").childNodes[0];
	var t = (new Date().getTime() - stpw.referenceTime), milli = ~~((t % 1000) / 10);
	if (milli >= 10) timerMilli.nodeValue = milli;
	else timerMilli.nodeValue = "0" + milli;
	t /= 1000;
	if (~~(t % 60) != timerSec.nodeValue && t % 60 >= 10) timerSec.nodeValue = ~~(t % 60);
	else if (~~(t % 60) != timerSec.nodeValue) timerSec.nodeValue = "0" + ~~(t % 60);
	t /= 60;
	if (~~(t % 60) != timerMin.nodeValue) timerMin.nodeValue = ~~(t % 60);
}

function reset() {
	var timerMin = document.getElementById("stpw_min").childNodes[0],
		timerSec = document.getElementById("stpw_sec").childNodes[0],
		timerMilli = document.getElementById("stpw_milli").childNodes[0];
	stpw.referenceTime = -1;
	stpw.differenceTime = 0;
	timerMin.nodeValue = "0";
	timerSec.nodeValue = "00";
	timerMilli.nodeValue = "00";
	document.getElementById("stpw_reset").classList.remove("reset-visible");
	document.getElementById("stpw_text").style.removeProperty("animation");
}

function addChecklistItem(body, stored) {
	if (body.childElementCount === 1 && body.children[0].classList.contains("checklist-empty")) body.removeChild(body.firstChild);
	var item = createWidget(['div','checklist-item',[],[['input','checklist-check',['type:checkbox'],[]],['input','input-text|checklist-input',['type:text'],[]],['div','checklist-options',[checklistOptions],[]]]]);
	item.firstElementChild.addEventListener("change", evt => sendMessage("checkItem", getItemID("checklist_body", evt.target.parentNode)));
	item.children[1].addEventListener("keyup", evt => sendMessage("setText", getItemID("checklist_body", evt.target.parentNode), evt.target.value));
	item.lastElementChild.addEventListener("mousedown", checklistPreDrag);
	item.lastElementChild.addEventListener("mouseup", () => checklist.draggingItem = false);
	item.lastElementChild.addEventListener("mouseout", () => checklist.draggingItem = false);
	addTooltip(item.children[2], "Item Options");
	addRipplesTo(item.children[2]);
	body.appendChild(item);
	item.children[1].focus();
	if (!stored) sendMessage("addItem");
	return item;
}

function checklistPreDrag(evt) {
	checklist.draggingItem = true;
	setTimeout(function() {
		if (checklist.draggingItem) dragChecklistItem(evt);
	}, 200);
}

function dragChecklistItem(evt) {
	var body = document.getElementById("checklist_body"), end = document.createElement("div");
	for (let i = 0, l = body.childElementCount; i < l; i++) {
		body.children[i].addEventListener("mouseover", addChecklistDrop);
	}
	end.id = "checklist_end";
	end.classList.add("checklist-item", "checklist-item-end");
	end.addEventListener("mouseover", addChecklistDrop);
	body.appendChild(end);
	moveElem = evt.target.parentNode;
	checklist.moveID = getItemID("checklist_body", moveElem);
	window.addEventListener("mousemove", updateChecklistDrag);
}

function addChecklistDrop(evt) {
	var itm = evt.target, body = document.getElementById("checklist_body");
	for (let i = body.childElementCount - 1, l = 0; i >= l; i--) {
		if (body.children[i].classList.contains("checklist-drop")) body.children[i].remove();
	}
	while (!itm.classList.contains("checklist-item")) itm = itm.parentNode;
	if (!itm.previousElementSibling || (itm.previousElementSibling && !itm.previousElementSibling.classList.contains("checklist-drop"))) {
		var drop = document.createElement("div");
		drop.addEventListener("mouseup", stopChecklistDrag);
		drop.classList.add("checklist-drop");
		itm.parentNode.insertBefore(drop, itm);
	}
}

function updateChecklistDrag(evt) {
	if (!moveElem.classList.contains("check-itm-moving")) {
		moveElem.classList.add("check-itm-moving");
		moveElem.style.width = moveElem.parentNode.clientWidth - 5 + "px";
	}
	moveElem.style.left = evt.pageX + "px";
	moveElem.style.top = evt.pageY + "px";
}

function stopChecklistDrag(evt) {
	var body = document.getElementById("checklist_body"), end = document.getElementById("checklist_end"), dest;
	if (body && evt) {
		body.insertBefore(moveElem, evt.target.nextElementSibling);
		if (end) end.remove();
		for (let i = body.childElementCount - 1; i >= 0; i--) {
			body.children[i].removeEventListener("mouseover", addChecklistDrop);
			if (body.children[i].classList.contains("checklist-drop")) body.children[i].remove();
		}
		dest = getItemID("checklist_body", moveElem);
		if (evt && checklist.moveID !== dest) sendMessage("moveItem", checklist.moveID, dest);
		if (moveElem) {
			moveElem.style.left = "3px";
			moveElem.style.top = "auto";
			moveElem.style.width = "calc(100% - 6px)";
			moveElem.classList.remove("check-itm-moving");
		}
		moveElem = void 0;
		window.removeEventListener("mousemove", updateChecklistDrag);
	}
}

function checklistOptions(event) {
	var file = '', menu = document.getElementById("request_info"), body = document.getElementById("request_body"), date = "",
		submit = document.getElementById("request_submit"), item = event.target.parentNode, fileItm = item.children[3];
	if (item.children[3] && item.children[3].href && (item.children[3].href.substring(0, 4) === "http" || item.children[3].href.substring(0, 8) === "file:///")) file = item.children[3].href;
	else if (item.children[3] && item.children[3].getAttribute("note")) file = item.children[3].getAttribute("note");
	if (item.children[3] && item.children[3].classList.contains("checklist-date")) date = item.children[3].getAttribute("date");
	else if (item.children[4]) date = item.children[4].getAttribute("date");
	var del = createWidget(['div','checklist-remove|btn|menu-submit|menu-cancel',[removeChecklistItem],['DELETE']]),
		input = createWidget(['input','input-text',['type:text','autocomplete:off','id:checklistOptions_input','required:','value:' + file],[]]),
		label = createWidget(['label','label-request',['for:checklistOptions_input'],['URL or Note']]),
		dateInput = createWidget(['input','input-text|date-input',['type:text','autocomplete:off','id:checklistDate','required:','value:' + date],[]]),
		dateLabel = createWidget(['label','label-request',['for:checklistDate'],['Due Date (mm/dd/yy)']]),
		groupInput = createWidget(['input','input-text',['type:text','autocomplete:off','id:checklistGroup','required:'],[]]),
		groupLabel = createWidget(['label','label-request',['for:checklistGroup'],['Group']]),
		slider = createWidget(['input','checklist-slider',['type:range','id:checklistOptions_slider','min:0','max:200','value:100'],[]]),
		sliderLabel = createWidget(['label','slider-label',['for:checklistOptions_slider'],[['span','',[],['Importance: ']],['span','slider-importance',['id:slider_importance'],['Medium']]]]);
	checklist.currentItem = item;
	while (body.firstChild) body.removeChild(body.firstChild);
	addRipplesTo(del);
	slider.addEventListener("input", updateSlider);
	slider.value = item.getAttribute("priority") ? item.getAttribute("priority") : 100;
	dateInput.addEventListener("focus", openInputMenu);
	body.append(del, input, label, dateInput, dateLabel, sliderLabel, slider);
	slider.dispatchEvent(new Event('input'));
	submit.removeEventListener("click", submitRequest);
	submit.addEventListener("click", closeChecklistOptions);
	submit.textContent = "SAVE";
	document.getElementById("request_cancel").style.display = "none";
	document.getElementById("request_title").textContent = "Item Options:";
	menu.classList.add("menu-open");
}

function updateSlider(evt) {
	var label = document.getElementById("slider_importance");
	evt.target.style.background = "linear-gradient(to right, var(--color-accent) " + evt.target.value + "px, #d1d1d1 " + evt.target.value + "px)";
	if (evt.target.value == 0) {
		evt.target.classList.add("slider-none");
		label.textContent = "Low";
	}
	else if (evt.target.value >= 190) label.textContent = "High";
	else {
		evt.target.classList.remove("slider-none");
		label.textContent = "Medium";
	}
}

function closeChecklistOptions() {
	var menu = document.getElementById("request_info"), submit = document.getElementById("request_submit"),
		cancel = document.getElementById("request_cancel"), link = document.getElementById("checklistOptions_input").value.trim(),
		date = document.getElementById("checklistDate").value; //group = document.getElementById("checklistGroup").value.trim();
	removePin("checklist-file", "input-file");
	removePin("checklist-date", "input-date");
	// removeGroup();
	if (link.length > 0) addPin(link);
	if (date.length > 0) addDate(date);
	// if (group.length > 0) addGroup(group);
	setPriority(checklist.currentItem, parseInt(document.getElementById("checklistOptions_slider").value));
	menu.classList.remove("menu-open");
	submit.removeEventListener("click", closeChecklistOptions);
	cancel.style.display = "block";
	saveChecklistItem(undefined, checklist.currentItem);
	checklist.currentItem = undefined;
}

function setPriority(item, priority) {
	item.setAttribute("priority", priority);
	item.classList.remove("priority-low", "priority-high");
	item.children[0].classList.remove("check-priority-high");
	if (priority === 0) {
		item.classList.add("priority-low");
	} else if (priority >= 190) {
		item.classList.add("priority-high");
		item.children[0].classList.add("check-priority-high");
	}
}

function viewNote(event) {
	var menu = document.getElementById("request_info"), body = document.getElementById("request_body"),
		submit = document.getElementById("request_submit"), editor = document.createElement("textarea");
	while (body.firstChild) body.removeChild(body.firstChild);
	checklist.currentItem = event.target;
	submit.removeEventListener("click", submitRequest);
	submit.addEventListener("click", closeNote);
	submit.textContent = "SAVE";
	document.getElementById("request_cancel").style.display = "none";
	document.getElementById("request_title").textContent = "Edit Note";
	editor.classList.add("note-editor");
	editor.id = "note_editor";
	editor.value = event.target.getAttribute("note");
	body.appendChild(editor);
	menu.classList.add("menu-open");
}

function closeNote() {
	var val = document.getElementById("note_editor").value, itm = checklist.currentItem.parentNode;
	if (val.trim().length === 0) {
		checklist.currentItem.remove();
		itm.classList.remove("input-file");
	}
	else checklist.currentItem.setAttribute("note", val);
	saveChecklistItem(undefined, itm);
	document.getElementById("request_info").classList.remove("menu-open");
	document.getElementById("request_submit").removeEventListener("click", closeNote);
	document.getElementById("request_cancel").style.display = "block";
	checklist.currentItem = undefined;
}

function addDate(date) {
	var btn = document.createElement("div"), d;
	if (date.length < 6) date += "/" + new Date().getFullYear();
	d = new Date(date);
	btn.classList.add("checklist-date");
	btn.setAttribute("date", (+d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());
	d.setMonth(d.getMonth());
	btn.setAttribute("dueDate", d.getDate());
	btn.setAttribute("dueDay", d.toString().split(' ')[0]);
	addTooltip(btn, "Due Date");
	checklist.currentItem.classList.add("input-date");
	checklist.currentItem.appendChild(btn);
}

function addPin(url) {
	var file = document.createElement("a"), segments = url.split("."), extension = segments[segments.length - 1], firstSect = url.substring(0, 30);
	file.classList.add("checklist-file");
	if (url.substring(0, 4) === "http" || url.substring(0, 8) === "file:///") {
		file.href = url;
		file.rel = "noopener noreferrer";
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
}

function removeGroup() {
	if (checklist.currentItem.children[1].classList.contains('checklist-group')) checklist.currentItem.children[1].remove();
}

function addGroup(name) {
	let label = document.createElement('span');
	label.classList.add('checklist-group');
	label.appendChild(document.createTextNode(name));
	checklist.currentItem.insertBefore(label, checklist.currentItem.children[1]);
}

function removePin(elemClass, removeClass) {
	for (let i = 3; i < checklist.currentItem.childElementCount; i++) {
		var itm = checklist.currentItem.children[i];
		if (itm.classList.contains(elemClass)) {
			itm.remove();
			break;
		}
	}
	checklist.currentItem.classList.remove(removeClass);
}

function removeChecklistItem() {
	var body = document.getElementById("checklist_body"), id = getItemID("checklist_body", checklist.currentItem);
	document.getElementById("request_cancel").style.display = "block";
	document.getElementById("request_submit").removeEventListener("click", closeChecklistOptions);
	sendMessage("removeItem", id, snackbar("Removed Checklist Item"));
	document.getElementById("request_info").classList.remove("menu-open");
	if (checklist.currentItem.previousElementSibling) checklist.currentItem.previousElementSibling.children[1].focus();
	else if (!checklist.currentItem.previousElementSibling && checklist.currentItem.nextElementSibling) checklist.currentItem.nextElementSibling.children[1].focus();
	else body.appendChild(createWidget(['span','checklist-empty|empty-animate',[],[]]));
	checklist.currentItem.remove();
}

function saveChecklistItem(event, item) {
	var itm = item ? item : event.target.parentNode, id = getItemID("checklist_body", itm), href = "", priority = parseInt(itm.getAttribute("priority")), date = [], dateElem,
		 group = itm.children[1].classList.contains('checklist-group') ? [itm.children[1]] : [], val = group.length > 0 ? itm.children[2].value : itm.children[1].value;
	if (itm.children[3] && itm.children[3].href && (itm.children[3].href.substring(0, 4) === "http" || itm.children[3].href.substring(0, 8) === "file:///")) href = itm.children[3].href;
	else if (itm.children[3] && itm.children[3].getAttribute("note")) href = itm.children[3].getAttribute("note");
	dateElem = itm.children[4] ? itm.children[4] : itm.children[3];
	if (dateElem && dateElem.classList.contains("checklist-file")) dateElem = void 0;
	if (dateElem) date = dateElem.getAttribute("date").split("/");
	sendMessage("updateItem", id, [itm.firstElementChild.checked, val, priority, [href ? href : void 0], date, group]);
}

function addStoredChecklist() {
	var body = document.getElementById("checklist_body"), add = body.previousElementSibling, filter = add.previousElementSibling;
	for (let i = 0; i < checklist.items.length; i++) {
		var itm = addChecklistItem(body, true);
		itm.firstElementChild.checked = checklist.items[i][0];
		itm.children[1].value = checklist.items[i][1];
		checklist.currentItem = itm;
		setPriority(itm, checklist.items[i][2]);
		for (let j = 0; j < checklist.items[i][3].length; j++) addPin(checklist.items[i][3][j]);
		if (checklist.items[i][4].length > 0) addDate(checklist.items[i][4].join("/"));
	}

	addTooltip(add, "New Item");
	addRipplesTo(add);
	addTooltip(filter, "Sort List");
	addRipplesTo(filter);
	let tmp = document.createElement("input");
	document.body.appendChild(tmp).focus();
	document.body.removeChild(tmp);
	body.scrollTop = 0;
}

function getWeather() {
	const weatherKey = "e432b185d8122fbac552b5e33485824e";
	getVar('vars', 'Weather', cache => {
		var data = cache ? cache.split("?") : '', t = new Date().getTime();
		if (online && (!cache || t - parseInt(data[3]) > 1200000)) {
			var opt = {
	  			enableHighAccuracy: false,
	  			maximumAge: 30000,
	  			timeout: 27000
			};
			updateWeather = false;
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude, lon = position.coords.longitude;
				request("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + weatherKey, undefined, setWeather);
			}, undefined, opt);
		} else if (!online && (!cache || t - parseInt(data[3]) > 600000)) updateWeather = true;
		else setWeather();
	});
}

function setWeather(data) {
	let swatch = (rgb, parent) => {
		parent.style.backgroundColor = "rgb(" + rgb.join(",") + ")";
		if (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2]) < 650) parent.classList.add("weather-light");
		else parent.classList.remove("weather-light");
	}
	getVar('vars', 'Weather', store => {
		var cache = store ? store.split("?") : [0,0,0], temperature = cache[0], condition = cache[1], icon = cache[2],
			desc = document.getElementById("weather_desc"), img = document.getElementById("weather_icon");
		if (data) {
			temperature = Math.round((data.main.temp * 1.8) - 459.67);
			condition = data.weather[0].main;
			icon = data.weather[0].icon;
		}
		if (icon === "03n") icon = "03d";
		else if (icon === "04n") icon = "04d";
		document.getElementById("weather_temp").textContent = temperature + "\u00B0F";
		document.getElementById("weather_condition").textContent = condition;
		desc.style.display = "block";
		document.getElementById("weather_title").classList.add("weather-hidden");
		img.src = "res/weather/" + icon + ".png";
		img.classList.add("weather-loaded");
		switch (icon) {
			case "01d":case "02d":
				swatch([3,169,244], desc.parentNode);
				break;
			case "10n":case "02n":case "01n":case "13n":case "50n":
				swatch([105,105,120], desc.parentNode);
				break;
			case "03d":case "03n":case "04d":case "04n":case "11d":case "11n":
				swatch([145,145,170], desc.parentNode);
				break;
			case "09d":case "09n":
				swatch([90,90,255], desc.parentNode);
				break;
			case "50d":case "10d":
				swatch([245,245,245], desc.parentNode);
				break;
			case "13d":
				swatch([255,255,255], desc.parentNode);
		}
		setVar('vars', 'Weather', temperature + "?" + condition + "?" + icon + "?" + new Date().getTime());
	});
}
