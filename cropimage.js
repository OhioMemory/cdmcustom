var parameters = location.search.substring(1).split("&");
var alias = getParameterByName('alias');
var ptr = getParameterByName('ptr');
var x = getParameterByName('x');
var y = getParameterByName('y');
var tw = getParameterByName('width');
var th = getParameterByName('height');

if (x === null || x == '') {
	
	var buttonElem = document.createElement('button');
	buttonElem.setAttribute('id', 'cropbutton');
	buttonElem.innerHTML = "Crop";
	document.getElementById("container").insertBefore(buttonElem, document.getElementById("container").firstChild);
	
	var textElem = document.createElement('h2');
	textElem.innerHTML = 'Click and drag to select an area, then click the crop button';
	document.getElementById("container").insertBefore(textElem, document.getElementById("container").firstChild);
	
	var imgElem = document.createElement('img');
	imgElem.setAttribute('id', 'image');
	imgElem.setAttribute('src', 'http://cdm16007.contentdm.oclc.org/digital/iiif/' + alias + '/' + ptr + '/full/1000,/0/default.jpg');
	
	document.getElementById("imgContainer").appendChild(imgElem);
	var image = document.querySelector('#image');
	var cropper = new Cropper(image, {
        movable: false,
        zoomable: false,
		autoCrop: false,
		movable: false,
        rotatable: false,
        scalable: false,
        crop: function(e) { /* e.detail.x, e.detail.y, e.detail.width, e.detail.height */ }
	});
	
	document.getElementById("cropbutton").onclick = function() {performCrop()};
	
} else {
	
	var itemdataUrl = "http://cdm16007.contentdm.oclc.org/digital/iiif/" + alias + "/" + ptr + "/info.json";
	var request = new XMLHttpRequest();
	request.open('GET', itemdataUrl, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			var data = JSON.parse(request.responseText);
			var scale = data.width / 1000;
			var targw = tw * scale;
			var targh = th * scale;
			var posx = x * scale;
			var posy = y * scale;
			
			var imgElem = document.createElement('img');
			imgElem.setAttribute('src', 'http://cdm16007.contentdm.oclc.org/digital/iiif/' + alias + '/' + ptr + '/' + Math.round(posx) + ',' + Math.round(posy) + ',' + Math.round(targw) + ',' + Math.round(targh) + '/full/0/default.jpg');
			document.getElementById("imgContainer").appendChild(imgElem);
		} else {
			// returned an error
		}
	};
	request.onerror = function() {
		// connection error
	};
	request.send();

}

function performCrop() {
	var pts = cropper.getCropBoxData(); 
	location.href = 'http://cdm16007.contentdm.oclc.org/digital/custom/cropimage?alias=' + alias + '&ptr=' + ptr + '&x=' + Math.round(pts.left) + '&y=' + Math.round(pts.top) + '&width=' + Math.round(pts.width) + '&height=' + Math.round(pts.height);
}