/*Copyright 1996 - Tomer and Yehuda Shiran
Feel free to "steal" this code provided that you leave this notice as is.
Additional examples from the book can be found at http://www.geocities.com/SiliconValley/9000/
For more information contact Tomer or Yehuda Shiran <yshiran@iil.intel.com>*/

var wkts = new Array();
var now;


function getWorkouts(cal){
	now = new Date()
	var qry = "http://oldv1kenobi.herokuapp.com/cal.json?month=" + (now.getMonth() + 1) + "&day" + (now.getDay() + 1) + "&cal=" + cal;
	//var qry = "http://oldv1kenobi.herokuapp.com/cal.json?cal=" + cal;
	$.get(qry, function (workouts){
		if(workouts.length == 0){
			document.location = "../dergs/splits.html";
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
	