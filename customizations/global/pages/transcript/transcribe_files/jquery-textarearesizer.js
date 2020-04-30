(function($) {
  var textarea, staticOffset;
  var iLastMousePos = 0;
  var iMin = 32;
  var grip;
  $.fn.TextAreaResizer = function() {
    return this.each(function() {
      textarea = $(this).addClass('processed'), staticOffset = null;
      $(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').bind("mousedown", {
        el: this
      }, startDrag));
      var grippie = $('div.grippie', $(this).parent())[0];
      grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) + 'px'
    })
  };

  function startDrag(e) {
    textarea = $(e.data.el);
    textarea.blur();
    iLastMousePos = mousePosition(e).y;
    staticOffset = textarea.height() - iLastMousePos;
    textarea.css('opacity', 0.25);
    $(document).mousemove(performDrag).mouseup(endDrag);
    return false
  }
  function performDrag(e) {
    var iThisMousePos = mousePosition(e).y;
    var iMousePos = staticOffset + iThisMousePos;
    if (iLastMousePos >= (iThisMousePos)) {
      iMousePos -= 5
    }
    iLastMousePos = iThisMousePos;
    iMousePos = Math.max(iMin, iMousePos);
    textarea.height(iMousePos + 'px');
    if (iMousePos < iMin) {
      endDrag(e)
    }
    return false
  }
  function endDrag(e) {
    $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
    textarea.css('opacity', 1);
    textarea.focus();
    textarea = null;
    staticOffset = null;
    iLastMousePos = 0
  }
  function mousePosition(e) {
    return {
      x: e.clientX + document.documentElement.scrollLeft,
      y: e.clientY + document.documentElement.scrollTop
    }
  }
})(jQuery);













/*
 * jquery.autogrow.js
 *
 * A plugin written for UserVoice that makes it easy to create textareas
 * that automatically resize to fit their contents.
 *
 * Based on Scott Moonen's original code for Prototype.js:
 *
 * <http://scottmoonen.com/2008/07/08/unobtrusive-javascript-expandable-textareas/>
 *
 * Author: John W. Long <john@uservoice.com>
 *
 */
;(function($) {
  var properties = ['-webkit-appearance', '-moz-appearance', '-o-appearance', 'appearance', 'font-family', 'font-size', 'font-weight', 'font-style', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left', 'box-sizing', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'min-height', 'max-height', 'line-height']
  ,   escaper    = $('<span />')
  ;
 
  function escape(string) {
    return escaper.text(string).text().replace(/\n/g, '<br>');
  }
 
  $.fn.autogrow = function() {
    return this.filter('textarea').each(function() {
      if (!$(this).data('autogrow-applied')) {
        var textarea      = $(this)
        ,   initialHeight = textarea.innerHeight()
        ,   expander      = $('<div />')
        ,   timer         = null
        ;
 
        // Setup expander
        expander.css({'position': 'absolute', 'visibility': 'hidden', 'top': '-99999px'})
        $.each(properties, function(i, p) { expander.css(p, textarea.css(p)); });
        textarea.after(expander);
 
        // Setup textarea
        textarea.css({'overflow-y': 'hidden', 'resize': 'none', 'box-sizing': 'border-box'});
 
        // Sizer function
        function sizeTextarea() {
          clearTimeout(timer);
          timer = setTimeout(function() {
            var value = escape(textarea.val()) + '<br>z';
            expander.text(value);
            expander.css('width', textarea.innerWidth() + 2 + 'px');
            textarea.css('height', Math.max(expander.innerHeight(), initialHeight) + 2 + 'px');
          }, 100); // throttle by 100ms 
        }
 
        // Bind sizer to IE 9+'s input event and Safari's propertychange event
        textarea.on('input.autogrow propertychange.autogrow', sizeTextarea);
 
        // Set the initial size
        sizeTextarea();
 
        // Record autogrow applied
        textarea.data('autogrow-applied', true);
      }
    });
  };
}(jQuery));