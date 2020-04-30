// Configurable settings.
// TODO: Map to Drupal variables.
var transcribr_site_transcribe_form_debug = 0; // 0 = no debug; 1 = console.log; 2 = alert (use with caution as this can be annoying!)
var transcribr_site_transcribe_form_syncTimeoutPeriod = 600000; // time in milliseconds 15 minutes

// Timer for monitoring key presses, used to extend asset locks for active sessions
var transcribr_site_transcribe_form_keypressTimer,
    transcribr_site_transcribe_form_keypressTimerRunning = false;

// Timer for last lock request
var transcribr_site_transcribe_form_lockTimer,
    transcribr_site_transcribe_form_lockTimerPeriod = 10000,
    transcribr_site_transcribe_form_lockTimerRunning = false;

// Timer for monitoring lockout and auto-save/submit
var transcribr_site_transcribe_form_lockoutTimer,
    transcribr_site_transcribe_form_lockoutTimerRunning = false;

// Timer for monitoring last sync to the service
var transcribr_site_transcribe_form_syncTimer,
    transcribr_site_transcribe_form_syncTimerRunning = false;

var transcribr_site_transcribe_form_activeElement; // Used to track the DOM object being locked
var transcribr_site_transcribe_form_assetIsLocked = false; // Simple flag noting the asset's lock status

