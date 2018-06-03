﻿
// subscribe to the homepage ready event
document.addEventListener('cdm-home-page:ready', function(e){
	// console.log('ready: ' + e.detail);
});

document.addEventListener('cdm-item-page:enter', function(e){
	// e is instance of CustomEvent
	// ...
});
document.addEventListener('cdm-item-page:ready', function(e){
	// e is instance of CustomEvent
	//console.log('ready: ' + e.detail); // {collectionId: '...', itemId: '...'}
	//apply the item id in <img> to be the display id;
	//var displayId = e.detail.itemId;
	var item_img =  document.querySelector('.ItemImage-itemImage img');
	if (item_img != undefined){
		var img_src_str = item_img.getAttribute('src');
		var img_id = img_src_str.split("/")[6];
		var page_url = 'http://ohiomemory.org/digital/custom/cropimage?alias=' + e.detail.collectionId + '&ptr=' + img_id;
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

	if (document.getElementsByClassName('BackToResults-backLink')[0] != undefined) {
		if (document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/) != null && document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/).length > 0) {
			document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers";
			document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
		}
	}

});

document.addEventListener('cdm-item-page:update', function(e){
	//console.log('update: ' + e.detail); // {collectionId: '...', itemId: '...'}
	//console.log("cdm-item-page:update");
	
	var cropButton = document.querySelector('#crop');
	//var displayId = e.detail.itemId;
	var item_img =  document.querySelector('.ItemImage-itemImage img');
	if (item_img != undefined){
		var img_src_str = item_img.getAttribute('src');
		var img_id = img_src_str.split("/")[6];
		var page_url = 'http://ohiomemory.org/digital/custom/cropimage?alias=' + e.detail.collectionId + '&ptr=' + img_id;
		var page_win = "clipWindow";
		var page_size = "location=1,status=1,toolbar=1,menubar=1,scrollbars=1,width=1100,height=1000";

		if (cropButton != undefined){ //update existing Crop button
			cropButton.setAttribute('onclick', 'window.open(\''+page_url+'\',\''+page_win+'\',\''+page_size+'\')');
		}else{ //insert new Crop button
			var newButton = document.createElement("div");
			newButton.setAttribute('class', 'btn-group');
			var span_str = '<span class="fa fa-crop fa-2x"></span>';
			var button_str = '<button onclick="window.open(\''+page_url+'\',\''+page_win+'\',\''+page_size+'\');return false;" id="crop" class="cdm-btn btn btn-primary" type="button" role="button" title="Crop" aria-label="Crop" aria-haspopup="true" aria-expanded="false">'+ span_str+'</button>';
			newButton.innerHTML =  button_str;
			if (document.getElementsByClassName('btn-toolbar pull-right')[1].offsetHeight > 0) {
				var targetElem = document.getElementsByClassName('btn-toolbar pull-right')[1];
			} else {
				var targetElem = document.getElementsByClassName('btn-toolbar pull-right')[0];
			}
			targetElem.insertBefore(newButton, targetElem.firstElementChild);
		}
	}

	// document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href");
	if (document.getElementsByClassName('BackToResults-backLink')[0] != undefined) {
		if (document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/) != null && document.getElementsByClassName('BackToResults-backLink')[0].firstChild.getAttribute("href").match(/!newspapers/).length > 0) {
			document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers";
			document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
		}
	}
});

function openCropWindow(coll, ptr) {
	var page_url = 'http://ohiomemory.org/digital/custom/cropimage?alias=' + coll + '&ptr=' + ptr;
	window.open(page_url, "clipWindow", "location=1,status=1,toolbar=1,menubar=1,scrollbars=1,width=1100,height=1000");
}

document.addEventListener('cdm-search-page:ready', function(e){
	//console.log(e);
	if (e.target.URL.match(/!newspapers/).length > 0) {
		document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers"
		document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
	}
});
document.addEventListener('cdm-search-page:update', function(e){
	//console.log(e);
	if (e.target.URL.match(/!newspapers/).length > 0) {
		document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers";
		document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
	}
});

