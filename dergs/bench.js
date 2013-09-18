var wkt;
var B2k = 420;
var p;
var reps=0;
var work_it;


var TEST;


function splitter(pct2k){
	return (B2k/4)*pct2k;
}

function timify(secs){
	if(secs == 0 | secs == NaN){
		return "";
	}
	else{
		var s = secs%60
		if(s < 10){
			s = 0 + s.toString();
		}
		else{
			s = s.toString();
		}
		return Math.floor(secs/60) + ":" + s.slice(0,2);
	}
}

function detimify(time){
	var secs = time.split(':');
	return parseInt(secs[0])*60 + parseInt(secs[1]);
}

function distancer(intv, split){
	return Math.round((detimify(intv)/split)*500);
}

function clocker(intv, split){
	return timify(intv*split/500);
}

function init(){
	parse();
}

function parse() {
    var params = self.location.search;
    var text = params.split('&Best2k=');
    B2k = parseInt(text[1]);
    p = text[0].split('?')[1];
    var qry = "http://oldv1kenobi.herokuapp.com/ergs.json" + text[0];
    TEST = qry;
	$.get(qry, function (workout){
		if(workout.length == 0){
			alert("No workout data found");
		}
		else{
			wkt = workout[0];
			wkt.Interval_work = new Array();
			if(wkt.type == "time"){
				wkt.atype = "Meters"
				work_it = distancer;
			}
			else{
				wkt.atype = "Time";
				work_it = clocker;
			}
			render();
		}
	});
}

function render(){
	var rendering = "<table BORDER=0><tr><td>" + wkt.name + "</td></tr><tr><td><table BORDER=1px><tr id='wkt'><td class='lrgr'>Interval</td><td class='lrgr'>&nbsp;Rate&nbsp;</td><td class='lrgr'>&nbsp;Split&nbsp;</td><td class='lrgr'>&nbsp;" + wkt.atype + "&nbsp;</td></tr>";
	rendering = rendering + add_reps(1) + "</table></td></tr></table></td></tr>";
	$('#sterling').append(rendering);
}

function add_reps(index){
	var rendering = "";
	var intv;
	var wrate;
	var wsplit;
	var pct2k;
	var len = wkt.Interval.length;
	for(var i=0; i<len; i++){
		intv = wkt["Interval"][i];
		wrate = wkt["Rate"][i];
		pct2k = parseFloat(wkt["Percent2k"][i]);
		wsplit = splitter(pct2k);
		rendering = rendering + "<tr id='" + index + "_intv" + i + "'>"; 
		var iwork = work_it(intv, wsplit);
		rendering = rendering
		+ "<td class='lrg' >" + intv + "</td>"
		+ "<td class='lrg' >" + wrate + "</td>"
		+ "<td class='lrg' >" + timify(wsplit) + "</td>"
		+ "<td class='lrg' >" + iwork + "</td></tr>";
		if(index == 1){
			wkt.Interval_work[i] = iwork;
		}
	}
	return rendering;
}
	

