//I am the background.js, I am running as long as a chrome window is open regardless of tabs or windows, I will live until all chrome browsers are closed

//global vars
var steps = "";
var paused = 0;

//listeners so I can respond to request from individual browsers/tabs
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  console.log('request recieved:' + request.method);
  if (request.method === "recordStep" && paused === 0) {
	console.log(request.data);
	steps += '\r\n' + request.data;
  }
  if (request.method === "clearSteps") {
	steps = '';
	console.log('steps: ' + steps);
  }
  if (request.method === "startTracking"){
  	paused = 0;
  }
  if (request.method === "stopTracking"){
  	paused = 1;
  }
});