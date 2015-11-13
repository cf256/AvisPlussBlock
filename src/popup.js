// Update the relevant fields with the new data
function setDOMInfo(info) {
	document.getElementById('hits').textContent	 = info.noHits;
}

// The dom needs to be loaded
window.addEventListener('DOMContentLoaded', function () {
	var pauseButton = document.getElementById("pause");
	// if it is paused, we need to display a different button
	chrome.storage.sync.get('paused', function(item){
		console.log('[POPUP]: Paused is = ' + item.paused);
		if (item.paused === 'true') {
			pauseButton.textContent = 'Start PlussBlokk igjen';
		}
	});
	// ...query for the active tab...
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		// ask for number of blocked ads 
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from: 'popup', subject: 'HitsInfo'}, setDOMInfo);
	});
	// Press pause button
	pauseButton.addEventListener("click", function () {
		// Check paused variable and send message to background
		chrome.storage.sync.get('paused', function(item){
      console.log("[POPUP: onClick]: paused = " + item.paused);
			if(item.paused === 'true'){
        chrome.runtime.sendMessage({
          from:'popup',
          subject: 'pauseButtonPressedWhenTrue'
        });
			}else {
        chrome.runtime.sendMessage({
        from:   'popup',
        subject: 'pauseButtonPressedWhenFalse'
        });
      }
		});
		// chrome.storage.sync.set({'paused':'true'});	
	});
});