(function ($) {
  if (!window.console) console = { log: function(str){} };

  Drupal.behaviors.transcribrSiteSTRIAbbreviations = {
    attach: function (context) {
      var abbrField,
          nameField;

      abbrField = $('#edit-transcriptdata-tl10-herbarium-abbreviation', context);
      nameField = $('#edit-transcriptdata-tl10-herbarium-name', context);

      // TODO: Probably want this to run even without name
      if (!(abbrField.length && nameField.length)) {
        return;
      }

      abbrField.once('transcribrSiteSTRIAbbreviations', function() {
        abbrField.on('autocompleteSelect', function() {
          var value;

          value = abbrField.val().split('|', 2);
          if (value.length < 2) {
            return false;
          }

          abbrField.val(value[0]);
          nameField.val(value[1]);
        });
      });
    },
  };

  function add_remove_action(elem) {
    if ($(elem).attr('readonly') != 'readonly') {
      $(elem).after("<div class='remove-action'></div");

      // add click handler that deletes the form-item div element
      $(elem).parent().find('.remove-action').click(function(evt) {
        $(evt.currentTarget).parent().remove();
      });
    }
  }

  function add_remove_note_action(elem) {
    if ($(elem).attr('readonly') != 'readonly') {
      $(elem).after("<div class='remove-action'></div");

      // add click handler that deletes the form-item div element
      $(elem).parent().find('.remove-action').click(function(evt) {
        $(evt.currentTarget).parent().parent().remove();
      });
    }
  }

  function conditional_display() {
    // this should be template-driven
    if ($( ".form-select-country" ).val() == 'US'){
      $(".form-item-transcriptData-tl2-province-ca").css('display','none');
      $(".form-item-transcriptData-tl2-state").css('display','block');
      $(".form-item-transcriptData-tl2-territory").css('display','none');
      $("#edit-transcriptdata-tl2-territory").val('');
      $("#edit-transcriptdata-tl2-province-ca").val('');
      $(".form-item-transcriptData-tl2-county").css('display','block');
      $(".form-item-transcriptData-tl4-province-ca").css('display','none');
      $(".form-item-transcriptData-tl4-state").css('display','block');
      $(".form-item-transcriptData-tl4-state-2").css('display','none');
      $("#edit-transcriptdata-tl4-state-2").val('');
      $("#edit-transcriptdata-tl4-province-ca").val('');
    } else if($(".form-select-country" ).val() == 'CA') {
      $(".form-item-transcriptData-tl2-province-ca").css('display','block');
      $(".form-item-transcriptData-tl2-state").css('display','none');
      $(".form-item-transcriptData-tl2-territory").css('display','none');
      $("#edit-transcriptdata-tl2-territory").val('');
      $("#edit-transcriptdata-tl2-state").val('');
      $(".form-item-transcriptData-tl2-county").css('display','block');
      $(".form-item-transcriptData-tl4-province-ca").css('display','block');
      $(".form-item-transcriptData-tl4-state").css('display','none');
      $(".form-item-transcriptData-tl4-state-2").css('display','none');
      $("#edit-transcriptdata-tl4-state").val('');
      $("#edit-transcriptdata-tl4-state-2").val('');
    } else {
      $(".form-item-transcriptData-tl2-province-ca").css('display','none');
      $(".form-item-transcriptData-tl2-state").css('display','none');
      $("#edit-transcriptdata-tl2-state").val('');
      $("#edit-transcriptdata-tl2-province-ca").val('');
      $(".form-item-transcriptData-tl2-county").css('display','none');
      $("#edit-transcriptdata-tl2-county").val('');
      $(".form-item-transcriptData-tl2-territory").css('display','block');
      $(".form-item-transcriptData-tl4-province-ca").css('display','none');
      $(".form-item-transcriptData-tl4-state").css('display','none');
      $("#edit-transcriptdata-tl4-state").val('');
      $("#edit-transcriptdata-tl4-province-ca").val('');
      $(".form-item-transcriptData-tl4-state-2").css('display','block');
    }
  }

  /**
   * perform whatever run-time adjustments are needed for the template
   * later we should refactor so there is nothing botany-specific here
   **/
  function adjust_template() {
    // make it so description only appears on focus, hides again on blur
    var descriptions = $('div.form-type-textfield > div.description, div.form-type-textarea > div.description, div.form-type-select > div.description');
    $(descriptions).hide();

    var fields = $('.form-item > input, .form-item > div.form-textarea-wrapper > textarea, .form-item > select');
    $(fields).each(function() {
      var desc = $(this).closest('div.form-item').find('div.description');
      if ( $(desc).length > 0 ) {
        $(this)
        .focus(function() {
          var theMsg = $(desc).html();
          // TODO: Find a better way to handle this...
          //             var theSide = ( $(this).hasClass('form-textarea') ) ? 'topMiddle' : 'rightMiddle'; // Textareas should have their tips up top
          var theSide = 'topMiddle';
          if ( $(this).attr('id') == 'edit-transcriptdata-tl2-precise-locality' ) {
            theSide = 'rightMiddle';
          }

          // To prevent checkbox text from obscuring Submit buttons
          if ( $(this).hasClass('form-checkbox') ) {
            theSide = 'topMiddle';
          }

          // Always place on top for smaller screens
          if ($(window).width() <= 1024) {
            theSide = 'topMiddle';
          }

          $(this).nextMsg({ msg: theMsg, CSSClass: "nextMsg-DarkTheme", side: theSide, minDuration: -1, maxWidth: 300 });
        })
        .blur(function() {
          $('#' + $(this).attr('nextMsg-id')).click();
        });
      }
    });

    conditional_display();
    $('.form-select-country').change(conditional_display);

    // Datatables
    if ($('form.transcribe-form-uxtables').length) {
      $('form.transcribe-form-uxtables textarea.form-transcriptData-field').each(function() {
        var fldID = $(this).attr('id');
        var dtID = fldID + '-tbl';

        // Read colHeaders and data
        var dtColHeaders = $(this).data('dtcolheaders');
        var dtData = $.parseJSON($(this).val());
        var colWidths;

        if ($(this).hasClass('form-apollo-datatable')) {
          colWidths = [45, 45, 65, 75, 200, 300, 80, 65, 65, 100, 285];
        }
        else if ($(this).hasClass('form-sps-datatable')) {
          colWidths = [100, 100, 100, 80, 175, 100, 80, 100, 90, 85, 65, 75, 75, 100, 285];
        }
        else if ($(this).hasClass('form-scurlockledgers-datatable')) {
          (function() {
            var s1 = 65,
                s2 = 100,
                s3 = 150,
                s4 = 200,
                s5 = 300;
            colWidths = [s1, s1, s4, s2, s3, s3, s2, s2, s2, s5];
          }());
        }
        // Apollo Theater
        else if ($(this).hasClass('form-apollo-theater-datatable')) {
          (function() {
            var s1 = 150,
                s2 = 300,
                s3 = 710;
            colWidths = [s2, s1, s1, s3];
          }());
        }
        // DASCH
        else {
          colWidths = [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 120, 285];
        }
        // Create a DIV for the table and hide the textarea
        // 270 height allows for about 10 and change rows
        $(this)
          .before('<div id="' + dtID + '" style="width: 100%; height: 270px; overflow: hidden;"></div>')
          .hide();

        // Attach the datatable and pull in the data and colHeaders
        $('#' + dtID).handsontable({
          data: dtData,
          minSpareRows: 1,
          colHeaders: dtColHeaders,
          minCols: dtColHeaders.length,
          colWidths: colWidths,
          contextMenu: false,
          afterChange: function(changes, source) {
            // source will be something like "edit"
            // changes will be an array enumerating changes
            // Since (presumably) our datasets are managable we're going to be fetching a
            // complete set of the table each change and syncing back to the field.
            var _data = $('#' + dtID).handsontable('getSourceData');
            $('#' + fldID).val(JSON.stringify(_data));
            transcribr_site_debug(_data);
          },
          afterSelection: function (r, c, r2, c2) {
            /* On focus we're requesting a lock for this asset. */

            // Return if the asset is already locked, nothing to do
            if (transcribr_site_transcribe_form_assetIsLocked == true) {
              return;
            }

            // Monitor key presses on this element
            $(this).keypress(function(_ev) {
              // Check key press timer and reset/normalize
              if (transcribr_site_transcribe_form_keypressTimerRunning == true) {
                clearTimeout(transcribr_site_transcribe_form_keypressTimer);
                transcribr_site_transcribe_form_keypressTimerRunning = false;
              }

              // Set key press timeout to 5 sec
              transcribr_site_transcribe_form_keypressTimer = setTimeout(transcribr_site_execKeypressTimeout, 5000);
              transcribr_site_transcribe_form_keypressTimerRunning = true;

              // Update lock
              transcribr_site_requestLock(this);

              // Set warning
              if (transcribr_site_transcribe_form_assetIsLocked == false) {
                transcribr_site_setUserWarning();
              }
            });

            transcribr_site_transcribe_form_activeElement = this;

            // Ask for a record lock
            if (transcribr_site_transcribe_form_assetIsLocked == false) {
              transcribr_site_requestLock(transcribr_site_transcribe_form_activeElement);
            }
          }
        });

        // Add to our list
        if ('setOrientationEvents' in Drupal.settings.transcribr_site) {
        } else {
          Drupal.settings.transcribr_site.setOrientationEvents = {};
        }
        Drupal.settings.transcribr_site.setOrientationEvents[dtID] = 'transcribr_site_datatable_callback';
      });
    }

    // Works great until you have more than one list.
    // I see no way around specificity here -Rich
    // add "x" for remove action to all but the first Collector field
    // Works great until you have more than one list.
    $("#edit-tl2-collectors input[type='text']").each( function(index, elem) {
      if (index !=0) add_remove_action(elem);
    });

    $("#edit-tl3-depicted-people input[type='text']").each( function(index, elem) {
      if (index !=0) add_remove_action(elem);
    });

    $("#edit-tl3-allegorical-scene input[type='text']").each( function(index, elem) {
      if (index !=0) add_remove_action(elem);
    });

    $("#edit-tl4-collectors input[type='text']").each( function(index, elem) {
      if (index !=0) add_remove_action(elem);
    });

    $("#edit-tl4-other-numbers input[type='text']").each( function(index, elem) {
      if (index !=0) add_remove_action(elem);
    });

    $("#edit-tl4-label-notes textarea").each( function(index, elem) {
      if (index !=0) add_remove_note_action(elem);
    });

    // more repeated code for specificity sake for template 3
    $("#edit-tl3-depicted-people a.list").each( function(index, link_element) {
      // ability to clone the form-item on click
      $(link_element).click(function(evt) {
        evt.preventDefault();

        var add_collector_link = evt.currentTarget;
        // form_item is a div with the label and input inside it, class form-item
        var form_item = $(add_collector_link).parent().children().first();
        $(add_collector_link).before($(form_item).clone());

        // grab div we just inserted, change its input name attr for next array index
        var new_elm = $(add_collector_link).prev();
        var input_elm = $(new_elm).find('input');
        name = $(input_elm).attr('name');
        index = $(new_elm).index();
        name = name.replace(/\[[^\]]*?\]$/, '[' +  index + ']');
        $(input_elm).attr('name', name);
        add_remove_action($(new_elm).find("input[type='text']"));

        $(input_elm).val('');

        // fixup index for classes and ids
        $(new_elm)
        .removeClass("form-item-transcriptData-tl3-depicted-people-0")
        .addClass("form-item-transcriptData-tl3-depicted-people-"+index);

        return false;
      });
    });

    $("#edit-tl3-allegorical-scene a.list").each( function(index, link_element) {
      // ability to clone the form-item on click
      $(link_element).click(function(evt) {
        evt.preventDefault();

        var add_collector_link = evt.currentTarget;
        // form_item is a div with the label and input inside it, class form-item
        var form_item = $(add_collector_link).parent().children().first();
        $(add_collector_link).before($(form_item).clone());

        // grab div we just inserted, change its input name attr for next array index
        var new_elm = $(add_collector_link).prev();
        var input_elm = $(new_elm).find('input');
        name = $(input_elm).attr('name');
        index = $(new_elm).index();
        name = name.replace(/\[[^\]]*?\]$/, '[' +  index + ']');
        $(input_elm).attr('name', name);
        add_remove_action($(new_elm).find("input[type='text']"));

        $(input_elm).val('');

        // fixup index for classes and ids
        $(new_elm)
        .removeClass("form-item-transcriptData-tl3-allegorical-scene-0")
        .addClass("form-item-transcriptData-tl3-allegorical-scene-"+index);

        return false;
      });
    });

    // more repeated code for specificity sake
    $("#edit-tl4-collectors a.list").each( function(index, link_element) {
      // ability to clone the form-item on click
      $(link_element).click(function(evt) {
        evt.preventDefault();

        var add_collector_link = evt.currentTarget;
        // form_item is a div with the label and input inside it, class form-item
        var form_item = $(add_collector_link).parent().children().first();
        $(add_collector_link).before($(form_item).clone());

        // grab div we just inserted, change its input name attr for next array index
        var new_elm = $(add_collector_link).prev();
        var input_elm = $(new_elm).find('input');
        name = $(input_elm).attr('name');
        index = $(new_elm).index();
        name = name.replace(/\[[^\]]*?\]$/, '[' +  index + ']');
        $(input_elm).attr('name', name);
        add_remove_action($(new_elm).find("input[type='text']"));

        $(input_elm).val('');

        // fixup index for classes and ids
        $(new_elm)
        .removeClass("form-item-transcriptData-tl4-collectors-0")
        .addClass("form-item-transcriptData-tl4-collectors-"+index);

        return false;
      });
    });

    // more repeated code for specificity sake
    $("#edit-tl4-other-numbers a.list").each( function(index, link_element) {
      // ability to clone the form-item on click
      $(link_element).click(function(evt) {
        evt.preventDefault();

        var add_collector_link = evt.currentTarget;
        // form_item is a div with the label and input inside it, class form-item
        var form_item = $(add_collector_link).parent().children().first();
        $(add_collector_link).before($(form_item).clone());

        // grab div we just inserted, change its input name attr for next array index
        var new_elm = $(add_collector_link).prev();
        var input_elm = $(new_elm).find('input');
        name = $(input_elm).attr('name');
        index = $(new_elm).index();
        name = name.replace(/\[[^\]]*?\]$/, '[' +  index + ']');
        $(input_elm).attr('name', name);
        add_remove_action($(new_elm).find("input[type='text']"));

        $(input_elm).val('');

        // fixup index for classes and ids
        $(new_elm)
        .removeClass("form-item-transcriptData-tl4-other-numbers-0")
        .addClass("form-item-transcriptData-tl4-other-numbers-"+index);

        return false;
      });
    });


    // more repeated code for specificity sake
    $("#edit-tl4-label-notes a.list").each( function(index, link_element) {
      // ability to clone the form-item on click
      $(link_element).click(function(evt) {
        evt.preventDefault();

        var add_collector_link = evt.currentTarget;
        // form_item is a div with the label and input inside it, class form-item
        var form_item = $(add_collector_link).parent().children().first();
        $(add_collector_link).before($(form_item).clone());

        // grab div we just inserted, change its input name attr for next array index
        var new_elm = $(add_collector_link).prev();
        var input_elm = $(new_elm).find('textarea');
        name = $(input_elm).attr('name');
        index = $(new_elm).index();
        name = name.replace(/\[[^\]]*?\]$/, '[' +  index + ']');
        $(input_elm).attr('name', name);
        add_remove_note_action($(new_elm).find("textarea"));

        $(input_elm).val('');

        // fixup index for classes and ids
        $(new_elm)
        .removeClass("form-item-transcriptData-tl4-label-notes-0")
        .addClass("form-item-transcriptData-tl4-label-notes-"+index);

        return false;
      });
    });

    // creating a function on the single "Add Collector" link in the list
    $("#edit-tl2-collectors a.list").each( function(index, link_element) {
      // ability to clone the form-item on click
      $(link_element).click(function(evt) {
        evt.preventDefault();

        var add_collector_link = evt.currentTarget;
        // form_item is a div with the label and input inside it, class form-item
        var form_item = $(add_collector_link).parent().children().first();
        $(add_collector_link).before($(form_item).clone());

        // grab div we just inserted, change its input name attr for next array index
        var new_elm = $(add_collector_link).prev();
        var input_elm = $(new_elm).find('input');
        name = $(input_elm).attr('name');
        index = $(new_elm).index();
        name = name.replace(/\[[^\]]*?\]$/, '[' +  index + ']');
        $(input_elm).attr('name', name);
        add_remove_action($(new_elm).find("input[type='text']"));

        // fixup index for classes and ids
        $(new_elm)
        .removeClass("form-item-transcriptData-tl2-collectors-0")
        .addClass("form-item-transcriptData-tl2-collectors-"+index);

        $("input[type='hidden']", new_elm)
        .removeClass("autocomplete-processed")
        .addClass("autocomplete");

        $('.form-autocomplete', new_elm).attr("id", "edit-transcriptdata-tl2-collectors-" + index);
        $('.element-invisible', new_elm).attr("id", "edit-transcriptdata-tl2-collectors-" + index + "-autocomplete-aria-live");
        $("input[type='hidden']", new_elm).attr("id", "edit-transcriptdata-tl2-collectors-" + index + "-autocomplete");

        // dynamically attach autocomplete behavior
        Drupal.attachBehaviors(new_elm);
        $(input_elm).val('');

        // note: we likely need to do something different in IE
        // http://stackoverflow.com/questions/5897084/jquery-add-form-input-and-change-input-name
        return false;
      });
    });

    if ($('form.transcribe-form-uxtabs').length) {
      $('form.transcribe-form-uxtabs').accessibleTabs({
        tabhead: '.section>legend',
        tabbody: '.section',
        currentInfoText: '',
        fx: 'fadeIn',
        fxspeed: 10
      });

      // Number tabs
      $('form.transcribe-form-uxtabs li a .fieldset-legend').each(function(index, elem) {
        var label_text = $(elem).text();
        $(elem).before('<span class="step-num">' + (index + 1) + ') </span>');
      });
    }
  }

  // When user clicks autocomplete option, trigger change to enable autosave of selected option.
  $( document ).on( "click", "#autocomplete ul li", function() {
    $("#autocomplete").siblings(".form-autocomplete").change(); // Trigger sisyphus to grab and save data
  });

  // When user presses enter key on autocomplete form item, autosave any selected autocomplete option
  // Selector to use here is input.form-autocomplete, as this keeps focus. Focus isn't given to #autocomplete for some reason
  $( document ).on("keydown", "input.form-autocomplete",  function(e) {
    if(e.keyCode  == 13) { // Enter key pressed
      if ($("#autocomplete ul li.selected div").length > 0) { // Autocomplete item has been selected
        var x = $("#autocomplete ul li.selected div").text(); // Get selected autocomplete option
        $(this).val(x);
        $(this).change(); // Trigger sisyphus to grab and save data
        e.preventDefault();  // Prevent page from being submitted when hitting enter in this situation...
      }
    }
  });

  $(document).ready(function() {
    adjust_template();

    // NOTE: do not move this after the $('.transcribe-form .tabs-list li a').click
    // handler; we want this to call that handler.
    // Set hidden field and redirect value
    //console.log("dsrf "+ Drupal.settings.redirect_fragment);
    var redirect_inital_value = (Drupal.settings.redirect_fragment) ? Drupal.settings.redirect_fragment : '';
    $('.transcribe-form')
    .append('<input type="hidden" name="redirect" value="' + redirect_inital_value + '" />');

    // If the Drupal.settings value exists, set hidden field and redirect fragment
    if (redirect_inital_value != '') {
      window.location.hash = redirect_inital_value;
    }

    // If there is a hash (which should just be the form tab id), click it.
    if (window.location.hash) {
      // We need to call click() to activate the right tab, but note
      // this won't trigger $('.transcribe-form .tabs-list li a').click(function().
      $("a[href=" + window.location.hash + "]").click();

      // So, we have to perform the same functionality that handler doesn manually, here.
      var redirect_fragment = window.location.hash.substring(1); //strip '#'
      $(".transcribe-form input[name='redirect']").attr('value',  redirect_fragment);
    }
    // END NOTE reference

    /*
     * Event handler for clicking a tab
     */
    $('.transcribe-form .tabs-list li a').click(function() {
      // Set form destination to include a specific form tab if that tab is selected.
      // This data will need to be used to set the active tab after form submit.
      var redirect_fragment = ($(this).attr('href')).substring(1); //strip '#'
      $(".transcribe-form input[name='redirect']").attr('value',  redirect_fragment);
    });

    /**
     * Make the promote/demote checkboxes explicit by disabling the non-checked one.
     */
    $('input#edit-demote-status').change(function() {
      var promoteBox = $('input#edit-promote-status');

      if (this.checked) {
        $(promoteBox)
        .removeAttr('checked')
        .attr('disabled', 'disabled');
      } else {
        $(promoteBox).removeAttr('disabled');
      }
    });

    $('input#edit-promote-status').change(function() {
      var demoteBox = $('input#edit-demote-status');

      if (this.checked) {
        $(demoteBox)
        .removeAttr('checked')
        .attr('disabled', 'disabled');
      } else {
        $(demoteBox).removeAttr('disabled');
      }
    });

    /**
     * Pre-submit logic.
     */
    $('#transcribr-site-transcribe-form').submit(function(evt) {
      // Prompt the user when leaving a page they've changed.
      return transcribr_site_clearUserWarning();
    });

    /**
     * Process the save & continue ajax-style to preserve the screen state.
     */
    $('#transcribr-site-transcribe-form #edit-submit').click(function(evt) {
      if (!$(this).parents('form').hasClass('ajaxsave') || $("input[name='promote_status']").is(':checked')) {
        return true;
      }

      evt.preventDefault();

      var uri = transcribr_site_getSyncURL();

      var subButton = $("#edit-actions");
      var ajaxLoader = $('#transcription-form-ajax-loader');
      $(subButton).hide();
      $(ajaxLoader).show();

      // Clear existing messages
      $('.messages').remove();

      // Gather the form and ajax submit it, see the auto-sync code
      $.post(uri, transcribr_site_transcribe_form_getData('&ajaxsave=1')).done(function(data) {
        // Data will likely be HTML so we'll need to get the contents of .messages (and maybe the classes)
        transcribr_site_debug('Result:');
        transcribr_site_debug(data);

        // 1 = success
        if (data.status == 1) {
          // TODO: Locks are _not_ cleared on submission.
          //transcribr_site_transcribe_form_assetIsLocked = false; // Lock should be cleared if this was successful.
          transcribr_site_clearUserWarning();
        }

        // Grab the .messages from the response and display here
        for (var key in data.drupal_messages) {
          $('.actual-content').before('<div class="messages ' + key + '">' + data.drupal_messages[key].join('<br><br>') + '</div>');
        }

        $(subButton).show();
        $(ajaxLoader).hide();
      });
    });

    /**
     * Auto-save/submit functionality...
     */

    // Auto-save using local storage
    var transcribr_form_obj = $('#transcribr-site-transcribe-form');

    // Don't attach for anonymous users
    transcribr_site_debug( 'User: ' + Drupal.settings.transcribr_site.userId );

    if (Drupal.settings.transcribr_site.userId > 0) {
      $(transcribr_form_obj).append('<div id="transcription-form-autosave-status">Changes Saved</div>')
      $('#transcription-form-autosave-status').hide();

      // Grab our current Url path which does not include anchor tag, to be part of our key for auto-save local storage
      var pathsuffix = '--' + window.location.pathname;
      pathsuffix = pathsuffix.replace(new RegExp("/","gm"),"-");

      $(transcribr_form_obj).sisyphus({
        excludeFields: $('input#edit-promote-status, input#edit-demote-status, input[type=submit]'),
        customKeySuffix: pathsuffix,
        onSave: function() {
          transcribr_site_debug('Data saved to local storage.');

          if (transcribr_site_transcribe_form_syncTimerRunning != true) {
            transcribr_site_transcribe_form_syncTimer = setTimeout(transcribr_site_execSyncTimeout, transcribr_site_transcribe_form_syncTimeoutPeriod);
            transcribr_site_transcribe_form_syncTimerRunning = true;
          }
        }
      });
    }

    $('textarea, input, select, table', '#transcribr-site-transcribe-form').focus(function(ev) {
      /* On focus we're requesting a lock for this asset. */

      // Return if the asset is already locked, nothing to do
      if (transcribr_site_transcribe_form_assetIsLocked == true) {
        return;
      }

      // Return if a lockoutTimer is running, nothing to do
      if (transcribr_site_transcribe_form_lockoutTimerRunning == true) {
        return;
      }

      // Monitor key presses on this element
      $(this).keypress(function(_ev) {
        // Check key press timer and reset/normalize
        if (transcribr_site_transcribe_form_keypressTimerRunning == true) {
          clearTimeout(transcribr_site_transcribe_form_keypressTimer);
          transcribr_site_transcribe_form_keypressTimerRunning = false;
        }

        // Set key press timeout to 5 sec
        transcribr_site_transcribe_form_keypressTimer = setTimeout(transcribr_site_execKeypressTimeout, 5000);
        transcribr_site_transcribe_form_keypressTimerRunning = true;

        // Update lock
        transcribr_site_requestLock(this);

        // Set warning
        if (transcribr_site_transcribe_form_assetIsLocked == false) {
          transcribr_site_setUserWarning();
        }
      });

      transcribr_site_transcribe_form_activeElement = this;

      // Ask for a record lock
      if (transcribr_site_transcribe_form_assetIsLocked == false) {
        transcribr_site_requestLock(transcribr_site_transcribe_form_activeElement);
      }
    });
  });
})(jQuery);

