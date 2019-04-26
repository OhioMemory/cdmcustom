
// create element function
/*const elFactory = (type, attributes, ...children) => {
	const el = document.createElement(type)
	for (key in attributes) {
		el.setAttribute(key, attributes[key])
	}
	children.forEach(child => {
		if (typeof child === 'string') {
			el.appendChild(document.createTextNode(child))
		} else {
			el.appendChild(child)
		}
	})
	return el
}*/

// subscribe to the homepage ready event
document.addEventListener('cdm-home-page:ready', function(e){
	// console.log('ready: ' + e.detail);
	//console.log(e);
});

document.addEventListener('cdm-home-page:update', function(e){
	// console.log('ready: ' + e.detail);
	//console.log(e);
});

document.addEventListener('cdm-item-page:enter', function(e){
	// e is instance of CustomEvent
	//console.log('cdm-item-page:enter');
	//console.log(e);
});


(function () {

	document.addEventListener('cdm-item-page:update', function(e){

		// hide full text initially
		if (document.getElementById("compoundItemTranscript") != null) {

			if ( document.getElementById('compoundItemTranscript').getAttribute("aria-hidden") == "false" ) {
				document.getElementsByClassName('panel-title')[0].firstChild.click();
			}
			
		}

	});

});

/**
 * This could be the way a supercollection search work, where branding and search criteria are maintained across pages
 */
/*document.addEventListener('cdm-search-page:ready', function(e){
	
	if (document.getElementsByClassName('BackToResults-backLink')[0] != undefined) {
		if (document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/) != null && document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/).length > 0) {
			document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers";
			document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
		}
	}

	var facetNodes = document.getElementsByClassName("panel-title");
	for (i=1; i<facetNodes.length; i++) {
		if (facetNodes[i].firstChild.getAttribute("aria-label").includes("close")) {
			facetNodes[i].firstChild.click();
		}
	}
});*/


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

document.addEventListener('cdm-custom-page:update', function(e){
	// e is instance of CustomEvent
	// ...
	//console.log(e);

	// console.log(typeof e.detail.filename === "undefined"); // e.srcElement.URL == http://www.ohiomemory.org/digital/ if(isEmpty(e.detail)) {
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

// some kind of sub / super collection search
/*(function () {
	if (document.getElementsByClassName('BackToResults-backLink')[0] != undefined) {
		if (document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/) != null && document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/).length > 0) {
			document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers";
			document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
		}
	}
})();*/


// compound object item view
(function () {

	function startEventListener(cdmEvent) {

		document.addEventListener(cdmEvent, function (e) {

			if (e.detail.collectionId == 'p15005coll5') {
				
				var pageViewContainers = document.querySelectorAll('#pageView');
				for (var i = 0; i < pageViewContainers.length; ++i) {
				  pageViewContainers[i].remove();
				} 
				if (document.querySelectorAll('#pageView').length < 1) { 
					var pageViewElem = document.createElement('div');
					var att = document.createAttribute("id");
					att.value = "pageView";
					pageViewElem.setAttributeNode(att); 
					var linkText = document.createTextNode("View all pages");
					pageViewElem.appendChild(linkText);
					var viewNode = document.getElementsByClassName("ItemView-itemSearchContainer")[1].insertBefore(pageViewElem, document.getElementsByClassName("ItemSearch-itemSearchControl")[1]);
				}

				viewNode.addEventListener("click", function(event){
					if (document.getElementById("pageView").innerText == "View all pages") {
						//var termValues = document.querySelectorAll('.ItemImage-itemImage div img')[0].getAttribute('src').match(/.*highlightTerms=(.*)/)[1];
						//sessionStorage.setItem('searchTerms', { terms: termValues });
						document.getElementsByClassName("fa-times-circle")[1].click();
						//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = store.get('searchTerms').terms;
						//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = " ";
						document.getElementById("pageView").innerText = "View relevant pages";
						console.log(event);
						console.log('Ready: View relevant pages');
						document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = 'infantry';
						document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].addEventListener("click", function(event){
							console.log(event);
							console.log('Ready: View all pages');
							document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].click();
							document.getElementById("pageView").innerText = "View all pages";
						});
						
					} else {
						//if (store.get('searchTerms') !== undefined && store.get('searchTerms').terms != "") {
							document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = 'infantry';
							//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = store.get('searchTerms').terms;
							//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].setAttribute('value', store.get('searchTerms').terms);
							document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].addEventListener("click", function(event){
								console.log(event);
								console.log('Ready: View all pages');
								document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].click();
								document.getElementById("pageView").innerText = "View all pages";
							});
							
						//}
					}
				});

	    	}
	    });
	}
	
	var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];

	cdmEvents.forEach(startEventListener);

})();


