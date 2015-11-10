// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('hits').textContent   = info.noHits;
}

window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ask for number of blocked ads 
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'HitsInfo'}, setDOMInfo);
  });
});