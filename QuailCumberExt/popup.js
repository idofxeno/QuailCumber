//I am the popup.js I get run when the browser extension icon is clicked

//get the step from the background and spit them out
document.getElementById('output').innerHTML = chrome.extension.getBackgroundPage().steps;

//onload attach functions to buttons in popup (inline js is not allowed so attach events here)
window.onload = function(){
	function clear(){
		console.log('js from clear');
		chrome.extension.sendRequest({method: "clearSteps", data:"data"}, function(result){
			document.getElementById('output').innerHTML = '';
		});
		var clr = document.getElementById('output');
		clr.innerHTML = '';
	}
	function startTracking(){
		console.log('js from startTracking');
		chrome.extension.sendRequest({method: "startTracking", data:"data"}, function(result){
			document.getElementById('status').innerHTML = '';
		});
		var start = document.getElementById('status');
		start.innerHTML = 'Tracking: ON';
		//handled in background.js
	}
	function stopTracking(){
		console.log('js from stopTracking');
		chrome.extension.sendRequest({method: "stopTracking", data:"data"}, function(result){
			document.getElementById('status').innerHTML = '';
		});
		var stop = document.getElementById('status');
		stop.innerHTML = 'Tracking: OFF';
		//handled in background.js
	}
	var clr = document.getElementById('clearButton');
	clr.onclick = clear;
	var start = document.getElementById('startButton');
    start.onclick = startTracking;
	var stop = document.getElementById('stopButton');
	stop.onclick = stopTracking;
}