/**
 * Crop function for item view page
 */
(function () {
	
	function openCropWindow(coll, ptr) {
		var page_url = 'https://ohiomemory.org/digital/custom/cropimage?alias=' + coll + '&ptr=' + ptr;
		window.open(page_url, "clipWindow", "location=1,status=1,toolbar=1,menubar=1,scrollbars=1,width=1100,height=1000");
	}

	function setupCropTool(currentImageElement, collAlias) {

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
 * Create a control to display Reference URLs for an item record
 */
(function () {

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){
			

				// remove CONTENTdm default of page-level the filename
            	if (document.getElementsByClassName("ItemTitle-secondaryTitle")[0] !== undefined) {
            		document.getElementsByClassName("ItemTitle-secondaryTitle")[0].remove();
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
 * Google Analytics needs to be set for every event
 */
(function () {

	function startEventListener(cdmEvent) {
		document.addEventListener(cdmEvent, function(e){
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
	    	}
            //var openseadragonContainer = elFactory('div', { id: 'zoomDiv', class: 'zoomView', style: 'height:100vh;width:100%' });
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
		        showNavigator: false
		    });
		    var odcStyle = openseadragonContainer.firstChild.firstChild.getAttribute("style");
		    openseadragonContainer.firstChild.firstChild.setAttribute("style", odcStyle + "outline:0");
		});

	}

    function startEventListener(cdmEvent) {
    	document.addEventListener(cdmEvent, function(e){

    		// don't use openseadragon for videos
    		if (document.getElementsByClassName("field-type")[0] !== undefined && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == 'MovingImage') {
    			return;
    		}
    		// don't use openseadragon for PDFs
    		if (document.getElementsByClassName("ItemPDF-itemImage").length > 0) {
    			return;
    		}

    		var zoomContainers = document.getElementsByClassName("zoomView");
	    	if (document.getElementsByClassName("zoomView").length > 0) {
				Array.prototype.forEach.call(zoomContainers, function(el) { el.parentNode.removeChild(el); });
	    	}
			var request = new XMLHttpRequest();
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

    // use the alternative viewer only for larger sizes
    if ( window.innerWidth > 760 || document.body.clientWidth > 760 ) {
	    var cdmEvents = ['cdm-item-page:ready', 'cdm-item-page:update'];
	    cdmEvents.forEach(startEventListener);
	}

})();


// video handler
(function () {

    var currentInstance = null;


    function VimeoAPI(url) {
        return new Promise(function (resolve) {
            if (!url) {
                return resolve(false);
            }
            url = url.replace('https://vimeo.com', 'https://player.vimeo.com/video');
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
        
        /*
        const anchor = container.querySelector('a');
        if (!anchor || !/vimeo.com|youtube.com|youtu.be|cdnapisec.kaltura.com|media.norweld.org/i.test(anchor.href)) {
            return false;
        }
        
        var links = [anchor.href];
        */

        var links = [];

        // parse metadata
        var rows = document.querySelectorAll('tr[class*=metadatarow]');
        /*Array.from(rows).forEach(row => {
            if (row.firstChild.textContent === 'Source') {
                links = links.concat(row.lastChild.textContent.split(','));
            }
            if (row.firstChild.textContent === ' 	') {
                links = links.concat(row.lastChild.textContent.split(','));
            }
        });*/

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
    	if (document.getElementsByClassName("field-type")[0] !== undefined && "p16007coll30 p16007coll72 p15005coll27 p15005coll22 p16007coll33".match(e.detail.collectionId) !== null && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == "MovingImage") {
        	// unmount or remove current video player from DOM if it is exists
        	currentInstance && currentInstance.unmount();
       		// creates a new instance if it is url item and it is from vimeo.com
        	//currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
        	currentInstance = CustomVideoView(document.getElementsByClassName("ItemView-mainColumn")[1].firstChild);
        }
    });

    document.addEventListener('cdm-item-page:update', function (e) {
        if (document.getElementsByClassName("field-type")[0] !== undefined && "p16007coll30 p16007coll72 p15005coll27 p15005coll22 p16007coll33".match(e.detail.collectionId) !== null && document.getElementsByClassName("field-type")[0].lastChild.lastChild.textContent == "MovingImage") {
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


// timeline tool
document.addEventListener('cdm-custom-page:ready', function(event) {
	if (event.detail.filename !== undefined) {
	    if (event.detail.filename.endsWith('timeline')) {

	        /*
	        * Helper functions
	        */
	        let createCollectionManifest = function() {
	            return {
	                '@context' : 'http://iiif.io/api/presentation/2/context.json',
	                '@id' : 'https://cdm15717.contentdm.oclc.org/change/this/to/the/path/this/gets/saved.json',
	                '@type' : 'sc:Collection',
	                'label' : 'Timeline Demo',
	                'description' : 'Collection from Timeline Demo',
	                'attribution' : 'This collection of images may be printed or downloaded by individuals, schools or libraries for study, research or classroom teaching without permission. For other uses contact  visualcollections@indianahistory.org. Use must be accompanied with the attribution, "Indiana Historical Society".',
	                'members' : []
	            };
	        }

	        // Create a IIIF Collection Manifest member from a CONTENTdm dmQuery API item record
	        let createMember = function(record) {
	            return {
	                '@id' : 'https://cdm16007.contentdm.oclc.org/digital/iiif-info' + record.collection + '/' + record.pointer + '/manifest.json',
	                '@type' : 'sc:Manifest',
	                'label' : record.title
	            };
	        };

	        // Loop through IIIF item manifest metadata and return the value for the requested element label
	        let getMetadata = function(metadataArray, label) {
	            let elementValue = '';
	            metadataArray.forEach(function(metadataElement) {
	                if (metadataElement.label === label) {
	                    elementValue = metadataElement.value;
	                }
	            })
	            return elementValue;
	        };

	        // Convert a IIIF Item manifest to a TimelineJS event
	        let convertToEvent = function(itemManifest) {
	            return {
	                'media' : {
	                    'url' : updateIIIFImageUrl(itemManifest.sequences[0].canvases[0].images[0].resource['@id'], 'size', '725,'),
	                    'credit' : itemManifest.attribution['@value']
	                },
	                'start_date' : {
	                    'year' : new Date(getMetadata(itemManifest.metadata, 'Date')).getFullYear()
	                },
	                'text' : {
	                    'headline' : getMetadata(itemManifest.metadata, 'Title'),
	                    'text' : getMetadata(itemManifest.metadata, "Description")
	                }
	            }
	        };

	        let updateIIIFImageUrl = function(iiifUrl, part, newValue) {
	            let url = new URL(iiifUrl);
	            let urlParts = url.pathname.split('/');
	            if (part === 'region') {
	                urlParts[urlParts.length - 4] = newValue;
	            } else if (part === 'size') {
	                urlParts[urlParts.length - 3] = newValue;
	            } else if (part === 'rotation') {
	                urlParts[urlParts.length - 2] = newValue;
	            } else if (part === 'filename') {
	                urlParts[urlParts.length - 1] = newValue;
	            }
	            url.pathname = urlParts.join('/');
	            return url.href;
	        }

	        /*
	        * Main execution
	        */
	        ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', function() {
	            ScriptLoader('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', function() {
	                let cssFileRef = document.createElement("link");
	                cssFileRef.rel = "stylesheet";
	                cssFileRef.type = "text/css";
	                cssFileRef.href = "https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css";
	                document.getElementsByTagName("head")[0].appendChild(cssFileRef)
	                
	                //axios.get('https://cdm16007.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmQuery/p16007coll51/0/title!demo!rights/demo/100/1/0/0/0/0/json')
	                axios.get('https://ohiomemory.org/digital/bl/dmwebservices/index.php?q=dmQuery/p16007coll51/0/title!demo!rights/demo/100/1/0/0/0/0/json')
	                .then(function(response) {
	                    let collectionManifest = createCollectionManifest();
	                    response.data.records.forEach(function(record) {
	                        collectionManifest.members.push(createMember(record));
	                    });

	                    let promises = [];
	                    collectionManifest.members.forEach(function(collectionManifestMember) {
	                        promises.push(axios.get(collectionManifestMember['@id']));
	                    });

	                    axios.all(promises).then(function(results){
	                        let timelineJson = {
	                            'title' : {'text': {'headline' : 'CONTENTdm IIIF Timeline Demo'}},
	                            'events' : []
	                        };

	                        results.forEach(function(response){
	                            let eventData = convertToEvent(response.data);
	                            timelineJson.events.push(eventData);
	                        });
	                        window.timeline = new TL.Timeline('timeline-embed', timelineJson);
	                    });
	                }).catch(function(error) {
	                    //console.log(error);
	                });
	            });
	        });
	    }
    }
});


