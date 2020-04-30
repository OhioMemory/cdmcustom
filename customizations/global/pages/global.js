// Redirect from branded name alias to p#####coll##
(function(){
	document.addEventListener('cdm-app:ready', function() {
		// List out the branded aliases and the p#####coll## collections they will redirect to
		const brandedCollObj = { archaeology: "p267401coll7", ewing: "p16007coll19", harding: "p16007coll100", hayes: "p16007coll67", munroe: "p16007coll15", ohioguide: "p267401coll34", osj: "p16007coll22", selections: "p267401coll32", test: "p15005coll5", wwi: "p16007coll51", zoar: "p16007coll10" };
		brandedCollsList = Object.keys(brandedCollObj).join();
		var inUrl = window.location.href;
		var urlCollPart = inUrl.replace(/^.*?collection\/(.*?)(\/\w.*|$)/, '$1');
		if ( brandedCollsList.includes(urlCollPart) ) {
			var reUrlCollPart = new RegExp(urlCollPart);
			window.location.href = inUrl.replace(reUrlCollPart, brandedCollObj[urlCollPart]);
		}
	});
})();

// subscribe to the homepage ready event
document.addEventListener('cdm-home-page:ready', function(e){
	// console.log('ready: ' + e.detail);
	// console.log(e);
});

document.addEventListener('cdm-home-page:update', function(e){
	// console.log('ready: ' + e.detail);
	// console.log(e);
});

document.addEventListener('cdm-item-page:enter', function(e){
	// e is instance of CustomEvent
	// console.log('cdm-item-page:enter');
	// console.log(e.srcElement.children.children[0].children[2].children[0].children[1].children[0].children[1].children[1].children[1].children[1].children[0].children[0].value);

});
document.addEventListener('cdm-item-page:ready', function(e){
	// e is instance of CustomEvent
	// console.log('cdm-item-page:enter');
	// console.log(e);
	var inputText = document.getElementsByClassName('ItemSearch-itemSearchInputControl')[1].value;

	if (inputText.match(/ OR /)) {
		document.getElementsByClassName('ItemSearch-itemSearchInputControl')[1].value = inputText.replace(/ OR /g, ' ');
	}
});


(function () {

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function (e) {
	        
	        if (e.detail.collectionId == "siebert") { return; }
			// hide full text initially
			if (document.getElementById("compoundItemTranscript") != null) {

				if ( document.getElementById('compoundItemTranscript').getAttribute("aria-hidden") == "false" ) {
					document.getElementsByClassName('panel-title')[0].firstChild.click();
				}
				
			}

	    });
	}
	
    var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
	cdmEvents.forEach(startEventListener);

})();

/*(function () {

	document.addEventListener('cdm-item-page:update', function(e){

		// hide full text initially
		console.log( e.detail.collectionId);
		if (document.getElementById("compoundItemTranscript") != null && e.detail.collectionId != 'siebert') {

			if ( document.getElementById('compoundItemTranscript').getAttribute("aria-hidden") == "false" ) {
				document.getElementsByClassName('panel-title')[0].firstChild.click();
			}
			
		}

	});

});*/

document.addEventListener('cdm-search-page:enter', function(e){

	//console.log("cdm-search-page:update");
	//console.log(e);

});

document.addEventListener('cdm-search-page:ready', function(e){

	//console.log("cdm-search-page:update");
	//console.log(e);

});

document.addEventListener('cdm-search-page:update', function(e){

	//console.log("cdm-search-page:update");
	//console.log(e);

});

document.addEventListener('cdm-collection-landing-page:enter', function(e){

});


document.addEventListener('cdm-collection-landing-page:ready', function(e){

	//console.log("cdm-collection-landing-page:ready");
	//console.log(e);


	/*document.getElementsByClassName("SimpleSearch-headerAdvancedSearchButtonLink")[0].addEventListener("click", function(){
		console.log("cdm-collection-landing-page:ready");
	});*/

	/*const pageViewElem = elFactory('style', { id: 'headerTitleDisplay' }, 'View all pages');
	document.querySelector('style').textContent += ".Header-titleText { display: none; }";*/

});

document.addEventListener('cdm-collection-landing-page:update', function(e){
	//console.log("cdm-collection-landing-page:ready");
	//console.log(e);

});

/**
 * Close all facet nodes initially
 */
document.addEventListener('cdm-collection-search-page:ready', function(e){

	var facetNodes = document.getElementsByClassName("panel-title");
	for (i=1; i<facetNodes.length; i++) {
		if (facetNodes[i].firstChild.getAttribute("aria-label").includes("close")) {
			facetNodes[i].firstChild.click();
		}
	}

});

document.addEventListener('cdm-collection-search-page:update', function(e){

	//console.log("cdm-collection-search-page:update");
	//console.log(e);

});

