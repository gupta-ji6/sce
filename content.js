// Send Chrome Runtime Message
function sendRunTimeMessage(data){
	chrome.runtime.sendMessage(data);
}


// ------------------ Chrome Run Time Listner --------------------------
chrome.runtime.onMessage.addListener(function (response) {
	
	// Collect 
	if (response.action == 'collect') {		
		sendRunTimeMessage({
			action : 'toPopup',
			title: $('title').text(),
		})
	}

});
// ------------------ Chrome Run Time Listner --------------------------



// ---------------------- Extension Toolbar ---------------------
$(function(){

	let extensionToolbar = {};
	extensionToolbar.height = "50px";
	extensionToolbar.url = chrome.extension.getURL("views/extensionToolbar.html"); 

	// Shift Webpage Document
	$('body').css('-webkit-transform','translateY('+extensionToolbar.height+')');
	$('html').append(`
		<iframe src="${extensionToolbar.url}" id="simple-chrome-extension-toolbar" style="height:${extensionToolbar.height};"></iframe>
		`);

});
// ---------------------- Extension Toolbar ---------------------