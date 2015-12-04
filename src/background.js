// Query for current tab
var query = {
    active: true,
    currentWindow: true
};

// Listener for showing pageAction
chrome.runtime.onMessage.addListener(function(msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        // Check if paused
        chrome.storage.sync.get('paused', function(item) {
            console.log('[BACKGROUND]: Paused is = ' + item.paused);
            if (item.paused === 'true') {
                chrome.tabs.query(query, callback);
            }
        });
        chrome.pageAction.show(sender.tab.id);
    }
    if ((msg.from === 'popup') && (msg.subject === 'pauseButtonPressedWhenFalse')) {
        // We should only set the storage here
        chrome.storage.sync.set({
            'paused': 'true'
        });
        // Change icon 
        chrome.tabs.query(query, callback);
    }
    if ((msg.from === 'popup') && (msg.subject === 'pauseButtonPressedWhenTrue')) {
        chrome.storage.sync.set({
            'paused': 'false'
        });
        chrome.tabs.query(query, callback);
    }
});

// Initialize the local storage by setting paused to false. 
chrome.runtime.onInstalled.addListener(function(reason) {
    chrome.storage.sync.set({
        'paused': 'false'
    });
    console.log("[BACKGROUND: INIT]: paused = false");
});

function callback(tabs) {
    chrome.storage.sync.get('paused', function(item) {

        // Update icon to reflect running/paused status
        var iconPath = (item.paused === 'true' ? 'images/blokkpluss-paused-38.png' : 'images/blokkpluss-38.png');
        chrome.pageAction.setIcon({
            tabId: tabs[0].id,
            path: iconPath
        });

    });
}