// logo redirects
(function() {

	'use strict';
	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){

			const homesites =	{
									p16007coll88: "https://www.toledolibrary.org/digitalcollections-categories", 
									p16007coll31: "https://www.toledolibrary.org/digitalcollections-categories", 
									p16007coll33: "https://www.toledolibrary.org/digitalcollections-categories", 
									p16007coll77: "https://www.toledolibrary.org/digitalcollections-categories" 
								}
			
		    if (homesites[e.detail.collectionId] !== undefined) {
		    	var headerLogo = document.querySelector('div.Header-logoHolder>div>a');
				headerLogo.addEventListener('click', function(mouseevent) {
					location.href = homesites[e.detail.collectionId];
				});
		    }
				
		});
	}

	var cdmEvents = ['cdm-custom-page:ready', 'cdm-custom-page:update', 'cdm-collection-landing-page:ready', 'cdm-collection-landing-page:update', 'cdm-collection-search-page:ready', 'cdm-collection-search-page:update', 'cdm-search-page:ready', 'cdm-search-page:update', 'cdm-item-page:ready', 'cdm-item-page:update'];
	cdmEvents.forEach(startEventListener);

})();


/**
 * Custom pages for main landing page (default), 
 * @param  {[type]} e){	switch (e.detail.filename) {		case 'cropimage':			var pageHead [description]
 * @return {[type]}             [description]
 */
document.addEventListener('cdm-custom-page:ready', function(e){
	// e is instance of CustomEvent
	// ...

	// load resources based on what custom page is requested
	switch (e.detail.filename) {
		case 'cropimage':
			var pageHead = (e.srcElement||e.target).head;
			[
			  '/customizations/global/pages/cropimage_resources/cropper.min.js',
			  '/customizations/global/pages/cropimage_resources/cropimage.js'
			].forEach(function(src) {
			  var script = document.createElement('script');
			  script.src = src;
			  script.async = false;
			  pageHead.appendChild(script);
			});
			break;
		case 'browse':
			ScriptLoader('/customizations/global/pages/browse_resources/imageMapResizer.min.js', function() {
				ScriptLoader('/customizations/global/pages/browse_resources/browse.js', function() {
					
				});
			});
			break;
		case 'periods':
			var pageHead = (e.srcElement||e.target).head;
			[
			  '/customizations/global/pages/periods_resources/vis.min.js',
			  '/customizations/global/pages/periods_resources/periods.js'
			].forEach(function(src) {
			  var script = document.createElement('script');
			  script.src = src;
			  script.async = false;
			  pageHead.appendChild(script);
			});
			break;
		case 'periods_test':
			var pageHead = (e.srcElement||e.target).head;
			[
			  '/customizations/global/pages/periods_resources/vis.min.js',
			  '/customizations/global/pages/periods_resources/periods_test.js'
			].forEach(function(src) {
			  var script = document.createElement('script');
			  script.src = src;
			  script.async = false;
			  pageHead.appendChild(script);
			});
			break;
		default:
			ScriptLoader('/customizations/global/pages/homepage_resources/jquery.min.js', function() {
				ScriptLoader('/customizations/global/pages/homepage_resources/jquery.smartmenus.js', function() {
					ScriptLoader('/customizations/global/pages/homepage_resources/bootstrap.min.js', function() {
						ScriptLoader('/customizations/global/pages/homepage_resources/bootstrap-select.min.js', function() {
							ScriptLoader('/customizations/global/pages/homepage_resources/jquery.flexslider-min.js', function() {
								ScriptLoader('/customizations/global/pages/homepage_resources/jquery.easing.1.3.min.js', function() {
									ScriptLoader('/customizations/global/pages/homepage_resources/homepage.js', function() {
										ScriptLoader('https://www.google-analytics.com/ga.js', function() {
											$('#main-menu').smartmenus();
											$('.selectpicker').selectpicker({
												style: 'btn-info',
												size: 8
											});
										});
									});
								});
							});
						});
					});
				});
			});
				
	}
});

/**
 * Custom pages for main landing page (default), 
 * @param  {[type]} e){	switch (e.detail.filename) {		case 'cropimage':			var pageHead [description]
 * @return {[type]}             [description]
 */
