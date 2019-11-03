var ngApp = angular.module('app', []);

ngApp.controller('myController', function ($scope) {

		// Basic
		$scope.activeTab = 'home';
		$scope.version = 1.0;
		$scope.fullName = "Simple Chrome Extension"
		$scope.name = "Simple Chrome Extension"
		$scope.short_name = "sce";

		// Developer Info
		$scope.developer = {};
		$scope.developer.name = "Ritesh Phogat";
		$scope.developer.github = "https://github.com/ritesh221b";
		$scope.developer.upwork = "https://www.upwork.com/fl/ritesh221b";
		$scope.developer.linkedin = "https://www.linkedin.com/in/ritesh-phogat/";
		$scope.developer.website = "https://foxoyo.com/";
		$scope.developer.facebook = "https://www.facebook.com/foxoyo.phogat.7";
		$scope.developer.mail = "riteshphogat11@gmail.com";

		//Bookmarks
		$scope.bookmarkTitle = "";
		$scope.bookmarkUrl = "";
		$scope.bookmarkList = [];

		// Get Data from Chrome Local Storage
		chrome.storage.local.get('uhh_',function(fromChromeStorage){
			fromChromeStorage = fromChromeStorage.uhh_;
			$scope.bookmarkList = fromChromeStorage? fromChromeStorage.bookmarkList: [];
			$scope.activeTab = fromChromeStorage? fromChromeStorage.activeTab: 'home';
			console.log(fromChromeStorage);
		});

		$scope.sendChromeMessage = function (data) {
			chrome.tabs.query({
				currentWindow: true,
				active: true
			}, function (tabs) {
				console.log('Sending Chrome Message');
				console.log(data);
				chrome.tabs.sendMessage(tabs[0].id, data)
			});
		};

		// Chrome Local Storage
		$scope.saveToChromeLocalStorage = function(data){
			console.log(data);
			chrome.storage.local.set({
				'uhh_': data
			}, function () {
				console.log('Settings updated to chrome storage');
			});
		};

		//Save Current Settings
		$scope.saveSettings = function (activeTab) {
			this.activeTab = activeTab ? activeTab : this.activeTab;
			let data = {
				activeTab: this.activeTab,
			}
			console.log(data);
			this.saveToChromeLocalStorage(data);
		};

		$scope.sayHey = function(){
			let  notificationOptions = {
				type: "basic",
				iconUrl : "/res/images/logo.png",
				title : "Hello there!",
				message: "How are you doing?"
			}
			chrome.notifications.create('notificationId',notificationOptions);
		}

	});

