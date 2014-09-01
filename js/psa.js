/* jshint camelcase:false */

var synergyChrome = synergyChrome || (synergyChrome = {});

// Modify PSA screens
synergyChrome.bookmarkletInit = function($, subframe, topframe) {
    'use strict';
    (function($) {
        var fr = null;

        function setActionCode(code) {
            // Replace last character "0" by "code"
            var oldAction = $('form#Baco', fr).attr('action');
            var newAction = oldAction.substring(0, oldAction.length - 1) + code;

            // Update form action
            $('form#Baco', fr).attr('action', newAction);
        }

        function bindButtons() {
            // Save button
            $('#btnSave', fr).click(function() {
                // Set form action code to 1
                setActionCode('1');

                // Add button1=
                $('#ProjectNumberFin', fr).before('<input name="button1"/>');
            });

            // Save button at the end of the row
            $('#ProjectNumberHour', fr).closest('tr').find('#button1').each(function() {
                var $this = $(this);
                $this
                    .css('cursor', 'pointer')
                    .removeAttr('onclick')
                    .removeAttr('language')
                    .click(function() {
                        // Set form action code to 1
                        setActionCode('1');

                        // Add button1=
                        $('#ProjectNumberFin', fr).before('<input name="button1"/>');
                    });
            });

            // by name, because ids are not unique in the HTML
            $('input[name=ProjectNumberHourExists]', fr).closest('tr').each(function(index) {
                var rowIndex = index + 1;
                var project = $('#ProjectNumberHourExists', this).val();
                var item = $('#ItemCodeHourExists', this).val();

                // Delete buttons at the end of the row
                var $deleteButton = $('.RowNumber button:first-child', this);
                $deleteButton.each(function() {
                    $(this)
                        .css('cursor', 'pointer')
                        .removeAttr('onclick')
                        .removeAttr('language')
                        .click(function(e) {
                            var canDelete = confirm('Do you want to delete row ' + rowIndex + '?');
                            if(canDelete) {
                                // Set form action code to 5
                                setActionCode('5');

                                // Set HourDelete to the index of this row
                                $('#HourDelete', fr).val(rowIndex);
                            } else {
                                e.preventDefault();
                                return false;
                            }
                        });
                });

                // Edit buttons at the end of the row
                var $editButton = $('.RowNumber button:last-of-type', this);
                $editButton.each(function() {
                    $(this)
                        .css('cursor', 'pointer')
                        .removeAttr('onclick')
                        .removeAttr('language')
                        .click(function() {
                            var resId = $('#gResID', fr).val();
                            var startDate = $('#StartDate', fr).val();
                            var newAction = 'CSPSAMHourDesc.asp?Action=1&resid=' + resId +
                                '&project=' + project +
                                '&item=' + item +
                                '&status=0' +
                                '&date=' + startDate +
                                '&reqtype=800';
                            $('form#Baco', fr).attr('action', newAction);
                        });
                });
            });

            // Submit button
            $('#btnInDien', fr).click(function() {
                // Set form action code to 1
                setActionCode('2');

                // Add button1=
                $('#ProjectNumberFin', fr).before('<input name="button1"/>');
            });

            // Previous Week button
            $('#btnStartDatePrev', fr).click(function() {
                var startDatePrevious = $('#StartDatePrev', fr).val();
                $('#StartDate', fr).val(startDatePrevious);
            });

            // Next Week button
            $('#btnStartDateNext', fr).click(function() {
                var startDateNext = $('#StartDateNext', fr).val();
                $('#StartDate', fr).val(startDateNext);
            });

            // Restyle buttons
            $('#Baco > .BtnBar > button', fr)
                .css({
                    'border': 'none',
                    'border-radius': '2px',
                    'cursor': 'pointer',
                    'padding': '10px'
                });
            $('#btnStartDatePrev, #btnStartDateNext', fr)
                .css({
                    'border': 'none',
                    'border-radius': '2px',
                    'cursor': 'pointer',
                    'padding': '5px'
                });
        }

        function bindSearch() {
            $('#ProjectNumberHour', fr)
                .removeAttr('onkeydown')
                .keydown(function(ev) {
                    ev.stopPropagation();
                    var $input = $(this);
                    var url = extractUrl($input.next('script'));
                    // keyCode 113 = F2
                    if(ev.keyCode === 113) {
                        openSearchWindow(url, $input);
                    }
                });
        }

        function removeValidateNumber() {
            $('input[name="ItemCountHour"]', fr)
                .removeAttr('onkeypress');
        }

        // Automatically prefill ItemCodeHour with PRUUR on focus
        function bindItemCode() {
            $('#ItemCodeHour', fr)
                .removeAttr('onkeydown')
                .focus(function() {
                    $(this).val('PRUUR');
                });
        }

        function restyleMainTable() {
            $('.Grid', fr)
                .css({
                    'border-collapse': 'collapse',
                    'margin-right': '7px'
                })
                .removeAttr('width');
            $('.Grid', fr).find('colgroup > col').removeAttr('width');
            $('.Grid', fr).find('td > input.ReadOnly').closest('td').css('background-color', '#e7e7e7');
        }

        function restyleHeader() {
            var frameset = parent.document.getElementsByTagName('frameset')[0];
            // Prevent running multiple times
            if(frameset.rows !== '25,*') {
                $('.Sidebar', topframe.document)
                    .css({
                        'background': '#ba0064',
                        'color': '#fff',
                        'font-size': '17px',
                        'height': '100%'
                    })
                    .append('<b>SynergyChrome v [[VERSION]]</b>');
                frameset.rows='25,*';
            }
        }

        function extractUrl($elem) {
            var str = $elem.text();
            var regexp = /window\.showModalDialog\("(.*)",/g;
            var match, url;
             
            while ((match = regexp.exec(str)) !== null) {
                url = match[1];
                if (match.index === regexp.lastIndex) {
                    regexp.lastIndex++;
                }
            }

            //var encodedUrl = encodeURI(url);
            url = url.replace(/BacoBrowser/g, 'BacoBrowserSearch');
            url = url.replace(/\s/g, '%20');
            //console.info('e url:', url);
            return url;
        }

        function openSearchWindow(url, $input) {
            var searchModal = window.open(url, 'searchModal', 'height=520,width=830'); //,x=50,y=0,location=0');

            var windowLoadedInterval = setInterval(function() {
                if($('#BrowseTable', searchModal.document).length > 0) {
                    // Stop checking if window is loaded
                    window.clearInterval(windowLoadedInterval);
                    // Set bindings on window content
                    var cx = searchModal.document; // context

                    // Hide NYI elements
                    $('div.BtnBar', cx).hide();
                    $('table.Search', cx).hide();
                    $('div#wait', cx).hide();

                    // Bind behavior to table rows
                    $('#BrowseTable tr', cx)
                        .mouseover(function() {
                            $(this)
                                .data('old-background', $(this).css('background') )
                                .css('background', '#ccc');
                        })
                        .mouseout(function() {
                            $(this).css('background', $(this).data('old-background'));
                        })
                        .click(function() {
                            var hourCode = $(this).find('td:first-child > a').text();

                            // Set the hourCode in the field that opened the searchWindow
                            $input.val(hourCode);

                            // Close the window
                            searchModal.close();
                        });
                }
            }, 100);
        }

        function init() {
            // Test jquery version
            // jQuery.fn.jquery;

            $('#wait', fr).css('opacity','0.7');

            bindButtons();
            bindSearch();
            bindItemCode();
            removeValidateNumber();
            restyleMainTable();
            restyleHeader();

            setTimeout(function() {
                $('#wait', fr).hide();
            }, 200);
        }

        $(document).ready(function() {
            fr = subframe.document;
            init();
        });

    })($, subframe);
};
