# STATUS

## What will work

* previous button
* next button
* search for hour code (the infamous F2)
* automatic loading of this script after a load

## What doesn't work (yet)

* saving or submitting hours
* when clicking on "Uur/Artikel", auto append PRUUR (and remove Uncaught ReferenceError: SelectItemCodeHour_keydown is not defined )
* some way to retrieve debugging info: type in console: synergyChrome.info; (Rename synergyChromeBookmarklet namespace to synergyChrome)
* improve the jquery detection: it is now possible to have jquery injected several times. Before injecting, test if it already exists (in addJquery)
* on entering number: BacoValidateNumber is not defined 
* anything else...

# HOWTO

* log into synergy with Chrome (tested with 36)
* go to Mijn realisaties > wekelijks
* open debug console
* leave focus on <top frame> (this is the default)
* copy-paste the content of synergyChromeBookmarklet.js into the debug console and press enter
* repeat after each page load

* make a new bookmark in Chrome (e.g. to Google), edit and replace the url by the content of synergyChromeBookmarklet.min.js