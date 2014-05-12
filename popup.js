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
		var ele = document.getElementById('output');
		ele.innerHTML = '';
	}
	var ele = document.getElementById('clearButton');
	ele.onclick = clear;
}