/**
 * Debug wrapper. Outputs to console or as alert messages.
 */
function transcribr_site_debug(msg) {
  if (transcribr_site_transcribe_form_debug == 1) {
    console.log(msg);
  } else if (transcribr_site_transcribe_form_debug == 2) {
    alert(msg);
  } else {
    return;
  }
}

/**
 * Warns the user that their work may be unsaved.
 */
function transcribr_site_setUserWarning(e) {
  if (window.onbeforeunload == null) {
    transcribr_site_debug('Warning set.');
    window.onbeforeunload = function(e) {
      var message = "Your work has not been saved.",
        e = e || window.event;

        if (e) {
          e.returnValue = message;
        }

        return message;
    };
    return true;
  } else {
    return false;
  }
}

/**
 * Clears warning about loosing work.
 */
function transcribr_site_clearUserWarning() {
  transcribr_site_debug('Warning cleared.');
  window.onbeforeunload = null;
  return true;
}

/**
 * Checks and requests lock out for the specified asset.
 */
function transcribr_site_requestLock(obj) {
  // Only run one lock request per constant-defined duration
  if (transcribr_site_transcribe_form_lockTimerRunning == true) {
    return;
  }
  transcribr_site_transcribe_form_lockTimerRunning = true;
  window.setTimeout(function() {
    transcribr_site_transcribe_form_lockTimerRunning = false;
  }, transcribr_site_transcribe_form_lockTimerPeriod);

  var uri = transcribr_site_getLockURL();

  transcribr_site_debug('URI: ' + uri);

  if (uri == false) {
    transcribr_site_transcribe_form_lockoutTimerRunning = false;
  }

  jQuery.get(
    uri,
    function(data) {
      // Reference:
      // 0-NO LOCK
      // 1-LOCKED BY CURRENT USER
      // 2-LOCKED BY ANOTHER USER
      // 3 - stale data on page force reload
      if (data.assetLock.status == 2) {
        jQuery('.transcribe-form input.form-text, .transcribe-form textarea')
          .attr('readonly', 'readonly')
          .addClass('readonly');

        jQuery('.transcribe-form .form-checkbox, .transcribe-form .form-submit, .transcribe-form .form-select')
          .attr('disabled', 'disabled')
          .addClass('readonly');

        jQuery('.transcribe-form a.list').css({'display': 'none'});

        jQuery('#transcribr-site-transcribe-form').unbind(); // remove any events (might cover sisyphys)
        jQuery('#transcribr-site-transcribe-form').submit(function(){ return false; }); // Just in case?
        jQuery('#transcribr-site-transcribe-form').sisyphus('free');
        jQuery('#transcribr-site-transcribe-form').sisyphus('releaseData');

        // Display a message?
        clearTimeout(transcribr_site_transcribe_form_lockoutTimer);
        transcribr_site_transcribe_form_lockoutTimerRunning = false;
        transcribr_site_transcribe_form_assetIsLocked = true;

        transcribr_site_clearUserWarning();

        alert('This page is being edited by another volunteer. Please try working on another page.');
      } else {
        // Set or reset timer
        if (transcribr_site_transcribe_form_lockoutTimerRunning == true) {
          clearTimeout(transcribr_site_transcribe_form_lockoutTimer);
          transcribr_site_transcribe_form_lockoutTimerRunning = false;
        }
        transcribr_site_transcribe_form_lockoutTimer = setTimeout(transcribr_site_execLockoutExpired, transcribr_site_getTimeout(data.assetLock.expiresInSeconds));
        transcribr_site_transcribe_form_lockoutTimerRunning = true;

        transcribr_site_lock_status(true);
      }
    },
    'json'
  );
}