document.addEventListener('cdm-custom-page:update', function(e){

	switch (e.detail.filename) {

		case 'browse':
			var body = document.getElementsByTagName('body')[0];
			var script = document.createElement("script")
		    script.type = "application/javascript";
			script.src = '/customizations/global/pages/browse_resources/browse.js';
			body.appendChild(script);
			break;
		case 'periods':
			var pageHead = (e.srcElement||e.target).head;
			[
			  '/customizations/global/pages/periods_resources/vis.min.js',
			  '/customizations/global/pages/periods_resources/periods.js'
			].forEach(function(src) {
			  var script = document.createElement('script');
			  script.src = src;
			  script.async = false;
			  pageHead.appendChild(script);
			});
			break;
		default:
			ScriptLoader('/customizations/global/pages/homepage_resources/jquery.min.js', function() {
				ScriptLoader('/customizations/global/pages/homepage_resources/jquery.smartmenus.js', function() {
					ScriptLoader('/customizations/global/pages/homepage_resources/bootstrap.min.js', function() {
						ScriptLoader('/customizations/global/pages/homepage_resources/bootstrap-select.min.js', function() {
							ScriptLoader('/customizations/global/pages/homepage_resources/jquery.flexslider-min.js', function() {
								ScriptLoader('/customizations/global/pages/homepage_resources/jquery.easing.1.3.min.js', function() {
									ScriptLoader('/customizations/global/pages/homepage_resources/homepage.js', function() {
										ScriptLoader('https://www.google-analytics.com/ga.js', function() {
											$('#main-menu').smartmenus();
											$('.selectpicker').selectpicker({
												style: 'btn-info',
												size: 8
											});
										});
									});
								});
							});
						});
					});
				});
			});
	}
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function ScriptLoader(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function() {
            if (script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 *  Crop function for item view page
 */	
(function () {	
		
	function openCropWindow(coll, ptr) {
		var page_url = 'https://ohiomemory.org/digital/custom/cropimage?alias=' + coll + '&ptr=' + ptr;
		window.open(page_url, "clipWindow", "location=1,status=1,toolbar=1,menubar=1,scrollbars=1,width=1100,height=1000");
	}

	function setupCropTool(currentImageElement, collAlias) {

		ScriptLoader('/customizations/global/pages/cropimage_resources/cropper.min.js', function() {
			ScriptLoader('/customizations/global/pages/cropimage_resources/cropimage.js', function() {

				if (currentImageElement === null) {
					return false;
				}
				if (document.getElementById("crop") !== null) {
					document.getElementById("crop").remove();
				}
				var img_src_str = currentImageElement.getAttribute('src');
				var img_id = img_src_str.split("/")[6];
				var page_url = 'https://ohiomemory.org/digital/custom/cropimage?alias=' + collAlias + '&ptr=' + img_id;
				var page_win = "clipWindow";
				var page_size = "location=1,status=1,toolbar=1,menubar=1,scrollbars=1,width=1100,height=1000";

				var newButton = document.createElement("div");
				newButton.setAttribute('class', 'btn-group');
				var span_str = '<span class="fa fa-crop fa-2x"></span>';
				var button_str = '<button onclick="window.open(\''+page_url+'\',\''+page_win+'\',\''+page_size+'\');return false;" id="crop" class="cdm-btn btn btn-primary" type="button" role="button" title="Crop" aria-label="Crop" aria-haspopup="true" aria-expanded="false">'+ span_str+'</button>';

				newButton.innerHTML =  button_str;

				var offsetheight = document.getElementsByClassName('btn-toolbar pull-right')[1].offsetHeight;
				if (offsetheight > 0) {
					var targetElem = document.getElementsByClassName('btn-toolbar pull-right')[1];
				} else {
					var targetElem = document.getElementsByClassName('btn-toolbar pull-right')[0];
				}
				targetElem.insertBefore(newButton, targetElem.firstElementChild);

			});
		});

	}

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function (e) {
	        setupCropTool(document.querySelector('.ItemImage-itemImage img'), e.detail.collectionId);
	    });
	}
	
    var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
	cdmEvents.forEach(startEventListener);

})();


/**
 * Replace print button action
 */
(function () {

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){
			// don't take siebert - PDFs were created along with tiffs
			if ("siebert".match(e.detail.collectionId) !== null) { return; }
		  	// don't use openseadragon for PDFs
    		if (document.getElementsByClassName("ItemPDF-itemImage").length > 0) {
    			//document.getElementsByClassName("ItemPreview-container")[0].style.visibility = "visible";
    			return;
    		}
    		if (document.querySelector(".ItemImage-itemImage div img") === null) {
    			return;
    		}
	  		var coll = e.detail.collectionId;
	  		var item = e.detail.itemId;
	  		if (document.getElementsByClassName("CompoundItemView-selectedCompoundItem").length > 0) {
	  			item = document.getElementsByClassName("CompoundItemView-selectedCompoundItem")[1].firstChild.firstChild.src.replace(/.*?\/id\/(.*?)\/thumbnail/, '$1');
	  		}

	  		var imgWidth = document.querySelector(".ItemImage-itemImage div img").width;
	  		var imgHeight = document.querySelector(".ItemImage-itemImage div img").height;
	  		var imgSize = imgWidth > imgHeight ? "600,880" : "600,880";

	  		var itemUrl = 'https://ohiomemory.org/digital/collection/' + coll + '/id/' + item;
	  		var iiifUrl = 'https://ohiomemory.org/digital/iiif/' + coll + '/' + item + '/full/' + imgSize + '/0/default.jpg';
	  		var itemTitle = document.getElementsByClassName("ItemTitle-primaryTitle")[0].innerText;
		    // change action of print button
		    document.getElementsByClassName("fa fa-print fa-2x")[1].parentElement.addEventListener('click', function(e) {
		    	e.stopPropagation();
		    	function ImagetoPrint(iiifUrl, itemUrl, itemTitle)
			    {
			        return "<html><head><scri"+"pt>" +
			                '</scri' + 'pt></head><body style="font-family:Arial,Helvetica,Verdana,sans-serif;font-size: 90%;">' + 
			                '<strong style="font-size: large;">' + itemTitle + '</strong><br/>' + 
			                '<div>Reference URL: ' + itemUrl + '</div>' + 
			                '<div style="padding-bottom:10px"><a href="#" onclick="window.print();return false;">&#128438; Print this image</a></div>' + 
			                "<div><img src='" + iiifUrl + "' /></div></body></html>";
			    }
		        var Pagelink = "";
		        var pwa = window.open(Pagelink, "_new");
		        pwa.document.open("text/html", "replace");
		        pwa.document.write(ImagetoPrint(iiifUrl, itemUrl, itemTitle));
		        pwa.document.close();
		    });
			
	  	});
	}

  	var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
	cdmEvents.forEach(startEventListener);

})();

