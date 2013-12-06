$(document).ready(function(){
	Parse.initialize("bQaJxvxWVpct8bwIZMbNmeQC2DLcX39wa7YKBgNI", "VtCsI1grMNhCY1LZuowfdk7ifshFBPykyAmCTdpb");
	update();
});


var TEST;

function update(){
	var AnyFile = Parse.Object.extend("fileRef");
	var query = new Parse.Query(AnyFile);
	var team = $('#cal-data').data('cal');
	query.equalTo("cal", team);
	query.find({
  		success: function(results) {
	    	var text = '<h3>Files</h3><ul>';
		    for (var i = 0; i < results.length; i++) { 
      			var object = results[i]['attributes'];
      			var name = object['name'];
	      		text += '<li><a href="' + object['link'] + '">' + object['name'] + '</a></li>';
    		}
    		text +=  '</ul><br /><br />';
			$('#file_list').html(text);
	  	},
  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
	liftUpdate(team);
}

function liftUpdate(team){
	var liftExpiry = localStorage['LiftExpiry'];
	if(liftExpiry === undefined || liftExpiry < new Date()){
	
	var qry = "Q1fxzT6hPv";
  	if(team == "vwomen"){
  		qry = "ghTFn5ocxi";
  	}
	var LiftFile = Parse.Object.extend("fileReference");
	var query = new Parse.Query(LiftFile);
	query.get(qry, {
  		success: function(liftRef) {
    		localStorage['LiftA'] = liftRef.get("a");
    		localStorage['LiftB'] = liftRef.get("b");
    		localStorage['LiftC'] = liftRef.get("c");
    		localStorage['LiftExpiry'] = new Date(liftRef.updatedAt.getTime() + 1814400000);
    		//TEST = liftRef;
  		},
  		error: function(object, error) {
  			alert("Error: " + error.code + " " + error.message);
  		}
	});
	}
}