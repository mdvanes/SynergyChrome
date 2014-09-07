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
* Submitting hours
* Saving hours
* Previous button
* Next button
* Delete, edit and save buttons at the end of the hour rows
* Search for hour code (the infamous F2)
* In search window: entire row clickable
* Table on main window narrower
* Provide debug info by typing in console: synergyChrome.info
* When focussing on "Uur/Artikel", prefill PRUUR
* Automatic loading of this script after a load

## What doesn't work (yet)

* Enable keyboard shortcut: S (save hours)
* Add vacation
* Screens for Full Suite users
* Anything else...


* add vacation: datepickers
* log worked hours: datepicker
