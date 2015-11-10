# Change Log
All notable changes to this project will be documented in this file. 

## [Unreleased]
- Ability to remove specific sites from the blocking list
- Ability to stop running once on current site
- More sites

## [0.4] - 2015-10-11
### Changed 
- The extension is now a pageAction rather than a browserAction. This means the icon only displays on sites that are being blocked. 
- Removed permissions which caused extension to need the browsing history permission. 
- Fixed insertion of items in to newspaper arrays. By: github user peterjohansen.
- Moved all the website checks in to separate methods. 

### Added
- See how many articles are being blocked in a new popup.
- background.js to enable the popup window.
