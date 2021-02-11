var currentTab;

chrome.tabs.onActivated.addListener((info) => {
	currentTab = info.tabId;
	
	chrome.tabs.get(currentTab, (tab) => {
		if(tab.url.includes('homestuck')) {
			chrome.browserAction.setIcon({
				path: "../assets/Sburb_Logo.png"
			});
		}
	
		else {
			chrome.browserAction.setIcon({
				path: "../assets/Sburb_Logo_Off.png"
			});
		}
	});
});

chrome.tabs.onUpdated.addListener((tabId) => {
	chrome.tabs.get(tabId, (tab) => {
		if(tab.url.includes('homestuck')) {
			//setstyle
			//document.getElementsByClassName('mar-x-auto disp-bl bg-hs-gray pad-t-lg')[0].style.backgroundColor = "black";
			
			if(tabId == currentTab) {
				chrome.browserAction.setIcon({
					path: "../assets/Sburb_Logo.png"
				});
				
			}
		}
	});
});
