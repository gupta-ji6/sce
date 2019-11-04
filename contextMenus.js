var helloMenu = {
	id : "helloMenu",
	title : "Say Hello",
	contexts : ['selection']
}

chrome.contextMenus.create(helloMenu);

chrome.contextMenus.onClicked.addListener(function(clickedData){
	
	if (clickedData.menuItemId=="helloMenu") {
		alert("By to "+clickedData.selectionText);
	}

});

var byeMenu = {
	id : "byeMenu",
	title : "Say Bye",
	contexts : ['selection']
}

chrome.contextMenus.create(byeMenu);

chrome.contextMenus.onClicked.addListener(function(clickedData){
	
	if (clickedData.menuItemId=="byeMenu") {
		alert("By to "+clickedData.selectionText);
	}

});