
jQuery(document).ready(function($) {

	$('.selectpicker').selectpicker({
		style: 'btn-info',
		width: '26em',
		size: 8
	});

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-29104270-1']);
	_gaq.push(['_gat._forceSSL']);
	_gaq.push(['_trackPageview']);

	(function () {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();

	(function(w,d,s,l,i){
		w[l]=w[l]||[];
		w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
		var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
		j.async=true;
		j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;
		f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-WPXQFP');

	// For Pinboard theme
	$('#access .menu > li > a').each(function() {
		var title = $(this).attr('title');
		if(typeof title !== 'undefined' && title !== false) {
			$(this).append('<br /> <span>'+title+'</span>');
			$(this).removeAttr('title');
		}
	});
	function pinboard_move_elements(container) {
		if( container.hasClass('onecol') ) {
			var thumb = $('.entry-thumbnail', container);
			if('undefined' !== typeof thumb)
				$('.entry-container', container).before(thumb);
			var video = $('.entry-attachment', container);
			if('undefined' !== typeof video)
				$('.entry-container', container).before(video);
			var gallery = $('.post-gallery', container);
			if('undefined' !== typeof gallery)
				$('.entry-container', container).before(gallery);
			var meta = $('.entry-meta', container);
			if('undefined' !== typeof meta)
				$('.entry-container', container).after(meta);
		}
	}
	function pinboard_restore_elements(container) {
		if( container.hasClass('onecol') ) {
			var thumb = $('.entry-thumbnail', container);
			if('undefined' !== typeof thumb)
				$('.entry-header', container).after(thumb);
			var video = $('.entry-attachment', container);
			if('undefined' !== typeof video)
				$('.entry-header', container).after(video);
			var gallery = $('.post-gallery', container);
			if('undefined' !== typeof gallery)
				$('.entry-header', container).after(gallery);
			var meta = $('.entry-meta', container);
			if('undefined' !== typeof meta)
				$('.entry-header', container).append(meta);
			else
				$('.entry-header', container).html(meta.html());
		}
	}

	if( ($(window).width() > 960) || ($(document).width() > 960) ) {
		// Viewport is greater than tablet: portrait
	} else {
		$('#content .hentry').each(function() {
			pinboard_move_elements($(this));
		});
	}
	$(window).resize(function() {

		if( ($(window).width() > 960) || ($(document).width() > 960) ) {
			$('.page-template-template-full-width-php #content .hentry, .page-template-template-blog-full-width-php #content .hentry, .page-template-template-blog-four-col-php #content .hentry').each(function() {
				pinboard_restore_elements($(this));
			});
		} else {
			$('#content .hentry').each(function() {
				pinboard_move_elements($(this));
			});
		}

		if( ($(window).width() > 760) || ($(document).width() > 760) ) {
			var maxh = 0;
			$('#access .menu > li > a').each(function() {
				if(parseInt($(this).css('height'))>maxh) {
					maxh = parseInt($(this).css('height'));
				}
			});
			$('#access .menu > li > a').css('height', maxh);
		} else {
			$('#access .menu > li > a').css('height', 'auto');
		}
	});

	if( ($(window).width() > 760) || ($(document).width() > 760) ) {
		var maxh = 0;
		$('#access .menu > li > a').each(function() {
			var title = $(this).attr('title');
			if(typeof title !== 'undefined' && title !== false) {
				$(this).append('<br /> <span>'+title+'</span>');
				$(this).removeAttr('title');
			}
			if(parseInt($(this).css('height'))>maxh) {
				maxh = parseInt($(this).css('height'));
			}
		});
		$('#access .menu > li > a').css('height', maxh);
		$('#access li').mouseenter(function() {
			$(this).children('ul').css('display', 'none').stop(true, true).fadeIn(250).css('display', 'block').children('ul').css('display', 'none');
		});
		$('#access li').mouseleave(function() {
			$(this).children('ul').stop(true, true).fadeOut(250).css('display', 'block');
		});
	} else {

		//$('#access').hide();
		$( ".nav-show" ).click(function(e) {
			$('#access').toggle();
		});
		$('#access li').each(function() {
			if($(this).children('ul').length)
				$(this).append('<span class="drop-down-toggle"><span class="drop-down-arrow"></span></span>');
		});
		$('.drop-down-toggle').click(function() {
			$(this).parent().children('ul').slideToggle(250);
		});
		
	}


	// Returns width of HTML document
	var docWidth = $( document ).width();
	var frameWidth = docWidth * .85;
	var logoWidth = (frameWidth * .068) + 180;
	var pixelsRemaining = frameWidth - logoWidth;
	var widthRemaining = (pixelsRemaining / frameWidth) * 100;
	var siteTitleWidth = Math.floor(widthRemaining) - 4;

	//$( document ).width() * .85 // total width
	//console.log( Math.floor(widthRemaining) );
	$( "#site-description" ).css( "width", siteTitleWidth+"%" );

	var menuLength = $('ul#menu-topbar.menu').width();
	var menuBarLength = $('div.menu-topbar-container').width();
	if (menuLength < menuBarLength) {
		var menuRemaining = (menuLength / menuBarLength) * 100;
		var menuWidth = Math.floor(menuRemaining)+2;
		$('div#menu-topbar-wrapper').css( "width", menuWidth+"%" );
	}

	// slide feed and search controls
	var HOSTDOMAIN = window.location.hostname;
	var CDMHOSTDOMAIN = HOSTDOMAIN == "localhost" ? "cdm16007.contentdm.oclc.org" : "www.ohiomemory.org";

	var feedUrl = "http://www.ohiohistoryhost.org/ohiomemory/feed";
	var request = new XMLHttpRequest();
	request.open('GET', feedUrl, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {

			parser = new DOMParser();
			xmlDoc = parser.parseFromString(request.responseText,"text/xml");

			var items = xmlDoc.getElementsByTagName("item");
			var count = items.length
			var allHTML = '';
			for (i = 0; i < count ;i++) {

			    var itemTitle = xmlDoc.getElementsByTagName("item")[i].getElementsByTagName("title")[0].textContent;
			    var itemLink = xmlDoc.getElementsByTagName("item")[i].getElementsByTagName("link")[0].textContent;
			    var itemDesc = xmlDoc.getElementsByTagName("item")[i].getElementsByTagName("description")[0].textContent;
			    itemDescShort = itemDesc.substr(0, 290);
			    var itemImgSrc = xmlDoc.getElementsByTagName("item")[i].getElementsByTagName("enclosure")[0].getAttribute('url');

				allHTML += '<li style="height:400px;background: url(' + itemImgSrc + '">' +
							'<div style="background: rgba(0,0,0,.7);">' +
			    			'<p class="caption-title"><br/>' + itemTitle + '</p>' +
			    			'<p class="flex-caption">' +
			    			decodeURI(itemDescShort.replace("/(.* ).*/", "$1")) + ' ... <a href="' + itemLink + '" class="more">more</a></p>' +
			    			'</div>' +
			    			'</li>';

			}
			//console.log(allHTML);
			document.getElementsByClassName("slides")[0].innerHTML = allHTML;
			console.log('images loaded');
			request.abort();
			console.log('flexloader firing');
			$('.flexslider').flexslider({
				animation: "slide",
				animationLoop: false,
				smoothHeight: false,
				slideshow: false,
				nextText: "",
				prevText: "",
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		} else {
			// We reached our target server, but it returned an error
		}
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();

	

	$( "#searchForm" ).submit(function(event) {
		event.preventDefault();

		var mode = "all";
		var searchterms = $('#searchTerms').val();
		if (searchterms.substring(0,1) == '"') {
		  mode = "exact";
		}

		var fullTextVals = "artifact* picture manuscript* object* specimen* video"
		var noFullText = false;

		if ($('input[name=fulltext]:checked', '#searchForm').val() != undefined) {
			noFullText = true;
		}

		var allVals = "";
		allVals = $("#selectFormats").val();

		var formatsChosen = false;
		if (allVals != null) {
		  formatsChosen = true;
		  $('#restrict_options').text(allVals.length + " formats chosen");
		  var searchFormatValues = '';
		  for (var i=0;i<allVals.length;i++) {
		    searchFormatValues += allVals[i]  + ' ';
		  }
		} else {
		  $('#restrict_options').text("All formats");
		}

		// http://www.ohiomemory.org/cdm/search/searchterm/pottery!picture/field/all!format/mode/all!all/conn/and!and
		var gotostring =  "http://www.ohiomemory.org/digital/search"
		                  + '/searchterm/' + escape(searchterms) + (noFullText ? '!' + escape(fullTextVals) : '') + (formatsChosen ? '!' + escape(searchFormatValues) : '')
		                  + '/field/all' + (noFullText ? '!format' : '') + (formatsChosen ? '!format' : '')
		                  + '/mode/' + mode + (noFullText ? '!any' : '') + (formatsChosen ? '!any' : '')
		                  + '/conn/and' + (noFullText ? '!and' : '') + (formatsChosen ? '!and' : '');

		location.href = gotostring;

	});

	$('a#restrict-msg').on('click', function(e){
		if( $('input#ft-yes').is(':checked') ){
			$('input#ft-yes').prop('checked', false);
		}else{
			$('input#ft-yes').prop('checked', true);
		}
		return false;
	});

	 //"div, span, p.myClass"  a#input#ft-yes
	$('a#input#ft-yes').on('change', function(e){

		if( $('input#ft-yes').is(':checked') ){
			$('input#ft-yes').prop('checked', false);


		}else{
			$('input#ft-yes').prop('checked', true);

		}

	});


});
