/*
(function($) {

  $(document).ready(function(e) {
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
      }
    };

    // Clean this up
    if( isMobile.any() ) {
      $('body').addClass('is-mobile');
    }

	var ids_id = $('#transcription-asset-wrapper').attr('data-idsid');
	var ids = $('#containerIDS').ids({
		idsid: ids_id,
		//container: 'containerIDS',
		idsButtonPath: '/transcribe/transcribr_site/',
		rotation: 0,
		fullscreen: false,
		onComplete: function() {
			var obj = this.get(0); // Get the dom-object

			// Replace the button states with single states
			var ipaths = ['zoomout', 'zoomin', 'home', 'fullpage', 'rotate', 'help'];
			var butts = $('span', obj);
			$('span', obj).parent().css({'top':'5px', 'left':'5px', 'height':'46px', 'width':'300px'});

			var nav_buttons = $('span', obj).eq(0).children('span').children();
			nav_buttons.addClass('trans-asset-tools').empty();
			for (var i = 0; i < nav_buttons.length; i++){
			  var image = '<img src="' + this.options.idsButtonPath + ipaths[i] + '.png" height="46px" width="46px" alt="' + ipaths[i] + '"/>';
			  //$(nav_buttons[i]).attr('id', 'ids_' + ipaths[i]).append(image);
			  if (ipaths[i] == 'home') {
			    $(nav_buttons[i]).attr('title', 'Reset');
			  }
			  $(nav_buttons[i]).append(image);
			}
		},
		customControls: {
			'help': {img: 'help.png', title: 'Help', exec: idsHelp, closeFullScreen:true}
		}
	});

    if ('setDragEvents' in Drupal.settings.transcribr_site) {
    } else {
      Drupal.settings.transcribr_site.setDragEvents = {};
    }
    
})(jQuery);

function idsReload(id) {
  window.ids.idsLoad();
}
*/