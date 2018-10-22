
// create element function
const elFactory = (type, attributes, ...children) => {
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
}

// subscribe to the homepage ready event
document.addEventListener('cdm-home-page:ready', function(e){
	// console.log('ready: ' + e.detail);
	console.log(e);
});

document.addEventListener('cdm-home-page:update', function(e){
	// console.log('ready: ' + e.detail);
	console.log(e);
});

document.addEventListener('cdm-item-page:enter', function(e){
	// e is instance of CustomEvent
	// console.log(e);
});

document.addEventListener('cdm-item-page:ready', function(e){


	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end

	console.log(event);
	document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[3].addEventListener("click", function(event){
		localStorage.setItem('searchterms', document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value);
		document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = localStorage.getItem('searchterms');
		console.log(event);
		
		console.log(event.view.sessionStorage);

	});
	console.log('cdm-item-page:ready');
	// e is instance of CustomEvent
	//console.log('ready: ' + e.detail); // {collectionId: '...', itemId: '...'}
	//apply the item id in <img> to be the display id;
	//var displayId = e.detail.itemId;
	//console.log('cdm-item-page:ready');
	//console.log(e);

	/*
	ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.20/store.min.js', function() {
		store.remove('searchTerms');

		document.getElementsByClassName("fa-times-circle")[1].parentNode.style.display = 'none';
		const pageViewElem = elFactory('div', { id: 'pageView' }, 'View all pages');
		
		var viewNode = document.getElementsByClassName("ItemView-itemSearchContainer")[1].insertBefore(pageViewElem, document.getElementsByClassName("ItemSearch-itemSearchControl")[1]);

		viewNode.addEventListener("click", function(){
			if (document.getElementById("pageView").innerText == "View all pages") {
				var termValues = document.querySelectorAll('.ItemImage-itemImage div img')[0].getAttribute('src').match(/.*highlightTerms=(.*)/)[1];
				store.set('searchTerms', { terms: termValues });
				document.getElementsByClassName("fa-times-circle")[1].click();
				document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = store.get('searchTerms').terms;
				//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = " ";
				document.getElementById("pageView").innerText = "View relevant pages";
			} else {
				if (store.get('searchTerms') !== undefined && store.get('searchTerms').terms != "") {
					//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = store.get('searchTerms').terms;
					//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].setAttribute('value', store.get('searchTerms').terms);
					document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].addEventListener("click"), function(event){
						console.log(event);
						
					}
					document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].click();
					document.getElementById("pageView").innerText = "View all pages";
				}
			}
		});
	});
	*/

	/*
	document.getElementsByClassName("fa-times-circle")[1].parentNode.style.display = 'none';
	const pageViewElem = elFactory('div', { id: 'pageView' }, 'View all pages');
	var viewNode = document.getElementsByClassName("ItemView-itemSearchContainer")[1].insertBefore(pageViewElem, document.getElementsByClassName("ItemSearch-itemSearchControl")[1]);
	viewNode.addEventListener("click", function(){
		if (document.getElementById("pageView").innerText == "View all pages") {
			var termValues = document.querySelectorAll('.ItemImage-itemImage div img')[0].getAttribute('src').match(/.*highlightTerms=(.*)/)[1];
			document.getElementsByClassName("fa-times-circle")[1].click();
			document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = termValues;
			//document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = " ";
			document.getElementById("pageView").innerText = "View relevant pages";
		} else {
			document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].click();
			document.getElementById("pageView").innerText = "View all pages";
		}
	});
	*/

	// hide full text initially
	if (document.getElementById("compoundItemTranscript") != null) {

		if ( document.getElementById('compoundItemTranscript').getAttribute("aria-hidden") == "false" ) {
			document.getElementsByClassName('panel-title')[0].firstChild.click();
		}
		
	}

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


	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end

	console.log("cdm-item-page:update");

	//console.log('update: ' + e.detail); // {collectionId: '...', itemId: '...'}
	//console.log('cdm-item-page:update');

	/*
	ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.20/store.min.js', function() {
		const pageViewElem = elFactory('div', { id: 'pageView' }, 'View relevant pages');
		document.getElementsByClassName("fa-times-circle")[1].parentNode.style.display = 'none';
		if (document.getElementById("pageView").innerText == "View all pages") { 
			const pageViewElem = elFactory('div', { id: 'pageView' }, 'View all pages');
		} else {
			const pageViewElem = elFactory('div', { id: 'pageView' }, 'View relevant pages');
		}

		var viewNode = document.getElementsByClassName("ItemView-itemSearchContainer")[1].insertBefore(pageViewElem, document.getElementsByClassName("ItemSearch-itemSearchControl")[1]);

		viewNode.addEventListener("click", function(){
			if (document.getElementById("pageView").innerText == "View all pages") {
				var termValues = document.querySelectorAll('.ItemImage-itemImage div img')[0].getAttribute('src').match(/.*highlightTerms=(.*)/)[1];
				store.set('searchTerms', { terms: termValues });
				document.getElementsByClassName("fa-times-circle")[1].click();
				document.getElementById("pageView").innerText = "View relevant pages";
			} else {
				if (store.get('searchTerms') !== undefined && store.get('searchTerms').terms != "") {
					document.getElementsByClassName("ItemSearch-itemSearchInputControl")[1].value = store.get('searchTerms').terms;
					document.getElementsByClassName("ItemSearch-itemHeaderButtonPadding")[2].click();
					document.getElementById("pageView").innerText = "View all pages";
				}
			}
		});
	});
	*/


	// hide full text initially
	if (document.getElementById("compoundItemTranscript") != null) {

		if ( document.getElementById('compoundItemTranscript').getAttribute("aria-hidden") == "false" ) {
			document.getElementsByClassName('panel-title')[0].firstChild.click();
		}
		
	}
	
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

	console.log("cdm-search-page:ready");
	console.log(e);


	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end

	//console.log(e);
	// for newspaper portal
	/*
	if (e.target.URL.match(/!newspapers/).length > 0) {
		document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers"
		document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
	}
	*/

	var facetNodes = document.getElementsByClassName("panel-title");
	for (i=1; i<facetNodes.length; i++) {
		if (facetNodes[i].firstChild.getAttribute("aria-label").includes("close")) {
			facetNodes[i].firstChild.click();
		}
	}
});


