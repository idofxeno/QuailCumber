//I am the background.js, I am running as long as a chrome window is open regardless of tabs or windows, I will live until all chrome browsers are closed

//global vars
var steps = "";
var paused = true;

//listeners so I can respond to request from individual browsers/tabs
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

	//console.log(request.method);
	switch(request.method) {
		case 'recordStep':
			if(!paused){
				console.log('bg.recordstep');
				steps += '\r\n' + request.data;
			}
			break;
		case 'clearSteps':
			console.log('bg.clearSteps');
			steps = '';
			break;
		case 'record':
			console.log('bg.record');
			if(paused){
				paused=false;
				console.log('bg.record : recording started');
			}else{
				paused=true;
				console.log('bg.record : recording stopped');
			}
			break;
		default:
			console.log('bg.unkown');
	}
});