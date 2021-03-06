﻿
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var HOSTDOMAIN = window.location.hostname;
var CDMHOSTDOMAIN = HOSTDOMAIN == "localhost" ? "cdm16007.contentdm.oclc.org" : "ohiomemory.org";
var THIS_HOST = "https://" + CDMHOSTDOMAIN;
var THIS_PAGE = "https://" + CDMHOSTDOMAIN + "/digital/custom/browse";
// CDM host domain
var CDM_HOST = "https://ohiomemory.org";
// Collection alias from which you want to retrieve controlled vocabulary
var COLL_ALIAS = "p267401coll32";
var LETTER_VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var browse_field = getParameterByName('field');
if (browse_field == null || browse_field == '') { browse_field = 'subjec'; }
var letterList = "";
for (var i=0; i < LETTER_VALUES.length; i++) {
    if (!isNaN(LETTER_VALUES[i]) && browse_field != "subjec") { continue; }
    letterList += '<li><a href="' + THIS_PAGE + '?letter=' + LETTER_VALUES[i] + '&field=' + browse_field + '">' + LETTER_VALUES[i] + '</a></li>';
}

// Only relevant if you want to browse specific field values (in this case a list of specific Ohio Memory participant names from the DC contributor field)
// http://server16007.contentdm.oclc.org/dmwebservices/index.php?q=dmGetCollectionList/json
var CUSTOM_BROWSE = ["Adams County Historical Society", "Aeronautical Systems Center History Office, WPAFB", "Akron-Summit County Public Library", "Alexandria Museum & Historical Society", "Allen County Museum", "Amherst Historical Society and Sandstone Center Museum", "Amherst Public Library", "Amherst Public Library", "Antioch College", "Archives of the Archdiocese of Cincinnati", "Ashland County Historical Society and Museum", "Ashland University", "Ashtabula County District Library, Geneva Library Branch", "Athenaeum of Ohio", "Athens County Historical Society and Museum", "Attica Area Historical Society", "Auglaize County Historical Society", "Barberton Public Library", "Bellevue Public Library", "Belpre Historical Society", "Birchard Public Library", "Black River Historical Society", "Bluffton Public Library", "Bradford Public Library", "Brecksville Historical Association", "Briggs Lawrence County Public Library", "Brimfield Memorial House Association\/ Kelso House Museum", "Bristol Public Library", "Brumback Library", "Bucyrus Historical Society", "Bucyrus Public Library", "Butler County Museum", "Caldwell Public Library", "Capitol Square Review and Advisory Board", "Carillon Historical Park", "Carnegie Public Library", "Carroll County District Library", "Carroll County Historical Society", "Case Western Reserve University", "Center for Archival Collections--Bowling Green State University", "Centerburg Public Library and Local History Center", "Centerville-Washington Township Historical Society", "Champaign County Historical Society", "Champaign County Library", "Children's Hospital (Columbus)", "Chillicothe and Ross County Public Library", "Chippewa-Rogues' Hollow Historical Society", "Cincinnati Art Museum", "Cincinnati Medical Heritage Center, University of Cincinnati", "Cincinnati Museum Center", "Cincinnati Zoo & Botanical Garden", "Clark County Historical Society", "Clark County Public Library", "Claymont School District Public Library", "Clermont County Historical Society", "Cleveland City Council Archives", "Cleveland Clinic Foundation", "Cleveland Heights Historical Society", "Cleveland Institute of Art", "Cleveland Institute of Music", "Cleveland Metroparks Zoo", "Cleveland Museum of Art", "Cleveland Museum of Natural History", "Cleveland Orchestra", "Cleveland Public Library", "Cleveland Public Library, Photograph Collection", "Cleveland Public Library, Preservation", "Cleveland Public Library, Science & Technology Department", "Clinton County Historical Society", "Clyde Public Library", "Columbia Historical Society, Inc.", "Columbus Metropolitan Library", "Columbus Zoo Library", "Coshocton Public Library", "Cowan Pottery Museum", "Creston Historical Society", "Cuyahoga County Archives", "Cuyahoga Falls Historical Society", "Dalton Community Historical Society", "Darke County Historical Society", "Dawes Arboretum", "Dayton Aviation Heritage National Historical Park", "Dayton and Montgomery County Public Library", "Defiance Public Library", "Delphos Canal Commission", "Delta Public Library", "Denison University", "Dittrick Medical History Center", "Dominican Sisters, St. Mary of the Springs", "Dover Historical Society", "Dr. Samuel L. Bossard Memorial Library", "Dublin Public Library and Dublin Historical Society", "Edison Birthplace Museum", "Edna L. Bowyer Records Center & Archives of Warren County", "Edward Huber Machinery Museum", "Elyria Public Library", "Euclid Historical Museum", "Evangelical Lutheran Church in America, Region 6 Archives", "Evergreen Community Library", "Fayette County Courthouse", "Findlay-Hancock County Public Library", "Firelands Historical Society", "First Baptist Church of Delaware", "Flesh Public Library and Museum", "Forest Jackson Public Library", "Fort Laurens State Memorial", "French Art Colony", "Gahanna Historical Society", "Garnet A. Wilson Public Library", "Geauga County Historical Society", "Gorman Heritage Farm", "Greater Loveland Historical Society Museum", "Greene County Historical Society", "Greene County Public Library", "Greene County Records Center and Archives", "Guernsey County Historical Society", "Hancock Historical Museum", "Harbor-Topky Memorial Library", "Hardin County Museums", "Harding Hospital Museum", "Harris-Elmore Public Library", "Harrison County Historical Society", "Henderson Memorial Public Library", "Herrick Memorial Library", "Highland County District Library", "Highland County Historical Society", "Hiram College", "Hiram Historical Society", "Historical Collections of the Great Lakes", "Holmes County Historical Society", "Holy Cross-Immaculata Church", "Hopewell Culture National Historical Park", "Hudson Library and Historical Society", "Huron Historical Society", "Huron Public Library", "Jack Nicklaus Museum", "Jackson Center Historical Society", "Jacob Rader Marcus Center of the American Jewish Archives", "Jefferson Depot, Inc.", "John Paulding Historical Society", "Johnny Appleseed Museum", "Kelton House Museum and Garden", "Kent Historical Society", "Kent State University", "Kent State University Museum", "Killbuck Valley Museum", "Kinsman Free Public Library", "Kirtland Temple Historic Site", "Knox County Historical Society", "Lake Erie Islands Historical Society", "Lake Township Historical Society", "Lake View Cemetery", "Lakeside Heritage Society, Inc.", "Lakewood Public Library", "Lane Public Library", "Licking County Historical Society", "Lillian Jones Museum", "Logan County District Library", "Logan County Historical Society", "Lorain City Schools", "Lorain County Historical Society", "Lorain Public Library System", "Loudonville Public Library", "Lucy Hayes Heritage Center", "Lynchburg Historical Society", "Madison County Historical Society", "Mahoning Valley Historical Society", "Malabar Farm State Park", "Manchester Historical Society", "Mansfield Reformatory Preservation Society", "Mansfield-Richland County Public Library", "Marietta College", "Marion County Historical Society", "Marion Palace Theatre", "Marion Union Station Association", "Marshallville Historical Society", "Mary L. Cook Public Library", "Mary Lou Johnson-Hardin County District Library", "Massillon Museum", "Massillon Museum Foundation, Inc.", "Massillon Public Library", "McComb Public Library", "McCook House Museum", "McKinley Birthplace Home and Research Center", "McKinley Memorial Library", "McKinley Museum and National Memorial", "Mechanicsburg Public Library", "Medical Heritage Center, Ohio State University", "Mentor Public Library", "Mercer County Historical Museum", "Methodist Theological School in Ohio", "Miami Conservancy District", "Miami University", "Miami University Archives", "Miamisburg Historical Society", "Middletown Public Library", "Mill Creek MetroParks", "Missionaries of the Precious Blood", "Montgomery County Historical Society", "Moreland Hills Historical Society", "Mount Vernon Nazarene University", "Munroe Falls Historical Society", "Museum of Carousel Art & History", "Myers University", "NASA Office of Public Affairs", "National Afro-American Museum and Cultural Center", "National Heisey Glass Museum", "National Museum of the United States Air Force", "Neil Armstrong Air & Space Museum", "Noble County Historical Society", "Norwalk Public Library", "NORWELD", "Notre Dame College", "Oak Harbor Public Library", "Oak Hill Public Library", "Oberlin College Archives", "Ohio Agricultural Research and Development Center", "Ohio Department of Natural Resources", "Ohio Dominican University", "Ohio Genealogical Society", "Ohio Historical Society", "Ohio State University Archives", "Ohio State University Cartoon Research Library", "Ohio State University Music and Dance Library", "Ohio State University Orton Geological Museum", "Ohio State University Rare Books", "Ohio State University Theatre Research Institute", "Ohio State University, John Glenn Archives", "Ohio University, Mahn Center for Archives & Special Collections", "Ohio Wesleyan University Historical Collection", "Ohioana Library", "Old St. Mary's Church", "Ottawa County Museum", "Otterbein College", "Patrick Henry School District", "Paulding County Carnegie Library", "Pemberville Public Library", "Peninsula Library and Historical Society\/Cuyahoga Valley Historical Museum", "Perry's Victory and International Peace Memorial", "Piatt Castles", "Pickaway County Historical Society", "Pike Heritage Foundation Museum", "Pioneer & Historical Society of Muskingum", "Piqua Historical Area State Memorial", "Plain City Public Library and Plain City Historical Society", "Pontifical College Josephinum", "Portage County Historical Society", "Portsmouth Public Library", "Preble County District Library", "Procter & Gamble Company Corporate Archives", "Public Library of Cincinnati & Hamilton County", "Public Library of Youngstown and Mahoning Co.", "Puskarich Public Library", "Putnam County District Library", "Putnam County Historical Society", "Quaker Meeting House", "Reed Memorial Library", "Richland County Historical Society", "Ritter Public Library", "Rocky River Historical Society", "Rocky River Public Library", "Rose Melnick Medical Museum Youngstown State University", "Ross C. Purdy Museum", "Ross County Historical Society", "Rossford Public Library", "Rutherford B. Hayes Presidential Library and Museums", "Salem Historical Society", "Sandusky Library\/Follett House Museum", "Sauder Village", "Scioto County Historical Society", "Selover Public Library", "Seville Historical Society", "Shaker Heights Public Library", "Shaker Historical Society", "Shawnee State University", "Shelby County Historical Society", "Sinclair Community College", "Sisters of Notre Dame", "Sisters of St. Francis", "Sisters of the Precious Blood", "Smith Library of Regional History", "South Euclid Historical Society", "Southern Ohio Museum", "Southwest Public Libraries", "St. John's Episcopal Church of Worthington", "St. Paris Public Library", "Stark County District Library", "State Library of Ohio", "Steamship William G. Mather Museum", "Stow-Munroe Falls Public Library", "Strongsville Historical Society", "Summit County Probate Court", "Swanton Public Library", "Taft Museum of Art", "Tallmadge Historical Society", "The Castle", "Thurber House", "Tiffin-Seneca Public Library", "Toledo Museum of Art", "Toledo Lucas County Public Library", "Tuscarawas County Historical Society", "Twinsburg Public Library", "Union County Historical Society", "Union Township Public Library", "United Church of Christ Archives", "University of Akron", "University of Cincinnati", "University of Cincinnati German-Americana Collection", "University of Dayton", "University of Findlay", "University of Rio Grande", "Upper Sandusky Community Library", "Urbana University", "Ursuline College", "Ursulines of Brown County", "Wadsworth Public Library", "Ward M. Canaday Center, University of Toledo", "Washington County Public Library", "Waterville Historical Society", "Watt Center for History & the Arts", "Wauseon Public Library", "Way Public Library", "Wayne County Public Library", "Wayne County Public Library - Shreve Branch", "Wells Public Library", "Hurt\/Battelle Memorial Library", "Western Reserve Historical Society", "Westerville Public Library", "Westlake Porter Public Library", "Wickliffe Public Library", "Wilberforce University", "William Holmes McGuffey Museum", "William Howard Taft National Historic Site", "Williams County Public Library", "Willoughby Historical Society", "Willoughby-Eastlake Public Library", "Willoughby-Eastlake Public Library - Eastlake", "Willoughby-Eastlake Public Library - Willoughby", "Wood County District Public Library", "Wood County Historical Center", "Wornstaff Memorial Public Library", "Worthington Historical Society", "Worthington Libraries", "Wright State University", "Wyandot County Historical Society", "Youngstown Historical Center of Industry and Labor", "Youngstown State University Archives & Special Collections"];

