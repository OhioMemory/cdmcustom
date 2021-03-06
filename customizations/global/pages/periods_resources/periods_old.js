function toggleTimeline() {
	//var timeline = document.getElementById("prehistoric");
	//var timeline = new vis.Timeline(timelineContainer, historicSettings.hItems, historicSettings.hOptions);
    //var prehistoric = document.getElementById("prehistoric");
    //var historic = document.getElementById("historic");
    var timelineContainer = document.getElementById("timeline");
    timelineContainer.innerHTML = '';

    var toggle = document.getElementById("toggle");
    // var tn = document.getElementsByClassName("vis-time-axis").length;
	// var document.getElementsByClassName("vis-time-axis")[tn-1].offsetParent.innerText
	//console.log(toggle.innerText);
    if (toggle.innerText == "Switch to Prehistoric Timeline") {
    	//timelineObj.timelineRef.destroy();
    	var timeline = new vis.Timeline(timelineContainer, prehistoricSettings.pItems, prehistoricSettings.pOptions);
    	//console.log(document.getElementsByClassName("vis-time-axis"));
    	
        var n = document.getElementsByClassName("vis-time-axis").length - 1;
        var n2 = n - 1;
       	document.getElementsByClassName("vis-time-axis")[n].innerText = "";
        document.getElementsByClassName("vis-time-axis")[n2].innerText = "";
        
        toggle.innerText = "Switch to Historic Timeline";
       
    } else {
    	//var timeline = new vis.Timeline(timelineContainer, prehistoricItems, prehistoricOptions);
    	/*
        prehistoric.style.display = "none";
        historic.style.display = "block";
        console.log(document.getElementsByClassName("vis-time-axis").length);
		*/
		/*
		timelineObj.timelineRef.setItems(historicSettings.hItems);
		timelineObj.timelineRef.setOptions(historicSettings.hOptions);
        timelineObj.timelineRef.redraw();
        */
        //timelineObj.timelineRef.destroy();
    	var timeline = new vis.Timeline(timelineContainer, historicSettings.hItems, historicSettings.hOptions);
        toggle.innerText = "Switch to Prehistoric Timeline";
        // attach events to the navigation buttons
		document.getElementById('moveLeft').onclick  = function () { move( 0.1); };
		document.getElementById('moveRight').onclick = function () { move(-0.1); };
		function move (percentage) {
		    var range = timeline.getWindow();
		    var interval = range.end - range.start;

		    timeline.setWindow({
		        start: range.start.valueOf() - interval * percentage,
		        end:   range.end.valueOf()   - interval * percentage
		    });
		}
    }
}

function getHistoricLink(year, coll, ptr) {
	return year + 's<br><a href="https://ohiomemory.org/digital/search/searchterm/' + year + '*/field/coverab/mode/exact/conn/and/order/nosort" target="_blank"><img src="https://cdm16007.contentdm.oclc.org/digital/iiif/' + coll + '/' + ptr + '/full/150,150/0/default.jpg"></a>';
}

// create data and a Timeline
//var historicContainer = document.getElementById('historic');
var timelineContainer = document.getElementById('timeline');
var historicItems = new vis.DataSet([
	{id: 1, content: getHistoricLink('1740', 'p267401coll32', '13484'), start: '1740'},
	{id: 2, content: getHistoricLink('1750', 'p267401coll32', '13100'), start: '1750'},
	{id: 3, content: getHistoricLink('1760', 'p267401coll32', '11623'), start: '1760'},
	{id: 4, content: getHistoricLink('1770', 'flags', '1542'), start: '1770'},
	{id: 5, content: getHistoricLink('1780', 'p267401coll32', '17363'), start: '1780'},
	{id: 6, content: getHistoricLink('1790', 'p267401coll32', '17372'), start: '1790'},
	{id: 7, content: getHistoricLink('1800', 'p267401coll32', '6986'), start: '1800'},
	{id: 8, content: getHistoricLink('1810', 'p267401coll32', '2662'), start: '1810'},
	{id: 9, content: getHistoricLink('1820', 'p267401coll32', '13941'), start: '1820'},
	{id: 10, content: getHistoricLink('1830', 'p267401coll32', '10652'), start: '1830'},
	{id: 11, content: getHistoricLink('1840', 'p267401coll32', '11027'), start: '1840'},
	{id: 12, content: getHistoricLink('1850', 'p267401coll32', '13162'), start: '1850'},
	{id: 13, content: getHistoricLink('1860', 'p267401coll32', '9637'), start: '1860'},
	{id: 14, content: getHistoricLink('1870', 'p267401coll32', '16387'), start: '1870'},
	{id: 15, content: getHistoricLink('1880', 'p267401coll32', '13594'), start: '1880'},
	{id: 16, content: getHistoricLink('1890', 'p267401coll32', '20713'), start: '1890'},
	{id: 17, content: getHistoricLink('1900', 'p267401coll32', '11978'), start: '1900'},
	{id: 18, content: getHistoricLink('1910', 'p267401coll32', '8852'), start: '1910'},
	{id: 19, content: getHistoricLink('1920', 'p267401coll32', '8835'), start: '1920'},
	{id: 20, content: getHistoricLink('1930', 'p267401coll34', '7713'), start: '1930'},
	{id: 21, content: getHistoricLink('1940', 'p267401coll32', '17302'), start: '1940'},
	{id: 22, content: getHistoricLink('1950', 'p267401coll32', '8813'), start: '1950'},
	{id: 23, content: getHistoricLink('1960', 'p267401coll32', '7480'), start: '1960'},
	{id: 24, content: getHistoricLink('1970', 'p267401coll32', '12075'), start: '1970'},
	{id: 25, content: getHistoricLink('1980', 'p267401coll32', '9190'), start: '1980'},
	{id: 26, content: getHistoricLink('1990', 'p267401coll32', '10876 '), start: '1990'},
	{id: 27, content: getHistoricLink('2000', 'p267401coll32', '15448 '), start: '2000'}
]);
var historicOptions = { 
	width: '600%',
	height: 420,
	zoomable: false,
	stack: false,
	horizontalScroll: true,
	stackSubgroups: false,
	orientation: {
		item: 'top',
		axis: 'both'
	},
	min: new Date(1730, 0, 1),
	max: new Date(2240, 0, 1),
	margin: {
		item: {
			horizontal: 600,
			vertical: 20   		
		}
	}
};