document.addEventListener('cdm-search-page:update', function(e){

	console.log("cdm-search-page:update");
	console.log(e);


	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end

	//console.log(e);
	// for newspaper portal
	/*
	if (e.target.URL.match(/!newspapers/).length > 0) {
		document.getElementsByClassName('Header-titleText')[0].innerHTML = "Ohio Memory Newspapers";
		document.getElementsByClassName('Header-titleText')[0].classList.add("showTitle");
	}
	*/
});

document.addEventListener('cdm-collection-landing-page:enter', function(e){

});


document.addEventListener('cdm-collection-landing-page:ready', function(e){

	console.log("cdm-collection-landing-page:ready");
	console.log(e);


	/*document.getElementsByClassName("SimpleSearch-headerAdvancedSearchButtonLink")[0].addEventListener("click", function(){
		console.log("cdm-collection-landing-page:ready");
	});*/

	/*const pageViewElem = elFactory('style', { id: 'headerTitleDisplay' }, 'View all pages');
	document.querySelector('style').textContent += ".Header-titleText { display: none; }";*/

	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end

});

document.addEventListener('cdm-collection-landing-page:update', function(e){
	console.log("cdm-collection-landing-page:ready");
	console.log(e);

});

document.addEventListener('cdm-collection-search-page:ready', function(e){

	console.log("cdm-collection-search-page:ready");
	console.log(e);

	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end

	var facetNodes = document.getElementsByClassName("panel-title");
	for (i=1; i<facetNodes.length; i++) {
		if (facetNodes[i].firstChild.getAttribute("aria-label").includes("close")) {
			facetNodes[i].firstChild.click();
		}
	}

});

document.addEventListener('cdm-collection-search-page:update', function(e){

	console.log("cdm-collection-search-page:update");
	console.log(e);


	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end
});