/**
 * Create a control to display Reference URLs for an item record
 */
(function () {

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){

				// remove CONTENTdm default of page-level the filename
            	if (document.getElementsByClassName("ItemTitle-secondaryTitle").length > 0) {
            		//document.getElementsByClassName("ItemTitle-secondaryTitle")[0].remove();
            		document.getElementsByClassName("ItemTitle-secondaryTitle")[0].className += " hide";
            	}
            	// remove all previous instances of the container block for reference URLs
            	var refContainers = document.querySelectorAll('.refContainer');
				for (var i = 0; i < refContainers.length; ++i) {
				  refContainers[i].remove();
				}
	            
				// get the record-level and item-level IDs for reference URLs using CDM API
				var request = new XMLHttpRequest();
				request.open('GET', location.protocol + '//' + location.hostname + '/digital/bl/dmwebservices/index.php?q=GetParent/' + e.detail.collectionId + '/' + e.detail.itemId + '/json', true);
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						
						// create the container div
						var itemTitleContainer = document.getElementsByClassName("ItemView-itemTitle")[0];
						// var itemTitleContainer = document.getElementsByClassName("CompoundItemPagination-container")[0]; 
			            var refContainer = document.createElement("div");
			            refContainer.setAttribute("class", "refContainer");
			            itemTitleContainer.append(refContainer);
			            var refUrl = document.createElement("div");
			            refUrl.setAttribute("id", "refUrl");
			            refUrl.setAttribute("class", "refStyle");
			            refUrl.innerHTML = 'Show Reference URL';
			            refContainer.append(refUrl);
						
						// defaults data for URLs
						var urlStem = 'https://ohiomemory.org/digital/collection/' + e.detail.collectionId;
						var objectUrl = urlStem+ '/id/' + e.detail.itemId;
						var pageUrl = urlStem + '/id/' + e.detail.itemId;

						// change the object-level URL if different
						var ret = JSON.parse(request.responseText);
						if (ret.parent > -1) {
							objectUrl = urlStem + '/id/' + ret.parent;
						}

						// create elements with object- and page-level URLs
						var refDiv = document.createElement("div");
			            refDiv.setAttribute("id", "refDiv");
			            refDiv.setAttribute("class", "refDivStyle");
			            refDiv.innerHTML = '<p class="formfield">' + 
												'<label for="input">&nbsp;&nbsp;&nbsp;Entire object: </label>' + 
												'<input name="message" class="ref-input-css" onclick="this.select()" value="' + objectUrl + '"></input>' + 
											'</p>' + 
											'<p class="formfield">' + 
												'<label for="input">&nbsp;&nbsp;Specific page: </label>' + 
												'<input name="message" class="ref-input-css" onclick="this.select()" value="' + pageUrl + '"></input>' + 
											'</p>';
						refContainer.append(refDiv);
						refDiv.style.display = "none";

						// event listener for Hide/Show Reference URL link
						refUrl.addEventListener('click', function() {
							var x = document.getElementById("refDiv");
							  if (x.style.display === "none") {
							    x.style.display = "block";
							    document.getElementById("refUrl").innerHTML = 'Hide Reference URL';
							  } else {
							    x.style.display = "none";
							    document.getElementById("refUrl").innerHTML = 'Show Reference URL';
							  }
						});


					} else { } // else: reached target but returned an error
			    };
			    request.onerror = function() { }; // connection error
			    request.send();	

		});
	}

	var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
	cdmEvents.forEach(startEventListener);
	
})();


/**
 * Side-by-side transcription viewer
 */
