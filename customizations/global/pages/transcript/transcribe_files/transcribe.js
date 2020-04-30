(function ($) {

if(window.location.pathname.indexOf('transcribe.php') > 0) {
	
	$(document).ready(function() {
	
		// initalize the idle timer
        var
            session = {
                //Logout Settings
                inactiveTimeout: 1200000,     //(ms) The time until we display a warning message
                warningTimeout: 10000,      //(ms) The time until we log them out
                minWarning: 5000,           //(ms) If they come back to page (on mobile), The minumum amount, before we just log them out
                warningStart: null,         //Date time the warning was started
                warningTimer: null,         //Timer running every second to countdown to logout
                logout: function () {       //Logout function once warningTimeout has expired
                	window.onbeforeunload = null;
					var formData = jQuery( 'form.ajaxsave' ).serializeArray();
					var unid = store.get('transcribe').uniqueId;
					formData.push( {name: "action", value: "edit-timeout" } );
					formData.push( {name: "uniqueid", value: unid} );
					jQuery.ajax({
						url: "savetranscript.php",
					    data: formData,
					    type: "POST"
					})
					.done(function( data ) {
				    	store.remove('transcribe');
				    	jQuery("#myModal").modal("hide");
						jQuery(document).idleTimer("destroy");
						window.location.href = "logout.php";
					})
					.fail(function( xhr, status, errorThrown ) {
						//console.log( "Error: " + errorThrown );
					    //console.log( "Status: " + status );
					});
					// event.stopPropagation();
					// http://transcribe.ohiohistory.org/transcribe.php?coll=p16007coll51&id=2308&page=1
                },

                //Keepalive Settings
                keepaliveTimer: null,
                keepaliveUrl: "",
                keepaliveInterval: 5000,     //(ms) the interval to call said url
                keepAlive: function () {
                    jQuery.ajax({ url: session.keepaliveUrl });
                }
            }
        ;

        $(document).on("idle.idleTimer", function (event, elem, obj) {
            //Get time when user was last active
            var
                diff = (+new Date()) - obj.lastActive - obj.timeout,
                warning = (+new Date()) - diff
            ;
            
            //On mobile js is paused, so see if this was triggered while we were sleeping
            if (diff >= session.warningTimeout || warning <= session.minWarning) {
                session.logout();
            } else {
                //Show dialog, and note the time
                jQuery('#sessionSecondsRemaining').html(Math.round((session.warningTimeout - diff) / 1000));
                jQuery("#myModal").modal("show");
                session.warningStart = (+new Date()) - diff;
				
                //Update counter downer every second
                session.warningTimer = setInterval(function () {
                    var remaining = Math.round((session.warningTimeout / 1000) - (((+new Date()) - session.warningStart) / 1000));
                    if (remaining >= 0) {
                        jQuery('#sessionSecondsRemaining').html(remaining);
                    } else {
                        session.logout();
                    }
                }, 1000)
            }
        });

        // create a timer to keep server session alive, independent of idle timer
        session.keepaliveTimer = setInterval(function () {
            session.keepAlive();
        }, session.keepaliveInterval);

        //User clicked ok to extend session
        $("#extendSession").click(function () {
            var formData = $( 'form.ajaxsave' ).serializeArray();
			var unid = store.get('transcribe').uniqueId;
			formData.push( {name: "action", value: "edit-save" } );
			formData.push( {name: "uniqueid", value: unid} );
			$.ajax({
				url: "savetranscript.php",
			    data: formData,
			    type: "POST"
			})
			.done(function( data ) {
				//console.log(data);
			})
			.fail(function( xhr, status, errorThrown ) {
				//console.log( "Error: " + errorThrown );
			    //console.log( "Status: " + status );
			});
			clearTimeout(session.warningTimer);
			$( document ).idleTimer("reset");
			
        });

        //Set up the timer, if inactive for 10 seconds log them out
		$(document).idleTimer(session.inactiveTimeout);
		
		// jQuery textarea resizer plugin
		$('textarea.form-transcriptdata-field:not(.processed)').TextAreaResizer();
		$('textarea.assetnotes:not(.processed)').TextAreaResizer(); 
			
	    // save effects
	    var clickAction = "";
		$('input[type="submit"]').click(function(evt) {
			clickAction = evt.target.id;
			if (clickAction === "edit-save") {
				$( "#edit-save" ).val("Saved").fadeIn( 2000 );
				setTimeout(function(){ 
					$( "#edit-save" ).val("Save Progress").delay(2000).fadeIn( 2000 ); 
				}, 2000);
			}
			if (clickAction === "edit-complete") {
				$( "#edit-complete" ).val("Marked as Complete").fadeIn( 2000 );
				//store.remove('transcribe');
			}
			if (clickAction === "edit-send") {
				$( "#edit-send" ).val("Sent").fadeIn( 2000 );
				setTimeout(function(){ 
					$( "#edit-send" ).val("Submit").delay(2000).fadeIn( 2000 ); 
				}, 2000);
			}
		});
	    
	    // save form data
	    $('form.ajaxsave').submit(function(event) {
			event.preventDefault();
			var submitValue = clickAction;
			var returnedData = "1";
			var formData = $( event.currentTarget ).serializeArray();
			var unid = store.get('transcribe').uniqueId;
			formData.push( {name: "action", value: submitValue} );
			formData.push( {name: "uniqueid", value: unid} );
			$.ajax({
				url: "savetranscript.php",
			    data: formData,
			    type: "POST"
			})
			.done(function( data ) {
				if (data == 'sent') {
					return;
				}
			    if (data == '2') {
			    	//store.remove('transcribe');
					//$(document).idleTimer("destroy");
					//window.location.href = "logout.php";
					//$("#transcribr-site-transcribe-form :input").attr("disabled", true);
					setTimeout(function(){ 
						$("#transcribr-site-transcribe-form :input").attr("disabled", true);
					}, 2000);
			    }
			    if (data == "1") {
			    	$('#edit-transcriptdata').text(data);
			    }
			})
			.fail(function( xhr, status, errorThrown ) {
				//console.log( "Error: " + errorThrown );
			    //console.log( "Status: " + status );
			})
			.always(function( data ) {
				return;
			});
			
			event.stopPropagation();
	    });
		
		// save function
		function saveData(formData) {
			$.ajax({
				url: "savetranscript.php",
			    data: formData,
			    type: "POST"
			})
			.done(function( data ) {
				//console.log(data);
				return data;
			})
			.fail(function( xhr, status, errorThrown ) {
				//console.log( "Error: " + errorThrown );
			    //console.log( "Status: " + status );
			})
			.always(function( data ) {
				return data;
			});
		}
	    
	    // initialize sisyphus	
		$(function() {
			$( "form" ).sisyphus({
				onSave: function() {
					var formData = $( 'form#transcribr-site-transcribe-form' ).serializeArray();
					var unid = store.get('transcribe').uniqueId;
					formData.push( {name: "action", value: 'edit-save'} );
					formData.push( {name: "uniqueid", value: unid} );
					saveData( formData ); 
				},
				locationBased: true,
				timeout: 60
			});
		});
	    
	    // instructions modal
	    $('#transcription-form-help-button').click(function(event) {
			$("#instructionsModal").modal("show");
			event.preventDefault();
		});
        
		if (store.get('transcribe') !== undefined) {
			
			var storedId = store.get('transcribe').uniqueId;
        	
			if (storedId.indexOf(tId) > -1) {
				// need to check on uid
				var storeTid = storedId.split("_");
				uId = storeTid[1]; 
			} else {
				store.set('transcribe', { uniqueId: uId });
			}
        } else {
			store.set('transcribe', { uniqueId: uId });
		}
		var pageData = {};
		if (store.get('approve') !== undefined) {
			store.set('transcribe', { uniqueId: uId + "_" + store.get('approve').appid });
			pageData = { itemTitle: itmTitle, pageId: pId, recId: rId, transcriptId: tId, collAlias: cAlias, currPage: cPage, pageTotal: pTotal, uniqueId: uId + "_" + store.get('approve').appid }
		} else {	        		
			pageData = { itemTitle: itmTitle, pageId: pId, recId: rId, transcriptId: tId, collAlias: cAlias, currPage: cPage, pageTotal: pTotal, uniqueId: uId }
		}
		
		$.ajax({
			url: "updatestatus.php",
		    data: pageData,
		    type: "POST"
		})
		.done(function( data ) {
			
			// 0 = in use, 1 = ok to transcribe, 2 = all pages complete, 3 = this page is complete
			var dataObj = JSON.parse(data);
			//console.log(dataObj.code);
		  	if (dataObj.code == '0') {
		  		store.remove('transcribe');
		    	$("#inUseModal").modal("show");
		    	$("#transcribr-site-transcribe-form :input").attr("disabled", true);
		    }
		    if (dataObj.code == '3') {
		    	$('#edit-transcriptdata').val(dataObj.text);
		  		//store.remove('transcribe');
		    	$("#doneModal").modal("show");
		    	$("#transcribr-site-transcribe-form :input").attr("disabled", true);
		    }
		    if (dataObj.code == '2') {
		    	store.remove('transcribe');
				$(document).idleTimer("destroy");
				window.location.href = "logout.php";
		    }
		    if (dataObj.code == '1') {
		    	for ( var i = 0, len = localStorage.length; i < len; ++i ) {
					currPage = window.location.href.substring(7) + 'transcribr-site-transcribe-formtranscribr-site-transcribe-formtranscriptdata';
					var lsKey = localStorage.key(i);
					if (lsKey == currPage) {
						if (lsKey.length > dataObj.text.length) {
							$('#edit-transcriptdata').text(localStorage.getItem( localStorage.key( i ) ));
						} else {
							$('#edit-transcriptdata').val(dataObj.text);
						}
					} else {
						$('#edit-transcriptdata').val(dataObj.text);
					}
				}
		    }
		    
		})
		.fail(function( xhr, status, errorThrown ) {
			//console.log( "Error: " + errorThrown );
		    //console.log( "Status: " + status );
		});
	
	});
	
}
	
})(jQuery);