//var timeline = new vis.Timeline(historicContainer, historicItems, historicOptions);

// prehistoric timeline
var prehistoricContainer = document.getElementById('prehistoric');
var prehistoricItems = new vis.DataSet([
	{id: 1, content: getPrehistoricLink('Paleoindian Period (13000 BCE-7000 BCE)', 'p267401coll32', '12449'), start: '1000'},
	{id: 2, content: getPrehistoricLink('Archaic Period (8000 BCE-500 BCE)', 'p267401coll7', '299'), start: '1010'},
	{id: 3, content: getPrehistoricLink('Woodland Period (800 BCE-1200 CE)', 'p267401coll32', '11797'), start: '1020'},
	{id: 4, content: getPrehistoricLink('Adena Culture (800 BCE-100 CE)', 'p267401coll32', '12576'), start: '1030'},
	{id: 5, content: getPrehistoricLink('Hopewell Culture (100 BCE-400 CE)', 'p267401coll32', '10260'), start: '1040'},
	{id: 6, content: getPrehistoricLink('Fort Ancient Culture (1000 CE-1650 CE)', 'p267401coll32', '8420'), start: '1050'},
	{id: 7, content: getPrehistoricLink('Late Prehistoric Period (1000 CE-1649 CE)', 'p267401coll32', '12559'), start: '1060'}
]);
var prehistoricOptions = { 
  	width: '100%',
  	height: 420,
  	zoomable: true,
  	stack: false,
  	horizontalScroll: true,
  	stackSubgroups: false,
  	orientation: {
  		item: 'top',
  		axis: 'both'
  	},
  	margin: {
    	item: {
			horizontal: 600,
			vertical: 20   		
    	}
  	}
};

var timeline = new vis.Timeline(timelineContainer, historicItems, historicOptions);
var timelineObj = {
	timeline,
	get timelineRef() {
		return timeline;
	}
}
var prehistoricSettings = {
	prehistoricItems,
	prehistoricOptions,
	get pItems() {
		return prehistoricItems;
	},
	get pOptions() {
		return prehistoricOptions;
	}
}
var historicSettings = {
	historicItems,
	historicOptions,
	get hItems() {
		return historicItems;
	},
	get hOptions() {
		return historicOptions;
	}
}
//var timeline2 = new vis.Timeline(prehistoricContainer, prehistoricItems, prehistoricOptions);


function getPrehistoricLink(period, coll, ptr) {
	var searchterm = period.replace(/^(.*?) \(.*/, "$1");
	var periodlabel = period.replace(/^(.*?)( \(.*)/, "$1<br/>$2");
	return periodlabel + '<br><a href="https://ohiomemory.org/digital/search/searchterm/' + searchterm + '*/field/coverab/mode/exact/conn/and/order/nosort" target="_blank"><img src="https://cdm16007.contentdm.oclc.org/digital/iiif/' + coll + '/' + ptr + '/full/150,150/0/default.jpg"></a>';
}

// attach events to the navigation buttons
document.getElementById('moveLeft').onclick  = function () { move( 0.1); };
document.getElementById('moveRight').onclick = function () { move(-0.1); };
function move (percentage) {
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end:   range.end.valueOf()   - interval * percentage
    });
}