document.addEventListener('cdm-advanced-search-page:ready', function(e){
	// e is instance of CustomEvent
	// ...
	var newOption = document.createElement("option");
	newOption.setAttribute('id', 'nearOp');
	newOption.value = "near5";
	newOption.innerText = "Within 5 words";
	document.getElementsByClassName('form-control')[2].appendChild(newOption);
	
	/*
	var terms = document.getElementsByClassName('form-control')[1].value.split(" ").join(' near5 ');
	
	window.location.href = 'http://www.ohiomemory.org/digital/collection/' + e.detail.collectionId + '/search/searchterm/' + document.getElementsByClassName('form-control')[1].value.split(" ").join(' near5 ') + '/field/all/mode/exact/conn/and';
	*/

	document.getElementsByClassName("cdm-btn btn btn-primary btn-block")[1].addEventListener("click", function(){

		if ( document.getElementsByClassName('form-control')[2].value.match(/near5/) ) {
			
			//window.location.href = e.srcElement.location.href;
			window.location.href = 'http://www.ohiomemory.org/digital/search/searchterm/' + document.getElementsByClassName('form-control')[1].value.split(" ").join(' near5 ') + '/field/all/mode/exact/conn/and';
			e.stopPropagation();
		}
	});
	
});
document.addEventListener('cdm-advanced-search-page:update', function(e){
	// e is instance of CustomEvent
	// a page was updated
	//console.log(e);
});
document.addEventListener('cdm-advanced-search-page:leave', function(e){
	// e is instance of CustomEvent
	// ...
	// http://www.ohiomemory.org/digital/collection/addresses/search/searchterm/water%20near5%20pollution/field/all/mode/exact/conn/and
	
	
	//console.log(e);
});
// app ready
document.addEventListener('cdm-app:ready', function(e){
	//console.log(e);
	//var pageHead = e.srcElement.head;
	
});

document.addEventListener('cdm-custom-page:enter', function(e){
	// e is instance of CustomEvent
	// console.log(e.srcElement.head);
	
});

document.addEventListener('cdm-custom-page:ready', function(e){
	// e is instance of CustomEvent
	// ...
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
			// console.log('default');
			var body = document.getElementsByTagName('body')[0];
			var script = document.createElement("script")
		    script.type = "application/javascript";
			script.src = '/customizations/global/pages/homepage_resources/jquery.min.js';
			body.appendChild(script);
			
			var checker = 0;
		 
		 	function jqueryLoaded() {
				clearInterval(checker);
				//alert('jQuery is loaded, sire!');
			
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = 'http://www.google-analytics.com/ga.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/bootstrap.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/ios-orientationchange-fix.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/jquery.flexslider-min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/modernizr.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/jquery.easing.1.3.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/bootstrap-select.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/homepage.js';
				body.appendChild(script);
			}
		 
			function checkJquery() {
				if (window.jQuery) {
		        	jqueryLoaded();
				} 
		    	if(checker == 0) {
					//alert('Setting up interval');
	        		checker = window.setInterval(checkJquery, 100);
		    	}
			}	
		 
			checkJquery();
				
	}
});

document.addEventListener('cdm-custom-page:update', function(e){
	// e is instance of CustomEvent
	// ...
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
		default:
			// console.log('default');
			var body = document.getElementsByTagName('body')[0];
			var script = document.createElement("script")
		    script.type = "application/javascript";
			script.src = '/customizations/global/pages/homepage_resources/jquery.min.js';
			body.appendChild(script);
			
			var checker = 0;
		 
		 	function jqueryLoaded() {
				clearInterval(checker);
				//alert('jQuery is loaded, sire!');
			
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = 'http://www.google-analytics.com/ga.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/bootstrap.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/ios-orientationchange-fix.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/jquery.flexslider-min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/modernizr.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/jquery.easing.1.3.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/bootstrap-select.min.js';
				body.appendChild(script);
				var script = document.createElement("script")
			    script.type = "application/javascript";
				script.src = '/customizations/global/pages/homepage_resources/homepage.js';
				body.appendChild(script);
			}
		 
			function checkJquery() {
				if (window.jQuery) {
		        	jqueryLoaded();
				} 
		    	if(checker == 0) {
					//alert('Setting up interval');
	        		checker = window.setInterval(checkJquery, 100);
		    	}
			}	
		 
			checkJquery();
			
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
