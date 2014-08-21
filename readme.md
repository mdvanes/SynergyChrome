# STATUS

## What will work

* previous button
* next button
* search for hour code (the infamous F2)

## What doesn't work (yet)

* automatic loading of this script after a load (bind to topframe and watch change of subframe? even polling could work)
* saving or submitting hours
* when clicking on "Uur/Artikel", auto append PRUUR
* anything else...

# HOWTO

* log into synergy with Chrome (tested with 36)
* go to Mijn realisaties > wekelijks
* open debug console
* leave focus on <top frame> (this is the default)
* copy-paste the content of synergyChromeBookmarklet.js into the debug console and press enter
* repeat after each page load

* make a new bookmark in Chrome (e.g. to Google), edit and replace the url by the content of synergyChromeBookmarklet.min.js