/**
 * Executes a set of actions when the keypress timer expires.
 */
function transcribr_site_execKeypressTimeout() {
  clearTimeout(transcribr_site_transcribe_form_keypressTimer);
  transcribr_site_transcribe_form_keypressTimerRunning = false;
}

/**
 * Executes a set of actions when the inactivity timer expires.
 */
function transcribr_site_execLockoutExpired() {
  clearTimeout(transcribr_site_transcribe_form_lockoutTimer);
  transcribr_site_transcribe_form_lockoutTimerRunning = false;

  // TODO: Eliminate now that locking is persistent?
  // Check for key press, extend lockout if detected; submit if not
  if (transcribr_site_transcribe_form_keypressTimerRunning == true) {
    // Extend...
    transcribr_site_debug('You are typing and the lock will be renewed.');
    transcribr_site_requestLock(transcribr_site_transcribe_form_activeElement);
  } else {
    // User is inactive auto submit work
    transcribr_site_debug('You are not typing and the form will be submitted.');

    // Note: Submits normally, not with AJAX
    jQuery(document.activeElement).blur();

    jQuery('#transcribr-site-transcribe-form')
      .append('<input type="hidden" name="jquerySubmitted" value="1" />')
      .find('#edit-submit').trigger('click');

    transcribr_site_lock_status(false);
  }
}

