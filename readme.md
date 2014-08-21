# STATUS

## What will work

* previous button
* next button

## NYI

* search for hour code (the infamous F2)
* saving or submitting hours

# HOWTO

* log into synergy with Chrome (tested with 36)
* go to Mijn realisaties > wekelijks
* open debug console
* switch context to em_main(CSPSAHours.asp)
* run:

```javascript
var newScriptTag = document.createElement('script');
newScriptTag.setAttribute('src', 'https://code.jquery.com/jquery-2.1.1.min.js');
document.body.appendChild(newScriptTag);

// Wait until js loaded
setTimeout(function() {
    // Test jquery version
    // jQuery.fn.jquery;

    $('#wait').css('opacity','0.7');

    $('#btnStartDatePrev').click(function() {
        var startDatePrevious = $('#StartDatePrev').val();
        $('#StartDate').val(startDatePrevious);
    });

    $('#btnStartDateNext').click(function() {
        var startDateNext = $('#StartDateNext').val();
        $('#StartDate').val(startDateNext);
    });

    setTimeout(function() {
        $('#wait').hide();
    }, 200);
}, 500);
```


When clicking previous week
in IE: gResID=164&StartDatePrev=11-08-2014&StartDate=11-08-2014&StartDateNext=25-08-2014&HourDelete=&FinDelete=&ProjectNumberHour=&NewHourPrDesc=&ItemCodeHour=&NewHourItemDesc=&ItemCountHour=&ItemCountHour=&ItemCountHour=&ItemCountHour=&ItemCountHour=&ItemCountHour=&ItemCountHour=&button1=&ProjectNumberFin=&NewFinPrDesc=&ItemCodeFin=&NewFinItemDesc=&ItemCountFin=&ItemCountFin=&ItemCountFin=&ItemCountFin=&ItemCountFin=&ItemCountFin=&ItemCountFin=&button1=&EnteredHours=0%2C00&PlannedHours=0%2C00&RoosterHours=40%2C00

In Chrome:
gResID:164
StartDatePrev:11-08-2014
StartDate:18-08-2014
StartDateNext:25-08-2014
HourDelete:
FinDelete:
ProjectNumberHour:
NewHourPrDesc:
ItemCodeHour:
NewHourItemDesc:
ItemCountHour:
ItemCountHour:
ItemCountHour:
ItemCountHour:
ItemCountHour:
ItemCountHour:
ItemCountHour:
ProjectNumberFin:
NewFinPrDesc:
ItemCodeFin:
NewFinItemDesc:
ItemCountFin:
ItemCountFin:
ItemCountFin:
ItemCountFin:
ItemCountFin:
ItemCountFin:
ItemCountFin:
EnteredHours:0,00
PlannedHours:0,00
RoosterHours:40,00

So need to bind setting "StartDate" to 1 week earlier when clicking previous button

$('#btnStartDatePrev').click(function() {
    var startDatePrevious = $('#StartDatePrev').val();
    $('#StartDate').val(startDatePrevious);
});