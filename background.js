console.log('Backgronud Script');

chrome.runtime.onMessage.addListener(receiver);
var makingGlobal = {};

function receiver(request){
	console.log("message received @ background.js");
	console.log(request);
	makingGlobal = request;
}