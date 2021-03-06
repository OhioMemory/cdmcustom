﻿
var alias = getParameterByName('alias');
var ptr = getParameterByName('ptr');
var x = getParameterByName('x');
var y = getParameterByName('y');
var tw = getParameterByName('width');
var th = getParameterByName('height');

var itemdataUrl = "https://ohiomemory.org/digital/iiif/" + alias + "/" + ptr + "/info.json";
//console.log('itemdataUrl: ' + itemdataUrl);
var request = new XMLHttpRequest();
request.open('GET', itemdataUrl, true);
request.onload = function() {

	if (request.status >= 200 && request.status < 400) {
		// are we getting JSON
		if (/^[\],:{}\s]*$/.test(request.responseText.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

			var data = JSON.parse(request.responseText);
			var max_w = data.width;
			if (max_w > 1000){
				max_w = 1000;
			}

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
				imgElem.setAttribute('src', 'https://ohiomemory.org/digital/iiif/' + alias + '/' + ptr + '/full/' + max_w + ',/0/default.jpg');

				document.getElementById("imgContainer").appendChild(imgElem);

				var image = document.getElementById('image');
				var cropper = new Cropper(image, {
			        movable: false,
			        zoomable: false,
					autoCrop: false,
					movable: false,
			        rotatable: false,
			        scalable: false,
			        crop: function(e) {
			        	//console.log(e.detail.x + ", " + e.detail.y + ", " + e.detail.width + ", " + e.detail.height);
			        }
				});

				document.getElementById("cropbutton").onclick = function() {
					var pts = cropper.getData(true);
					location.href = 'https://ohiomemory.org/digital/custom/cropimage?alias=' + alias + '&ptr=' + ptr + '&x=' + pts.x + '&y=' + pts.y + '&width=' + pts.width + '&height=' + pts.height;
				};

			} else {
				var data = JSON.parse(request.responseText);
				var scale = data.width / max_w;
				var targw = tw * scale;
				var targh = th * scale;
				var posx = x * scale;
				var posy = y * scale;
				//console.log('scale: ' + scale + ", tw: " + tw + ", th: " + th + ", x: " + x + ", y: " + y);
				var imgElem = document.createElement('img');
				imgElem.setAttribute('src', 'https://ohiomemory.org/digital/iiif/' + alias + '/' + ptr + '/' + Math.round(posx) + ',' + Math.round(posy) + ',' + Math.round(targw) + ',' + Math.round(targh) + '/full/0/default.jpg');
				document.getElementById("imgContainer").appendChild(imgElem);
			}

		}

	} else{
		var err_msg = "The image is not support by the Crop tool.";
		document.getElementById('imgContainer').innerHTML = err_msg;
	}
};
request.onerror = function() {
	// connection error
};
request.send();

function getParameterByName(name) {
    if (name !== "" && name !== null && name != undefined) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    } else {
        var arr = location.href.split("/");
        return arr[arr.length - 1];
    }
}