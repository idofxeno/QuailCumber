//I am the mighty contentscript, I am added to the end of every webpage in the brower as long as the plugin is enabled.
//I am used here to attach an event to any click that will record steps and send them to the background page where the popup can retrieve them.

function record(event){
	//How will selenium select the element, find out if the element we clicked on has a selector (checks for id, name or class)
	var elementSelector = '';
	if(event.target.id){
		elementSelector = 'id of "' + event.target.id + '"';
	}else if(event.target.getAttribute('name')){
		elementSelector = 'name of "' + event.target.getAttribute('name') + '"';
	}else if(event.target.getAttribute('class')){
		elementSelector = 'class of "' + event.target.getAttribute('class') + '"';
	}
	
	//If we have a valid selector, lets record a step!
	if(elementSelector.length > 0){
	
		console.log(event.target.type);
		switch(event.target.type) {
			//If the element we clicked on is an input, lets attach a onblur event to capture what was put into the field (attachs to password or text fields) TODO: Text Area
			case 'text':
			case 'password':
				event.target.onblur = function(event){
					if(event.target.value.length > 0){
						chrome.extension.sendRequest({method: 'recordStep', data: 'Then I enter "' + event.target.value + '" into field with ' + elementSelector});
					}
				}
				break;
			//If the elemnt is a select, lets figure that out (select-one)
			case 'select-one':
				event.target.onchange = function(event){
					if(true){//if(event.target.value.length > 0){
						chrome.extension.sendRequest({method: 'recordStep', data: 'Then I select "' + event.target.value + '" from select with ' + elementSelector})
					}
				}
				break;
			//If the elemnt is a checkbox, lets figure that out
			//If the elemnt is a select, lets figure that out
			//If it is some other type of element, lets just poke it and hope for the best!
			default:
				var clickAction = 'Then I click on element ' + elementSelector + ' ' + event.target.type
				chrome.extension.sendRequest({method: "recordStep", data: clickAction});
		}
	}
}

//Add that sweet NSA level tracking event! (just kidding NSA we <3 you)
document.addEventListener('click', record, true);