// get the user-selected letter or number
var browse_letter = getParameterByName('letter');
if (browse_letter == "" || browse_letter == null) {
	// set default browse letter ("1" for subjects; "A" for places or particpant names)
	var browse_letter = (browse_field == "subjec") ? "1" : "A";
}
// Our display field name is "place", but is actually mapped to "coveraa" for purposes of retrieving place vocabulary
var dc_field = (browse_field == "place") ? "coveraa" : browse_field;
var browse_array = [];

// if contributor need to use controlled vocab from Ohio Memory Collection: p267401coll36
if (browse_field == 'contri') { COLL_ALIAS = "p267401coll36"; }

var requestUrl = "";

if (browse_field != 'contri') {
	// https://ohiomemory.org/digital/bl/dmwebservices/index.php?q=dmGetCollectionFieldVocabulary/p267401coll36/contri/0/0/json
	requestUrl = "https://ohiomemory.org/digital/bl/dmwebservices/index.php?q=dmGetCollectionFieldVocabulary/" + COLL_ALIAS + "/" + browse_field + "/0/0/json";
	
	var request = new XMLHttpRequest();
	request.open('GET', requestUrl, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			browse_array = JSON.parse(request.responseText);
			var itemList = "";
			itemList += '<div id="tabs"' + ((browse_field == "coveraa") ? 'style="width:300px;' : '') + '">';
			itemList += '<p><b>' + browse_letter + ':</b></p>';
			for (i = 0; i < browse_array.length; i++) {
				if (browse_array[i].match(/^[^0-9A-Za-z].+/)) { continue; }
				browse_upper = browse_array[i].charAt(0).toUpperCase();
				
				var current_letter = browse_upper.substr(0, 1);
				if (current_letter == browse_letter) {
					itemList += '<p><a href="' + CDM_HOST + '/digital/search/searchterm/' + 
					browse_array[i].replace(/\//g, "%252F") + 
					'/field/' + dc_field + '/mode/exact/conn/and/order/nosort">' + 
					browse_array[i] + '</a></p>';
				}
			}

			itemList += '</div>';
			itemList += '<div id="countyMap">';
			itemList += (browse_field == "place") ? '<img src="/customizations/global/pages/browse_resources/OM_LocationBrowseMap_FINAL.png" alt="Map of Ohio" usemap="#county" border="0" class="responsive">' : ''; 
			itemList += '</div>';

			document.getElementById('navlist').innerHTML = letterList;

			document.getElementById('browseContainer').innerHTML = itemList;
			
			if (browse_field == 'place') { imageMapResize(); }
			
		} else {
			// returned an error
		}
	};
	request.onerror = function() {
		// connection error
	};
	request.send();

} else {

	requestUrl = 'https://ohiomemory.org/customizations/global/pages/browse_resources/contributors.txt';
	var request = new XMLHttpRequest();
	request.open('GET', requestUrl, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			browse_array = request.responseText.split(/\r\n/g);
			var itemList = "";
			itemList += '<div id="tabs">';
			itemList += '<b>' + browse_letter + '</b>:<br>';
			for (i = 0; i < browse_array.length; i++) {
				if (browse_array[i].match(/^[^0-9A-Za-z].+/)) { continue; }
				browse_upper = browse_array[i].charAt(0).toUpperCase();
				
				var current_letter = browse_upper.substr(0, 1);
				if (current_letter == browse_letter) {
					itemList += '<p><a href="' + CDM_HOST + '/digital/search/searchterm/' + 
					browse_array[i].replace(/\//g, "%252F") + 
					'/field/' + dc_field + '/mode/exact/conn/and/order/nosort">' + 
					browse_array[i] + '</a></p>';
				}
			}

			itemList += '</div>';

			document.getElementById('navlist').innerHTML = letterList;

			document.getElementById('browseContainer').innerHTML = itemList;
			
		} else {
			// returned an error
		}
	};
	request.onerror = function() {
		// connection error
	};
	request.send();
	

}