/**
 * Executes a set of actions when the sync timer expires.
 */
function transcribr_site_execSyncTimeout() {
  var uri = transcribr_site_getSyncURL();

  transcribr_site_debug('URI: ' + uri);

  if (uri == false) {
    clearTimeout(transcribr_site_transcribe_form_syncTimer); // Necessary?
    transcribr_site_transcribe_form_syncTimerRunning = false;
  }

  transcribr_site_debug('Data:');
  transcribr_site_debug( transcribr_site_transcribe_form_getData('&autosave=1') );

  jQuery.post(uri, transcribr_site_transcribe_form_getData('&autosave=1'))
  .done(function(data) {
    clearTimeout(transcribr_site_transcribe_form_syncTimer); // Necessary?
    transcribr_site_transcribe_form_syncTimerRunning = false;

    transcribr_site_debug('Result:');
    transcribr_site_debug(data);

    // Data ref: {transcript:..., status:1}
    // 1 = success
    if (data.status == 1) {
      jQuery('#transcription-form-autosave-status').show().fadeOut(2000);
      // TODO: Need to verify if locks are cleared on submission
      transcribr_site_transcribe_form_assetIsLocked = false; // Lock should be cleared if this was successful.
      transcribr_site_clearUserWarning();
    }
  });
}

/**
 * Gets the current data from the form and appends an autosave param.
 */
