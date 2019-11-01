		function clickOnInviteButtons(){
			$('.btn>span:contains("Invite to Job")').each(function(i,e){
				setTimeout(function(){
					$(e).click();
				},800);
			});
		} 

		function gotoNextPage(){
			$('a.next-btn-enabled')[0].click();
		}


	// ------------------ Chrome Run Time Listner --------------------------
	chrome.runtime.onMessage.addListener(function (fromPopup) {

		if (fromPopup.action == 'sendInvite') {		
			clickOnInviteButtons()
		}
		if (fromPopup.action == 'sendInviteForAllPages') {		
			clickOnInviteButtons();
			console.log(fromPopup.pageNumber);

			for(let i=1; i<=fromPopup.pageNumber; i++){
				let time = 12000*i; 
				setTimeout(function(){
					gotoNextPage();

					setTimeout(function(){
						clickOnInviteButtons();
					},2000);

				},time);
				console.log(time);
			}

		}

	});