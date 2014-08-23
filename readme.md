# Description

The VBS version of the webapplication Synergy only works on IE 8 natively, or IE > 8 with manually modifying the compatibility settings.
This bookmarklet supplies some basic functionality in Chrome (tested) and probably Safari and Firefox too (untested).

Just startup Synergy and run the bookmarklet.


# Installation

* log into synergy with Chrome (tested with 36)
* go to Mijn realisaties > wekelijks
* open debug console
* leave focus on <top frame> (this is the default)
* copy-paste the content of synergyChromeBookmarklet.js into the debug console and press enter
* repeat after each page load
* make a new bookmark in Chrome (e.g. to Google), edit and replace the url by the content of synergyChromeBookmarklet.min.js


# Status

## What will work

* submitting hours (untested)
* saving hours
* previous button
* next button
* search for hour code (the infamous F2)
* in search window: entire row clickable
* table on main window narrower
* provide debug info by typing in console: synergyChrome.info
* when focussing on "Uur/Artikel", prefill PRUUR
* automatic loading of this script after a load

## What doesn't work (yet)

* test submitting hours
* improve the jquery detection: it is now possible to have jquery injected several times. Before injecting, test if it already exists (in addJquery)
* enable keyboard shortcut: S (save hours)
* before running, detect if synergy is open
* anything else...

