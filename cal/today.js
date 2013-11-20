var TEST, TEST2;

function getWorkouts(cal){
	var params = self.location.search;
	var qry;
	var wkts = new Array();
    if(params.length > 1){
    	qry = "http://fleetofthemalden.herokuapp.com/cal.json" + params + "&cal=" + cal;
	}
	else{
		var now = new Date()
		qry = "http://fleetofthemalden.herokuapp.com/cal.json?month=" + (now.getMonth() + 1) + "&day=" + now.getDate() + "&cal=" + cal;
		//qry = "http://fleetofthemalden.herokuapp.com/cal.json?month=" + (now.getMonth() + 1) + "&cal=" + cal;
		//qry = "http://fleetofthemalden.herokuapp.com/cal.json?cal=" + cal;
	}
	//TEST = qry;
	$.get(qry, function (workouts){
		//TEST = workouts;
		if(workouts.length == 0){
			var text = "<p>None</p>";
			$("#main").append(text);
		}
		if(workouts.length == 1){
			var text = getWorkoutText(workouts[0], 0);
			var temp = text.split('"')[1];
			if(temp == "clickable"){
				$("#main").append(text);
			}
			else{
				document.location = temp;
			}
		}
		else{
			var text = "<ul>";
			for(var i=0; i<workouts.length; i++){
				text += "<li>" + getWorkoutText(workouts[i], i) + "</li>";
			}
			text += "</ul>";
			$("#main").append(text);
		}
	});
	
}

function getWorkoutText(wkt, i){
	var text = wkt.a;
	text = text.split("'>");
	if(text[0].search("<a href='http://www.fleetofthemalden.com/cal/todays_wkt_" + wkt.cal + ".html") > -1){
		text = text[1].split('</a>')[0];
		var funBody = '$("#d' + i + '").html("&nbsp;&nbsp;&nbsp;&nbsp;' + wkt.descrip + '");';
		var script = '<script>$("#a' + i + '").click(function(){' + funBody + '});</script>';
		text = '<a class="clickable" id="a' + i + '">' + text + '</a>';
		text += '<div id="d' + i + '">' + script + '</div>';
		return text;
	}
	else{
		return wkt.a;
	}
}