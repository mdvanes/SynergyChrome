// Request vacation days

var synergyChrome = synergyChrome || (synergyChrome = {});

synergyChrome.requestLeave = function($, subframe) {
    'use strict';

    var fr;

    var initNewLeaveButton = function() {
        $('#ReqButton', fr)
            .removeAttr('onmousedown')
            .removeAttr('onmouseout')
            .removeAttr('onmouseover')
            .css({
                'border': 'none',
                'border-radius': '2px',
                'cursor': 'pointer',
                'padding': '5px'
            })
            .click(function() {
                var startDate = $('#StartDate', fr).val();
                var endDate = $('#EndDate', fr).val();
                var id = $('#EmployeeID', fr).val();
                var reqType = $('#ReqType', fr).val().split('|');
                var type;
                if(reqType.length > 0) {
                    type = reqType[0];
                }
                var url = 'Eprequest.asp?RepName=EPrequest&Type=' + type +
                    '&EmployeeID=' + id +
                    '&StartDate=' + startDate + '%2009:00' +
                    '&EndDate=' + endDate + '%2017:00';
                subframe.location = url;
                return false;
            });
    };

    var initDatepickers = function() {
        $('button.Calendar', fr)
            .removeAttr('onclick')
            .click(function() {
                alert('Not yet implemented: type the date in the textfield as a workaround');
                return false;
            });
        $('input[name=StartDate], input[name=EndDate]', fr)
            .removeAttr('onkeydown')
            .removeAttr('onkeypress');
    };

    // TODO implement calculate button
    var initCalculator = function() {
        // TODO confirmed problem: what happens when entering a description and clicking the calculator? Is it then submitted? That should not happen. In that case, set to NYI
        $('.Field > button.Calculate', fr)
            .removeAttr('onclick')
            .click(function() {
                alert('Not yet implemented');
                return false;
            });
    };

    var initButtons = function() {
        var $saveBtn = $('#Baco > #btnSave', fr);
        var $editBtn = $('#Baco > button[accesskey=E]', fr);
        var $conceptBtn = $('#Baco > button[accesskey=1]', fr);
        var buttons = [$saveBtn, $editBtn, $conceptBtn];
        $(buttons).each(function() {
            $(this)
                .removeAttr('onmousedown')
                .removeAttr('onmouseout')
                .removeAttr('onmouseover')
                .removeAttr('onclick')
                .removeAttr('language')
                .css({
                    'border': 'none',
                    'border-radius': '2px',
                    'cursor': 'pointer',
                    'padding': '5px'
                });
        });
        $([$editBtn, $conceptBtn]).each(function() {
            $(this).attr('disabled', 'disabled');
        });
        // TODO test Save button
        $saveBtn.click(function() {
            $('form#Baco', fr).attr('action', 'Eprequest.asp?Action=2');
        });
    };

    var initDescription = function() {
        $('#Description', fr).removeAttr('onchange');
    };

    function init() {
        fr = subframe.document;
        if(subframe.location.pathname === '/Synergy/docs/EPPersonalPlanning.asp') {
            // Personal Planning page
            initNewLeaveButton();
        } else if(subframe.location.pathname === '/Synergy/docs/Eprequest.asp') {
            // Request Leave page
            initDatepickers();
            initCalculator();
            initButtons();
            initDescription();
        }
    }

    init();
};