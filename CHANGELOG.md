# Change Log
All notable changes to this project will be documented in this file. 

## [Unreleased]
- Ability to remove specific sites from the blocking list
- More sites as needed - swedish even?
- Make popup go away after a few seconds
- i18n

## [0.7] - 2018-15-01
### Changes
* Fixed https://github.com/cf256/AvisPlussBlock/issues/13

### Changed
* Fixed issues with the dfskinpaywall family of sites
* Remove protocol from array of sites to block
* move nordlys.no to correct array of sites.

## [0.6] - 2017-08-09
### Changed
* Fixed issues with the dfskinpaywall family of sites
* Remove protocol from array of sites to block
* move nordlys.no to correct array of sites.

## [0.5] - 2015-13-11
### Added
- tek.no
- dinside.no
- Now removes native adverts from dinside and DB.
- Removes 'For abonnementer' section on BT.no
- You can now pause the extension.

### Changed
- bugfix on dn.no/d2

## [0.4] - 2015-10-11
### Changed 
- The extension is now a pageAction rather than a browserAction. This means the icon only displays on sites that are being blocked. 
- Removed permissions which caused extension to need the browsing history permission. 
- Fixed insertion of items in to newspaper arrays. By: github user peterjohansen.
- Moved all the website checks in to separate methods. 

### Added
- See how many articles are being blocked in a new popup.
- background.js to enable the popup window.
