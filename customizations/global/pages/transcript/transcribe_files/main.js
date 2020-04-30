(function ($) {
  $(document).ready(function(e){
    /*
     * Behavior for Main Navigation Dropdown
     */
    $('#transcribr-site-home-browse-form select').change(function(e) {
      $(this).parents('form').submit();
    });
    $('#transcribr-site-home-browse-form input[type=submit]').parent('.form-item').hide();
    $('#transcribr-site-home-browse-form label').hide();


    /*
     * Project Browse Page
     */
    var browseButtons = $('.browse-project').children('.browse-project-details').children('.browse-project-action-button');
    $(browseButtons).fadeTo(0,0);
    $('.browse-project')
    .mouseenter(function(e){
        var button = $(this).children('.browse-project-details').children('.browse-project-action-button');
        button.stop().animate({'opacity':1, 'right': '-64px'},200);
    })
    .mouseleave(function(e){
        var button = $(this).children('.browse-project-details').children('.browse-project-action-button');
        button.stop().animate({'opacity':0, 'right': '-100px'},200);
    });

    $('.browse-project-action-button').click(function(e){
       document.location = $(this).attr('data-url');
    });

    if (document.URL.indexOf('view=thumbs')>0) {
      $('.button-grid').addClass('active');
    } else {
      $('.button-list').addClass('active');
    }

    $('#browse-view-toggle div').click(function(e){
        var u = document.URL;
        if(u.indexOf('view=thumbs')>0){
            var query = u.split('?')[1];
            u = u.split('?')[0];
            query = query.replace(/^\?|&?view\=thumbs/,'');
            if(query.length > 1){
                u += '?' + ((query.charAt(0) == '&') ? query.substring(1) : query);
            }
        }else{
            u += ((u.indexOf('?')>0) ? '&':'?') +'view=thumbs';
        }
        window.location = u;
    });

    $('#transcribr-site-browse-form select, #transcribr-site-browse-form :checkbox').change(function(e) {
        $(this).parents('form').submit();
    });
    $('#transcribr-site-browse-form input[type=submit]').parent('.form-item').hide();

    $('#list-content .browse-section').scrollSpy();

    (function() {
      var button,
          description,
          summary;

      description = $('.project-description');
      summary = $('.project-summary');
      button = $('<a />', {
        href: '#',
        'class': 'project_description_button',
      });

      button.textCollapsed = 'Read More';
      button.textExpanded = 'Collapse this information';

      button
        .text(button.textCollapsed)
        .insertAfter(summary)
        .click(function(e) {
          description.add(summary)
            .toggleClass('hidden');

          button.text(button.text() == button.textCollapsed ? button.textExpanded : button.textCollapsed);

          return false;
        });
    }());



    /*
     * Transcription page behaviors
     */

    var si_tsc_goto_form = function(ev) {
      ev.preventDefault();
      if ($(this).hasClass('open')) {
        $(this).parent('li').stop().animate({'width': '45px'}, 250);
        $(this).removeClass('open');
      } else {
        $(this).parent('li').stop().animate({'width': '225px'}, 250);
        $(this).addClass('open');
      }
      return false;
    };
    $('a.goto').click(si_tsc_goto_form);

    /***
     * All of the orientation/cookie stuff
     *
     * The cookie should look like
     * {
     *   1: {a: 'horizontal', w: 100, h: 200},
     *   ...,
     *   templateID: {
     *     a: horizontal or vertical
     *     w: int,
     *     h: int
     *  }
     * }
     *
     * cookieSettings stores the current template's settings.
     */
    var cookieSettings = {};

    /**
     * Handles the user initiated orientation changes
     */
    $('.tools-arrange-vertical, .tools-arrange-horizontal').click(function(e){
        if(!$(this).hasClass('tool-active')){
            $('.tool-active').removeClass('tool-active');
            $(this).addClass('tool-active');

            if ($(this).hasClass('tools-arrange-horizontal')) {
                setOrientation('horizontal');
            } else {
                setOrientation('vertical');
            }
        }
    });

    /**
     * Loads cookieSettings from the current cookie. Sets the default orientation
     */
    if (document.URL.indexOf('transcribe/') > 0 || document.URL.indexOf('view/') > 0) {
        var theKey = "0";
        /*
        if (Drupal.settings.transcribr_site) {
          if ('templateId' in Drupal.settings.transcribr_site) {
            theKey = Drupal.settings.transcribr_site.templateId;
          }
        }
        */

        if (document.cookie.indexOf('si_transcription_layouts') >= 0) {
            var theCookie = getCookie('si_transcription_layouts');

            if (theCookie[theKey]) {
              cookieSettings = theCookie[theKey];
            }

            if (!cookieSettings.a) {
              cookieSettings.a = 'horizontal';
            }

            setOrientation(cookieSettings.a);
        } else {
            cookieSettings.a = 'horizontal';

            // Default by screen size
            if ($(document).width() > 1200) {
                cookieSettings.a = 'vertical';
            }

            setOrientation(cookieSettings.a);
        }

        $('.tool-active').removeClass('tool-active');
        $('.tools-arrange-' + cookieSettings.a).addClass('tool-active');
    }

    /**
     * Prepares the orientation object
     */
    function setTranscriptionLayout() {
        // Get the current cookie
        var theCookie = getCookie('si_transcription_layouts');

        // We're modifying/adding one templateID
        var theKey = "0";
        /*
        if (Drupal.settings.transcribr_site) {
          if ('templateId' in Drupal.settings.transcribr_site) {
            theKey = Drupal.settings.transcribr_site.templateId;
          }
        }
        */

        // Set the value
        var theValue = {
            a : cookieSettings.a,
            w : cookieSettings.w,
            h : parseInt($('#transcription-asset-view').css('height'))
        }

        theCookie[theKey] = theValue;

        setCookie('si_transcription_layouts', theCookie);
    }

    function setCookie(name, val) {
       var exp = new Date();
       exp.setFullYear(exp.getFullYear() + 1);
       document.cookie = name + "=" + JSON.stringify(val) + "; expires=" + exp.toUTCString() + "; path=/";
    }

    function getCookie(name) {
        var split = document.cookie.split(';');
        for(var i=0; i < split.length; i++) {
            var c = split[i];
            if (c.indexOf(name) >= 0) {
                return JSON.parse(c.split('=')[1]);
            };
        }
        return {};
    }

    /**
     * Sets the orientation on screen, initiates orientation callbacks, and sets the cookie.
     */
    function setOrientation(mode){
        cookieSettings.a = mode;
        if (mode == "horizontal") {
            var GRIP_WIDTH = 23;
            var width = $('.main-content').width();
            var height = $(window).height() - 118;
            //var height = $(window).height() - 150;
            var gperc = Math.ceil((GRIP_WIDTH/width)*100);
            var lperc;

            if (cookieSettings.w) {
                lperc = cookieSettings.w;
            } else {
                lperc = Math.floor( (((width-GRIP_WIDTH)/2)/width )*100 );
                cookieSettings.w = lperc
            }
      
      $('.main-content').css({'max-width':'100%', 'min-width':'500px', 'padding':'20px'});
            //$('.main-content').css({'max-width':'100%', 'min-width':'500px', 'padding':'20px'}).removeClass('container_12'); /* removed removeClass */
            $('.grid_12').css('width', '100%');

            $('.transcription-gripper-vertical').hide();
            $('.transcription-gripper-horizontal').show().css('height', (height + 20) + 'px');

            $('#transcription-asset-wrapper').css({'width': lperc + '%'});
            $('#asset-map, #transcription-asset-view').css({'height': height + 'px'});

            $('#transcription-form-wrapper').removeClass('tfw-vertical');
        } else {
          $('.main-content').css({'max-width':'100%', 'min-width':'', 'padding':'20px'})
            //$('.main-content').css({'max-width':'100%', 'min-width':'', 'padding':'20px'}).removeClass('container_12'); /* removed removeClass */
            //.addClass('container_12');
            $('.grid_12').css('width', '98.5%');

            $('.transcription-gripper-vertical').show();
            $('.transcription-gripper-horizontal').hide();

            $('#transcription-asset-wrapper, #asset-map, #transcription-asset-view').removeAttr('style');
            $('#transcription-form-wrapper').removeAttr('style').addClass('tfw-vertical');
        }

        // Process callbacks (if any)
        /*
        if ('setOrientationEvents' in Drupal.settings.transcribr_site) {
            for (var id in Drupal.settings.transcribr_site.setOrientationEvents) {
                var func = Drupal.settings.transcribr_site.setOrientationEvents[id];
                window[func](id);
            }
        }
    */
        setTranscriptionLayout();
    }

    // End orientation stuff

    $('a.transcription-form-collapse-button').click(function(e){
        e.preventDefault();
        var form = $(this).parent().parent().children('.transcription-form-content');
        if(form.is(':visible')){
            $(this).css('background-position', '50% 0');
            form.hide();
        }else{
            $(this).css('background-position', '50% -25px');
            form.show();
        }
    });

    var is_dragging = false;
    $('.gripper').parent().mousedown(function(e) {
    	//console.log($(this).attr('class'));
    	//console.log($(this).attr('class').indexOf('vertical') > 0);
        e.preventDefault();

        is_dragging = true;
        $('body').css("cursor", "url('gripper-cursor-closed.png'), auto");

        var orientation = ($(this).attr('class').indexOf('vertical') > 0) ? 'vertical' : 'horizontal';
        $(document).mousemove(function(e) {
            if(orientation == "vertical"){
                var position = (e.pageY - $('#transcription-asset-view').offset().top) - 8;
                console.log(position);
                if(position > 20){
                    $('#transcription-asset-view, #asset-map').css("height", position);
                }
            } else if(orientation == "horizontal"){
                var width = $('.main-content').outerWidth();
                var gperc =  Math.ceil( (23/width) * 100 );
                var lperc = Math.round( ((e.pageX)/width) * 100 );
                var rperc = (100 - (lperc + gperc)) - 1;
                if( ((lperc/100)*width) > 215 && ((rperc/100)*width) > 215){
                    cookieSettings.w = lperc;
                    $('#transcription-asset-wrapper').css({'width': lperc + "%"});
                }
            }
        });
    });

    $(document).mouseup(function(e) {
        setTranscriptionLayout();
        if (is_dragging) {
            $('body').css("cursor", 'auto');
            $(document).unbind('mousemove');
            dragging = false;
        }
    });


  });
})(jQuery);
