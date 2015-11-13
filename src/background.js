var pathToRegularIcon = 'blokkpluss-38.png';
var pathToPausedIcon = 'blackandwhiteicon-38x38.png';
// query for current tab
var query = { active: true, currentWindow: true };
// Listener for showing pageAction
chrome.runtime.onMessage.addListener(function (msg, sender) {
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    //check if paused
    chrome.storage.sync.get('paused', function(item){
    	console.log('[BACKGROUND]: Paused is = ' + item.paused);
    	if(item.paused === 'true'){
    		chrome.tabs.query(query, callback);
    	} 
    });
    chrome.pageAction.show(sender.tab.id);
  }
  if ((msg.from === 'popup') && (msg.subject === 'pauseButtonPressedWhenFalse')) {
  	// we should only set the storage here
  	chrome.storage.sync.set({'paused':'true'});
  	//change icon 
    chrome.tabs.query(query, callback);
  }
  if ((msg.from === 'popup') && (msg.subject === 'pauseButtonPressedWhenTrue')) {
  	chrome.storage.sync.set({'paused':'false'});
  	chrome.tabs.query(query, callback);
  }
});

// initialize the local storage by setting paused to false. 
chrome.runtime.onInstalled.addListener(function(reason){
	chrome.storage.sync.set({'paused':'false'});
	console.log("[BACKGROUND: INIT]: paused = false");
});

// changes icon for the pageAction
// TODO make into one function, passing path into it. 
function callback(tabs) {
	chrome.storage.sync.get('paused', function(item){
		if (item.paused === 'true'){
			chrome.pageAction.setIcon({tabId: tabs[0].id, path:pathToPausedIcon});
		}else{
			chrome.pageAction.setIcon({tabId: tabs[0].id, path:pathToRegularIcon});	
		}
	});
}