(function () {

	function startEventListener(cdmEvent) {
		
		document.addEventListener(cdmEvent, function(e){

			if (document.getElementById("view-transcript") !== null) {
				document.getElementById("view-transcript").remove();
			}

			if (document.getElementsByClassName("ItemText-container")[0] === undefined) { return; }			

			var itemTitleContainer = document.getElementsByClassName("ItemView-itemTitle")[0];
			var refContainer = document.getElementsByClassName("refContainer")[0];
            var viewTranscript = document.createElement("div");

            viewTranscript.setAttribute("class", "viewTranscript");
            viewTranscript.setAttribute("id", "view-transcript");
            viewTranscript.innerHTML = 'View Transcript';
            itemTitleContainer.append(viewTranscript);

            viewTranscript.addEventListener('click', function() {

            	// get the record-level and item-level IDs for reference URLs using CDM API
				var request = new XMLHttpRequest();
				var item_src_str = "";
				var displayItemId = "";
				if (document.querySelector('.ItemImage-itemImage img') !== null) {
					item_src_str = document.querySelector('.ItemImage-itemImage img').getAttribute('src');
					displayItemId = item_src_str.split("/")[6];
				} 
				if (document.querySelector('audio') !== null) {
					displayItemId = window.location.href.split("/")[7];
				}
				if (document.querySelector('tr.field-type td.field-value') != null && document.querySelector('tr.field-type td.field-value').innerText == 'MovingImage') {
					// https://ohiomemory.org/digital/collection/p15005coll4/id/77
					displayItemId = document.getElementsByClassName("ref-input-css")[1].value.split("/")[7];
				}

				request.open('GET', location.protocol + '//' + location.hostname + '/digital/bl/dmwebservices/index.php?q=GetParent/' + e.detail.collectionId + '/' + displayItemId + '/json', true);
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						
						// change the object-level URL if different
						var objectIdNum = displayItemId;
						var ret = JSON.parse(request.responseText);
						if (ret.parent > -1) { objectIdNum = ret.parent; }

						
						var page_url = 'https://ohiomemory.org/customizations/global/pages/transcript/view.html?alias=' + e.detail.collectionId + '&ptr=' + objectIdNum + '&pg=' + displayItemId;
						if (document.querySelector('audio') !== null || (document.querySelector('tr.field-type td.field-value') != null && document.querySelector('tr.field-type td.field-value').innerText == 'MovingImage') ) { 
							page_url = 'https://ohiomemory.org/customizations/global/pages/transcript/audioview.html?alias=' + e.detail.collectionId + '&ptr=' + objectIdNum + '&pg=' + displayItemId; 
						}
						window.open(page_url, "TranscriptWindow", "location=1,status=1,toolbar=1,menubar=1,scrollbars=1,width=1100,height=1000");
					
					} else { } // else: reached target but returned an error
				};
				request.onerror = function() { }; // connection error
				request.send();
				
			});

		});
		
	}
	
	var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
	cdmEvents.forEach(startEventListener);
	
})();

/**
 * Google Analytics and Terms of Use need to be included for every event
 */
(function () {

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){
			if (document.getElementById("trademark") !== null) {
				document.getElementById("trademark").innerHTML = 'Powered by <a style="font-weight:bold" href="http://www.oclc.org/en-US/contentdm.html">CONTENTdm®</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="font-weight:bold" href="https://ohiomemory.ohiohistory.org/about-ohio-memory/terms-of-use">Terms of Use</a>';
			}
			ScriptLoader('https://ohiomemory.org/customizations/global/pages/ga_resources/ga.js', function() {
			});
		});
	}

	var cdmEvents = ['cdm-custom-page:ready', 'cdm-custom-page:update', 'cdm-collection-landing-page:ready', 'cdm-collection-landing-page:update', 'cdm-collection-search-page:ready', 'cdm-collection-search-page:update', 'cdm-search-page:ready', 'cdm-search-page:update', 'cdm-item-page:ready', 'cdm-item-page:update'];

	cdmEvents.forEach(startEventListener);

})();

// advanced search window
(function () {

	function setupAdvancedModal(coll, urlstring) {
		if ( urlstring.indexOf("searchterm") > -1 ) {
			sessionStorage.setItem('lastSearchUrl', urlstring);
		}
		ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/tingle/0.13.2/tingle.js', function(){
			var urlpath = urlstring.replace(/^.*?digital\//, '');
			if (document.getElementsByClassName("advanced-modal").length > 0) { 
				document.getElementsByClassName("advanced-modal")[0].parentNode.removeChild( document.getElementsByClassName("advanced-modal")[0] ); 
			}
			var advSearchContent = new tingle.modal( {cssClass: ['advanced-modal'] });
		    var advLink = document.querySelector('.SimpleSearch-headerAdvancedSearchButtonLink');
		    advLink.addEventListener('click', function(){
		        advSearchContent.open(); 
		    });
		    advSearchContent.setContent('<iframe id="advSearchFrame" src="/customizations/global/pages/advancedsearch_resources/advanced_search.html?' + coll + '&' + urlpath + '" width="100%" height="540px" scrolling="yes" frameBorder="0" style="border:none;"></iframe>'); 
			document.getElementsByClassName("SimpleSearch-headerAdvancedSearchButtonLink")[0].addEventListener("click", function(e){
				e.stopPropagation();
				e.preventDefault();
			});
		});
	}

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){
			setupAdvancedModal(e.detail.collectionId, e.target.URL);
		});
	}

	var cdmEvents = ['cdm-custom-page:ready', 'cdm-custom-page:update', 'cdm-collection-landing-page:ready', 'cdm-collection-landing-page:update', 'cdm-collection-search-page:ready', 'cdm-collection-search-page:update', 'cdm-search-page:ready', 'cdm-search-page:update', 'cdm-item-page:ready', 'cdm-item-page:update'];

	cdmEvents.forEach(startEventListener);

})();


