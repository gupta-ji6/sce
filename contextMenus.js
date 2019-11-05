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
	// selection, image, link, page
	contexts : ['selection']
}

chrome.contextMenus.create(byeMenu);

chrome.contextMenus.onClicked.addListener(function(clickedData){
	
	if (clickedData.menuItemId=="byeMenu") {
		alert("By to "+clickedData.selectionText);
	}

});


//Create random contextMenu for all contextList
let contextList = ['selection','image','link','page'];

for(let i in contextList){
	let each = contextList[i];
	let menu = {
		id : "menu_id_"+each,
		title : "Menu on "+each,
		contexts : [each],
	}
	chrome.contextMenus.create(menu);
}
//Create random contextMenu for all contextList