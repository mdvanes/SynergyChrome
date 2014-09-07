// request leave/verlof aanvragen

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
                //alert(type);
                // set window.location to Eprequest.asp
                // /Synergy/docs/Eprequest.asp?RepName=EPrequest&Type=10&EmployeeID=164&StartDate=01-01-2014%2009:00&EndDate=31-12-2014%2017:00
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
    };

    // var initSaveButton = function() {
    //     $('#btnSave', fr)
    //         .removeAttr('onmousedown')
    //         .removeAttr('onmouseout')
    //         .removeAttr('onmouseover')
    //         .css({
    //             'border': 'none',
    //             'border-radius': '2px',
    //             'cursor': 'pointer',
    //             'padding': '5px'
    //         });
    // };

    var initButtons = function() {
        console.info('but0', $('#btnSave', fr));
        var $saveBtn = $('#Baco > #btnSave', fr);
        var $editBtn = $('#Baco > button[accesskey=E]', fr);
        var $conceptBtn = $('#Baco > button[accesskey=1]', fr);
        var buttons = [$saveBtn, $editBtn, $conceptBtn];
        $(buttons).each(function() {
            $(this)
                .removeAttr('onmousedown')
                .removeAttr('onmouseout')
                .removeAttr('onmouseover')
                .attr('disabled', 'disabled') // TODO remove
                .css({
                    'border': 'none',
                    'border-radius': '2px',
                    'cursor': 'pointer',
                    'padding': '5px'
                });
        });
        // $([$editBtn, $conceptBtn]).each(function() {
        //     $(this).attr('disabled', 'disabled');
        // });
    };

    // TODO implement and test save button
    // TODO implement calculate button

    function init() {
        fr = subframe.document;
        if(subframe.location.pathname === '/Synergy/docs/EPPersonalPlanning.asp') {
            // Personal Planning page
            initNewLeaveButton();
        } else if(subframe.location.pathname === '/Synergy/docs/Eprequest.asp') {
            // Request Leave page
            initDatepickers();
            initButtons();
        }
    }

    init();
};