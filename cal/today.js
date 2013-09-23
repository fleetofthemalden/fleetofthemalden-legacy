

function getWorkouts(cal){
	var wkts = new Array();
	var now = new Date()
	var qry = "http://oldv1kenobi.herokuapp.com/cal.json?month=" + (now.getMonth() + 1) + "&day" + (now.getDay() + 1) + "&cal=" + cal;
	//var qry = "http://oldv1kenobi.herokuapp.com/cal.json?cal=" + cal;
	$.get(qry, function (workouts){
		if(workouts.length == 0){
			var text = "<p>None</p>";
			$("#main").append(text);
		}
		if(workouts.length == 1){
			var text = workouts[0].a;
			document.location = text.split("'")[1];
		}
		else{
			var text = "<ul>";
			for(var i=0; i<workouts.length; i++){
				text += "<li>" + workouts[i].a + "</li>";
			}
			text += "</ul>";
			$("#main").append(text);
		}
	});
	
}
	