/**
 * Replace default viewer with alternative viewer (OpenSeadragon)
 */
(function () {

	function CustomImageView(container, imgsrc, collectionId, imageId, objArray) {
		
		// get the terms to highlight, if any
    	if (imgsrc.replace(/^.*highlightTerms=(.*)$/, "$1").length > 0) {
    		var highlightedTerms = imgsrc.replace(/^.*highlightTerms=(.*)$/, "$1");
    	}
		var levelsArray = [];
		Object.keys(objArray.sizes).forEach(function(key,index) {
    		var levelsObject = { 
    			url: 'https://ohiomemory.org/digital/iiif/' + collectionId + '/' + imageId + '/full/' + objArray.sizes[index].width + ',/0/default.jpg?highlightTerms=' + highlightedTerms,
    			height: objArray.sizes[index].height,
    			width: objArray.sizes[index].width
    		}
    		levelsArray.push(levelsObject);
    	});
    	//console.log(levelsArray);
		ScriptLoader('https://ohiomemory.org/customizations/global/pages/openseadragon_resources/openseadragon.min.js', function(){
        	
        	container.firstChild.className += ' hide';
        	var zoomContainers = document.getElementsByClassName("zoomView");
	    	if (document.getElementsByClassName("zoomView").length > 0) {
	    		Array.prototype.forEach.call(zoomContainers, function(el) { el.parentNode.removeChild(el); });
	    		document.getElementsByClassName("preview")[0].firstElementChild.removeAttribute("class");
	    	}
            
            var openseadragonContainer = document.createElement("div");
            openseadragonContainer.setAttribute("id", "zoomDiv");
            openseadragonContainer.setAttribute("class", "zoomView");
            openseadragonContainer.setAttribute("style", "height:100vh;width:100%");

            container.parentNode.insertBefore(openseadragonContainer, container);
            var viewer = OpenSeadragon({
		        id: "zoomDiv",
		        prefixUrl: "https://ohiomemory.org/customizations/global/pages/openseadragon_resources/images/",
		        tileSources: [{
		        	type: 'legacy-image-pyramid',
		         	levels: levelsArray,
		        }],
		        showRotationControl: true,
		        showNavigator: false
		    });
		    var odcStyle = openseadragonContainer.firstChild.firstChild.getAttribute("style");
		    openseadragonContainer.firstChild.firstChild.setAttribute("style", odcStyle + "outline:0");
		    //var previewContainerStyle = openseadragonContainer.parent.getAttribute("style");

		    //openseadragonContainer.parent.setAttribute("style", "visibility:visible !important");
		    //openseadragonContainer.parent.style.display = 'visibility:visible !important';
		    document.getElementsByClassName('ItemPreview-container')[0].style.visibility = "visible !important";
		    
		});

	}

    function startEventListener(cdmEvent) {
    	document.addEventListener(cdmEvent, function(e){


	    	if (document.getElementsByClassName("zoomView").length > 0) {
	    		var zoomContainers = document.getElementsByClassName("zoomView");
				Array.prototype.forEach.call(zoomContainers, function(el) { el.parentNode.removeChild(el); });
	    	}

    		// doon't use openseadragon for mobile
    		if (window.innerWidth < 760) {
    			document.getElementsByClassName("ItemPreview-container")[0].style.visibility = "visible";
    			return;
    		}

    		// don't use openseadragon for video
    		if (document.getElementsByClassName("field-type")[0] !== undefined && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == 'MovingImage') {
    			document.getElementsByClassName("ItemPreview-container")[0].style.visibility = "visible";
    			return;
    		}
    		// don't use openseadragon for audio
    		if (document.getElementsByClassName("field-type")[0] !== undefined && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == 'Sound') {
    			document.getElementsByClassName("ItemPreview-container")[0].style.visibility = "visible";
    			return;
    		}
    		// don't use openseadragon for PDFs
    		if (document.getElementsByClassName("ItemPDF-itemImage").length > 0) {
    			document.getElementsByClassName("ItemPreview-container")[0].style.visibility = "visible";	
    			return;
    		}
    		// don't use p267401ccp2, State Library of Ohio
    		if (e.detail.collectionId == 'p267401ccp2') {
    			document.getElementsByClassName("ItemPreview-container")[0].style.visibility = "visible";
    			return;
    		}

			var request = new XMLHttpRequest();
			// https://ohiomemory.org/digital/bl/dmwebservices/index.php?q=GetParent/p15005coll5/1466/json
			request.open('GET', location.protocol + '//' + location.hostname + '/digital/bl/dmwebservices/index.php?q=GetParent/' + e.detail.collectionId + '/' + e.detail.itemId + '/json', true);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					var imageId = e.detail.itemId;
					var ret = JSON.parse(request.responseText);
					if (ret.parent < 0 && document.getElementsByClassName("CompoundItemPagination-pageInput").length != 0) {
						imageId = e.detail.itemId - document.getElementsByClassName("CompoundItemPagination-pageInput")[0].getAttribute('max');
					}
					var request2 = new XMLHttpRequest();
				    request2.open('GET', 'https://cdm16007.contentdm.oclc.org/digital/iiif/' + e.detail.collectionId + '/' + imageId + '/info.json', true);
				    request2.onload = function() {
					    if (request2.status >= 200 && request2.status < 400) {
							var objArray = JSON.parse(request2.responseText);
							CustomImageView(document.getElementsByClassName("preview")[0], document.getElementsByClassName("ItemImage-expandButton")[0].parentElement.firstChild.src, e.detail.collectionId, imageId, objArray);
						} else { } // else: reached target but returned an error
					};
					request2.onerror = function() { }; // connection error
				    request2.send();
				} else { } // else: reached target but returned an error
		    };
		    request.onerror = function() { }; // connection error
		    request.send();
			
    	});
    }

    document.addEventListener('cdm-item-page:enter', function(e){

		//console.log("cdm-search-page:update");
		//var lastNum = e.target.images.length - 1;
		//console.log(e.target.images[lastNum].width + ", " + e.target.images[lastNum].height);
		//console.log(e.target.images);

		//addNewStyle('.ItemPreview-container {visibility:visible;}');
		//addNewStyle('.ItemPreview-container {visibility:visible;}');
	//if (e.detail.collectionId == 'p15005coll5') {
		var pageHead = (e.srcElement||e.target).head;
		var script = document.createElement('script');
		var code =  'function addNewStyle(newStyle) {' + 
					'    var styleElement = document.getElementById("styles_js");' + 
					'    if (!styleElement) {' + 
					'        styleElement = document.createElement("style");' + 
					'        styleElement.type = "text/css";' + 
					'        styleElement.id = "styles_js";' + 
					'        document.getElementsByTagName("head")[0].appendChild(styleElement);' + 
					'    }' + 
					'    styleElement.appendChild(document.createTextNode(newStyle));' + 
					'}' + 
					'function waitForElement(selector) {' + 
					'  return new Promise(function(resolve, reject) {' + 
					'    var element = document.querySelector(selector);' + 
					'    if(element) {' + 
					'      resolve(element);' + 
					'      return;' + 
					'    }' + 
					'    var observer = new MutationObserver(function(mutations) {' + 
					'      mutations.forEach(function(mutation) {' + 
					'        var nodes = Array.from(mutation.addedNodes);' + 
					'        for(var node of nodes) {' + 
					'          if(node.matches && node.matches(selector)) {' + 
					'            observer.disconnect();' + 
					'            resolve(node);' + 
					'            return;' + 
					'          }' + 
					'        };' + 
					'      });' + 
					'    });' + 
					'    observer.observe(document.documentElement, { childList: true, subtree: true });' + 
					'  });' + 
					'}' + 
					'addNewStyle(".ItemPreview-container {visibility:hidden;}");' + 
					'waitForElement("#zoomDiv").then(function(element) {' + 
					'  document.getElementById("zoomDiv").parentNode.setAttribute("style", "visibility:visible");' + 
					'});';
		script.appendChild(document.createTextNode(code));
		script.async = false;
		pageHead.appendChild(script);
	//}

	});

    var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
    cdmEvents.forEach(startEventListener);
	
	document.addEventListener('cdm-item-page:leave', function () {
        // unmount or remove current video player from DOM if it is exists
        //var zoomContainers = document.getElementsByClassName("zoomView");
    	//if (document.getElementsByClassName("zoomView").length > 0) {
    	//	var zoomContainers = document.getElementsByClassName("zoomView");
		//	Array.prototype.forEach.call(zoomContainers, function(el) { el.parentNode.removeChild(el); });
		//	document.getElementsByClassName("preview")[0].firstElementChild.removeAttribute("class");
    	//}
    });


})();


