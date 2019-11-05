var ngApp = angular.module('app', []);

ngApp.controller('myController', function ($scope,$http) {

		// Basic
		$scope.activeTab = 'home';
		$scope.short_name = "sce";
		$scope.developer = {};

		// Update from manifest.json
		let manifestURL = chrome.extension.getURL('manifest.json');
		$http.get(manifestURL)
		.then(function(response) {
			console.log(response);
			response = response.data
			$scope.name = response.name
			$scope.fullName = response.name
			$scope.description = response.description
			$scope.version = response.version
			$scope.favicon = response.browser_action.default_icon

			//Developer
			$scope.developer.name = response.developer.name;
			$scope.developer.github = response.developer.github;
			$scope.developer.upwork = response.developer.upwork;
			$scope.developer.linkedin = response.developer.linkedin;
			$scope.developer.website = response.developer.website;
			$scope.developer.facebook = response.developer.facebook;
			$scope.developer.mail = response.developer.mail;
		});


		//Bookmarks
		$scope.websiteTitle = " Website Title";

		// Get Data from Chrome Local Storage
		chrome.storage.local.get('uhh_',function(fromChromeStorage){
			fromChromeStorage = fromChromeStorage.uhh_;
			$scope.activeTab = fromChromeStorage? fromChromeStorage.activeTab: 'home';
			console.log(fromChromeStorage);
		});

		// Send Runtime Chrome Messages
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
			console.log("Saving data to Chrome Local Storage");
			console.log(data);
			chrome.storage.local.set({
				'uhh_': data
			});
		};

		//Save Current Settings
		$scope.saveSettings = function (activeTab) {
			this.activeTab = activeTab ? activeTab : this.activeTab;
			let data = {
				activeTab: this.activeTab,
			}
			console.log("Saving Settings");
			console.log(data);
			this.saveToChromeLocalStorage(data);
		};

		// Send Notification
		$scope.sendNotification = function(title="Hello there!",message="How are you doing?",type="basic",iconUrl="/res/images/logo.png"){
			let  notificationOptions = {
				type: type,
				iconUrl : iconUrl,
				title : title,
				message: message
			}
			chrome.notifications.create('notificationId',notificationOptions);
		},

		//Add Badge
		$scope.addBadge = function(data){
			chrome.browserAction.setBadgeText({
				text :data
			});
		}

		// Collect 
		$scope.collect = function(data){
			this.sendChromeMessage({
				action:'collect'
			});
		}

		// ------------------ Chrome Run Time Listner --------------------------
		chrome.runtime.onMessage.addListener(function (response) {
			
			// Website Title 
			if (response.action == 'toPopup') {		
				$scope.websiteTitle = response.title
				$scope.sendNotification(response.title);
				$scope.addBadge(response.title);
			}

		});
		// ------------------ Chrome Run Time Listner --------------------------


	});