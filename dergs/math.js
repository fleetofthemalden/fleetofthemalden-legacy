var wkt;
var B2k;
var params;
var text;

var test;

function percent2k(rate){
	return 1.5 - (.25/16)*rate;
}

function splitter(rate){
	return (B2k/4)*percent2k(rate);
}

function parse() {
    params = self.location.search;
    text = params.split("&Best2k=");
    B2k = parseInt(text[1]);
    var qry = "http://oldv1kenobi.herokuapp.com/ergs.json" + text[0];
	$.get(qry, function (workout){
		if(workout.length == 0){
			alert("No workout data found");
			test = workout;
		}
		else{
			wkt = workout[0];
			test = workout;
		}
	});
}