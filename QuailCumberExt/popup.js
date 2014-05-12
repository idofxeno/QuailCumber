//I am the popup.js I get run when the browser extension icon is clicked

//get the step from the background and spit them out
document.getElementById('output').innerHTML = chrome.extension.getBackgroundPage().steps;

if(chrome.extension.getBackgroundPage().paused){
	document.getElementById('recordButtton').className = 'record';
}else{
	document.getElementById('recordButtton').className = 'recording';
}

//onload attach functions to buttons in popup (inline js is not allowed so attach events here)
window.onload = function(){
	function clear(){
		console.log('pu.clear');
		chrome.extension.sendRequest({method: "clearSteps", data:"data"}, function(result){
			document.getElementById('output').innerHTML = '';
		});
		var clr = document.getElementById('output');
		clr.innerHTML = '';
	}
	function record(){
		console.log('pu.record');
		
		if(chrome.extension.getBackgroundPage().paused){
			document.getElementById('recordButtton').className = 'recording';
		}else{
			document.getElementById('recordButtton').className = 'record';
		}
		
		chrome.extension.sendRequest({method: "record", data:""}, function(result){
			//var stop = document.getElementById('status');
			//stop.innerHTML = 'button pressed';
		});
	}
	
	document.getElementById('recordButtton').onclick = record;	
	document.getElementById('clearButton').onclick = clear;
}