// video handler
(function () {

    var currentInstance = null;


    function VimeoAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            if (!url.match(/player/)) {
            	url = url.replace('https://vimeo.com', 'https://player.vimeo.com/video');
            }
            // create iframe for youtube
            var html = '<iframe src="' + url + '" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            resolve(html);
        });
    }    

    function YoutubeAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            url = url.replace('watch?v=', 'embed/');
            // create iframe for youtube
            var html = '<iframe type="text/html" width="640" height="320" src="' + url + '" frameborder="0" allowfullscreen=""></iframe>';
            resolve(html);
        });
    }    

    function KalturaAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            // create iframe for kaltura
            var html = '<div class="videoWrapper"><iframe src="' + url + '" width="560" height="395" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe></div>';
            resolve(html);
        });
    }

    function OhmsAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            // create iframe for kaltura
            var html = '<div class="videoWrapper"><iframe width="100%" scrolling="auto" height="550px" frameborder="0" src="' + url + '"></iframe></div>';
            resolve(html);
        });
    }

    function OhioMemoryAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            //console.log(url);
            var html = '<iframe type="text/html" width="500" height="290" src="' + url + '" frameborder="0" allowfullscreen=""></iframe>';
            resolve(html);
        });
    }

    function YoutuAPI(url) {
        if (!url) {
            return resolve(false);
        }
        url = url.replace('youtu.be/', 'youtube.com/watch?v=');
        return YoutubeAPI(url);
    }

    function NorweldAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            // create iframe for Norweld
            url = url.replace(/http:\/\/media\.norweld\.org/, 'https://a55865c8573dbc244995-bcf9371fc589cc3fb98d8cac2b9b4a59.ssl.cf5.rackcdn.com');
            //console.log(url);
            var html = '<iframe type="text/html" width="640" height="320" src="' + url + '" frameborder="0" allowfullscreen=""></iframe>';
            resolve(html);
        });
    }

    function ToledoAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            // create iframe for Toledo
            url = url.replace(/http:/, '');
            //console.log(url);
            var html = '<iframe type="text/html" width="640" height="320" src="' + decodeURI(url) + '" frameborder="0" allowfullscreen=""></iframe>';
            resolve(html);
        });
    }

    var APIS = {
        'vimeo.com': VimeoAPI,
        'youtu.be': YoutuAPI,
        'resources.ohiohistory.org': OhmsAPI,
        'ohiomemory.ohiohistory.org': OhioMemoryAPI,
        'www.youtube.com': YoutubeAPI,
        'cdnapisec.kaltura.com': KalturaAPI,
        'media.norweld.org' : NorweldAPI,
        'media.toledolibrary.org' : ToledoAPI
    };

    function loadFrame(link) {
        return Promise.resolve(link)
            .then(function (link) {
                var url = new URL(link);
                // find proper api from api list
                const loader = APIS[url.hostname];
                return loader && loader(link);
            })
            .catch(console.warn);
    }

    function CustomVideoView(container) {
    	// document.querySelectorAll("tr[class=ItemMetadata-metadatarow] td span a[href*='norweld']").length > 0

        if (!container) {
            return false;
        }

        var links = [];

        // parse metadata
        var rows = document.querySelectorAll('tr[class*=metadatarow]');

        for (var i = 0; i < rows.length; i++) { 
			if (rows[i].firstChild.textContent === 'Source') {
		        links = links.concat(rows[i].lastChild.textContent.split(','));
		    }
		    if (rows[i].firstChild.textContent === ' 	') {
		        links = links.concat(rows[i].lastChild.textContent.split(','));
		    } 
		}

		if (window.location.href.indexOf("p16007coll33") > 0) {
			links[0] = document.querySelector('.ItemUrl-itemUrlLink a').href;
		}
		//console.log(links);
        // create container for iFrames
        var frameContainer = document.createElement('div');

        var mount = function () {
            var reqs = links.map(function (link) {
                return loadFrame(link);
            });

            Promise.all(reqs)
                .then(function (reps) {
                    // hide original viewer
                    container.className += ' hide';
                    // add each frames to one root
                    reps.forEach(function (embeddedHTML) {
                        embeddedHTML && (frameContainer.innerHTML += embeddedHTML);
                    });
                    // insert it
                    container.parentNode.insertBefore(frameContainer, container);
                });
        };

        var unmount = function () {
            frameContainer.parentNode && frameContainer.parentNode.removeChild(frameContainer);
        };

        mount();

        return {
            unmount: unmount
        };

    }
    
    document.addEventListener('cdm-item-page:ready', function (e) {
    	if (document.getElementsByClassName("field-type")[0] !== undefined && "p16007coll30 p16007coll72 p15005coll27 p15005coll22 p16007coll33 p15005coll37".match(e.detail.collectionId) !== null && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == "MovingImage") {
        	// unmount or remove current video player from DOM if it is exists
        	currentInstance && currentInstance.unmount();
       		// creates a new instance if it is url item and it is from vimeo.com
        	//currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
        	currentInstance = CustomVideoView(document.getElementsByClassName("ItemView-mainColumn")[1].firstChild);
        }
    });

    document.addEventListener('cdm-item-page:update', function (e) {
        if (document.getElementsByClassName("field-type")[0] !== undefined && "p16007coll30 p16007coll72 p15005coll27 p15005coll22 p16007coll33 p15005coll37".match(e.detail.collectionId) !== null && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == "MovingImage") {
        	// unmount or remove current video player from DOM if it is exists
        	currentInstance && currentInstance.unmount();
       		// creates a new instance if it is url item and it is from vimeo.com
        	//currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
        	currentInstance = CustomVideoView(document.getElementsByClassName("ItemView-mainColumn")[1].firstChild);
        }
    });

    document.addEventListener('cdm-item-page:leave', function () {
        // unmount or remove current video player from DOM if it is exists
        currentInstance && currentInstance.unmount();
    });

})();

