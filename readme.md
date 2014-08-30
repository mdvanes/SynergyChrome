# Description

The VBS version of the webapplication Synergy (v3.9, for as far as I know) only works on IE 8 natively, or IE > 8 after manually modifying the compatibility settings.
This bookmarklet supplies some basic functionality in Chrome (tested) and probably Safari and Firefox too (untested).

Just start up Synergy and run the bookmarklet.


# Installation

1. I will assume you use Chrome (tested with 36) for all steps
1. make a bookmark of the bookmarklet -> see the project page on [http://mdvanes.github.io/SynergyChrome](http://mdvanes.github.io/SynergyChrome).
1. log into Synergy
1. go to Mijn realisaties > wekelijks. This will give a loading screen that doesn't disappear.
1. click the bookmark, changes should be visible immediately.


# Status

## What will work

* Some screens for PSA users (Limited rights users)
* submitting hours
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

* When clicking the bookmark outside Synergy, redirect to Synergy and then load the bookmarklet
* Delete and save buttons at the end of the hour rows
* Screens for Full Suite users
* enable keyboard shortcut: S (save hours)
* anything else...