function transcribr_site_transcribe_form_getData(suffix) {
  return jQuery('#transcribr-site-transcribe-form').serialize() + suffix;
}

/**
 * Timeout in seconds, returns milliseconds, 30 sec min.
 */
function transcribr_site_getTimeout(timeout) {
  var newTimeout = timeout - 30;

  if (newTimeout < 30) {
    newTimeout = 30;
  }

  return newTimeout * 1000;
}

/**
 * Returns a URL for requesting an asset lock. False on error.
 */
function transcribr_site_getLockURL() {
  // Ref: Object {userId: "181", assetName: "EBL7g", templateId: 1}
  /*if (!Drupal.settings.transcribr_site.userId) {
    var userId = 0;
  } else {
    var userId = Drupal.settings.transcribr_site.userId;
  }

  if (!Drupal.settings.transcribr_site.assetName) {
    return false;
  }

  if (!Drupal.settings.transcribr_site.templateId) {
    return false;
  }*/
	// return '';
  return '/transcribe/lock/' + userId + '/' + Drupal.settings.transcribr_site.assetName + '/' + Drupal.settings.transcribr_site.templateId;
}

/**
 * Returns a URL for syncing an asset. False on error.
 */
function transcribr_site_getSyncURL() {
  return jQuery('#transcribr-site-transcribe-form').attr('action');
}



/**
 * Cookie stuff
 * si_transcription_tutorials
 */
function transcribr_site_setCookie(val) {
  var exp = new Date();
  exp.setFullYear(exp.getFullYear() + 1);
  document.cookie = "si_transcription_tutorials=" + JSON.stringify(val) + "; expires="+exp.toUTCString()+"; path=/";
}

function transcribr_site_getCookie() {
  var split = document.cookie.split(';');
  for (var i=0; i < split.length; i++) {
    var c = split[i];
    if (c.indexOf("si_transcription_tutorials") >= 0) {
      return JSON.parse(c.split('=')[1]);
    }
  }
  return new Array();
}



/**
 * Callbacks for plugins
 */
function transcribr_site_datatable_callback(tbl) {
  jQuery('#' + tbl).handsontable('render');
}

/**
 * Update DOM element to show when an asset has been locked
 */
function transcribr_site_lock_status(locked) {
  var lockStatus;

  lockStatus = jQuery('.transcription-form-lock-status');

  if (locked === true) {
    lockStatus.text('Locked');
  }
  else {
    lockStatus.text('');
  }
}