document.addEventListener('cdm-advanced-search-page:ready', function(e){

	console.log("cdm-advanced-search-page:ready");
	console.log(e);

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
	console.log("cdm-advanced-search-page:update");
	console.log(e);
	document.getElementsByClassName("SimpleSearch-headerAdvancedSearchButtonLink")[0].addEventListener("click", function(e){
		console.log("cdm-advanced-search-page:update");
		//if( !!document.getElementById("advancedSearchDiv") ) { history.back(1); e.stopPropagation(); }
	});

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
	console.log(e);

	// menu link changes for test only - begin
	if (document.querySelectorAll('.Header-headerMenuLinks li a').length > 0) {
		var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
		var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
		document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
		var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
		var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
		document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	}
	// menu link changes for test only - end


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
	console.log(e);


	// menu link changes for test only - begin
	var collectionListPageProd = document.querySelectorAll('.Header-headerMenuLinks li a')[1].getAttribute('href');
	var collectionListPageTest = collectionListPageProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[1].setAttribute('href', collectionListPageTest);
	var collectionListNppProd = document.querySelectorAll('.Header-headerMenuLinks li a')[2].getAttribute('href');
	var collectionListNppTest = collectionListNppProd.replace(/www\.ohiohistoryhost/, 'apps.ohiohistory');
	document.querySelectorAll('.Header-headerMenuLinks li a')[2].setAttribute('href', collectionListNppTest);
	// menu link changes for test only - end
	
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

// advanced search window
(function () {

	function setupAdvancedModal(coll, urlstring) {
		ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/tingle/0.13.2/tingle.js', function(){
			var urlpath = urlstring.replace(/^.*?digital\//, '');
			if (document.getElementsByClassName("advanced-modal").length > 0) { 
				document.getElementsByClassName("advanced-modal")[0].parentNode.removeChild( document.getElementsByClassName("advanced-modal")[0] ); 
			}
			var advSearchContent = new tingle.modal( {cssClass: ['advanced-modal'] });
		    var advLink = document.querySelector('.SimpleSearch-headerAdvancedSearchButtonLink');
		    advLink.addEventListener('click', function(){
		        advSearchContent.open();
		        advSearchContent.setContent('<iframe id="advSearchFrame" src="/customizations/global/pages/advancedsearch_resources/advanced_search.html?' + coll + '&' + urlpath + '" width="100%" height="540px" scrolling="no" frameBorder="0" style="border:none;"></iframe>'); 
		    });
			document.getElementsByClassName("SimpleSearch-headerAdvancedSearchButtonLink")[0].addEventListener("click", function(e){
				e.stopPropagation();
				e.preventDefault();
			});
		});
	}

	// set up custom advanced search modal for following events
	document.addEventListener('cdm-custom-page:ready', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-custom-page:update', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-collection-landing-page:ready', function(e){
    	setupAdvancedModal(e.detail.collectionId, e.target.URL);
    });
    document.addEventListener('cdm-collection-landing-page:update', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-collection-search-page:ready', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-collection-search-page:update', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-search-page:ready', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-search-page:update', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-item-page:ready', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
	});
	document.addEventListener('cdm-item-page:update', function(e){
		setupAdvancedModal(e.detail.collectionId, e.target.URL);
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
            var html = '<iframe type="text/html" width="640" height="320" src="' + url + '" frameborder="0" allowfullscreen=""></iframe>';
            resolve(html);
        });
    }

    var APIS = {
        'vimeo.com': VimeoAPI,
        'youtu.be': YoutuAPI,
        'www.youtube.com': YoutubeAPI,
        'cdnapisec.kaltura.com': KalturaAPI,
        'media.norweld.org' : NorweldAPI
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
        Array.from(rows).forEach(row => {
            // find a description field
            if (row.firstChild.textContent === 'Source') {
                links = links.concat(row.lastChild.textContent.split(','));
            }
            if (row.firstChild.textContent === ' 	') {
                links = links.concat(row.lastChild.textContent.split(','));
            }
        });
        console.log(links);
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
    	if ("p16007coll30 p16007coll72 p15005coll27 p15005coll22".match(e.detail.collectionId) !== null) {
        	// unmount or remove current video player from DOM if it is exists
        	currentInstance && currentInstance.unmount();
       		// creates a new instance if it is url item and it is from vimeo.com
        	//currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
        	currentInstance = CustomVideoView(document.getElementsByClassName("ItemView-mainColumn")[1].firstChild);
        }
    });

    document.addEventListener('cdm-item-page:update', function (e) {
        if ("p16007coll30 p16007coll72 p15005coll27 p15005coll22".match(e.detail.collectionId) !== null) {
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
	            ScriptLoader('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', function(){
	                let cssFileRef = document.createElement("link");
	                cssFileRef.rel = "stylesheet";
	                cssFileRef.type = "text/css";
	                cssFileRef.href = "https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css";
	                document.getElementsByTagName("head")[0].appendChild(cssFileRef)
	                
	                //axios.get('https://cdm16007.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmQuery/p16007coll51/0/title!demo!rights/demo/100/1/0/0/0/0/json')
	                axios.get('http://www.ohiomemory.org/digital/bl/dmwebservices/index.php?q=dmQuery/p16007coll51/0/title!demo!rights/demo/100/1/0/0/0/0/json')
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
	                    console.log(error);
	                });
	            });
	        });
	    }
    }
});



