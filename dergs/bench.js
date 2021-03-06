var wkt;
var B2k = 420;
var bid;
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
		s = Math.round(s);
		if(s < 10){
			s = 0 + s.toString();
		}
		return Math.floor(secs/60) + ":" + s;
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
    if(B2k == 0){
    	user2k();
    }
    bid = text[0].split('?')[1];
    var qry = "http://fleetofthemalden.herokuapp.com/ergs.json" + text[0];
    TEST = qry;
	// $.get(qry, function (workout){ // DM debug
		var workout = ['meow']; // DM debug
		if(workout.length == 0){
			alert("No workout data found");
		}
		else{
			// wkt = workout[0]; // DM debug
			wkt = {"type":"distance","name":"1000 m","Interval":["250","250","250","250"],"Rate":["28","28","28","28"],"Percent2k":["0.952","0.952","0.952","0.952"],"bid":4,"pid":"","_id":{"$oid":"54249d6e280f058555f5cda2"}}
			wkt.Interval_work = new Array();
			if(wkt.Interval == null){
				wkt.Interval = wkt['Interval[]']
			}
			if(wkt.Rate == null){
				wkt.Rate = wkt['Rate[]']
			}
			if(wkt.Percent2k == null){
				wkt.Percent2k = wkt['Percent2k[]']
			}
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
	// }); // DM debug
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

function user2k(){
	if(localStorage['2k'] == undefined){
		localStorage['2k'] = 420;
	}
	B2k = localStorage['2k'];
}

