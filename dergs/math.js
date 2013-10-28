var wkt;
var B2k = 420;
var pid;
var reps=0;
var work_it;
var parse_v = function (w){return w;};
var unparse_v = function (w){return w;};
var tots;
var t_rest = 0;

var TEST;


function percent2k(rate){
	return 1.5 - (.25/16)*rate;
	//return -0.366385 * Math.log(0.00205715*rate);
}

function splitter(rate){
	return (B2k/4)*percent2k(rate);
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

function total_col(c_name){
	var w = 0;
	if(c_name == "work"){ //parsing of time intervals
		c_name = "Interval_work";
		parse_v = detimify;
		unparse_v = timify;
	}
	var len = wkt[c_name].length;
	for(var i=0; i<len; i++){
		w = w + parse_v(wkt[c_name][i]);
	}
	return unparse_v(w);
}

function init(){
	parse();
}

function parse() {
    var params = self.location.search;
    var text = params.split('&');
    TEST = text;
    B2k = parseInt(text[1].split('=')[1]);
    if(B2k == 0){
    	user2k();
    }
    pid = text[0].split('?')[1];
    var qry = "http://fleetofthemalden.herokuapp.com/ergs.json" + text[0];
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
				tots = function(){
					wkt.Distance = total_col("Interval_work");
					//wkt.Work = "0:00";
				}
			}
			else{
				wkt.atype = "Time";
				work_it = clocker;
				tots = function(){
					wkt.Work = total_col("work");
					wkt.Time = timify(detimify(wkt.Work) + t_rest); //+ rest, need to update db
				}	
			}
			render();
		}
	});
}

function render(){
	var rendering = "<table BORDER=0><tr><td>" + wkt.name + "</td></tr><tr><td><table BORDER=1px><tr id='wkt'><td class='lrgr'>Interval</td><td class='lrgr'>&nbsp;Rate&nbsp;</td><td class='lrgr'>&nbsp;Split&nbsp;</td><td class='lrgr'>&nbsp;" + wkt.atype + "&nbsp;</td></tr>";
	rendering = rendering + add_reps(1) + "</table></td></tr><tr><td><button id='rbutt' class='big_butt' type='button' onclick='rate()'>Rate Difficulty</button></td></tr>";
	tots();
	rendering = rendering + "<tr><td><table><tr><td><table>"
	+ "<tr><td id='time'>Time: " + timify(reps*detimify(wkt.Time)) + "</td></tr>"
	+ "<tr><td id='work'>Work: " + timify(reps*detimify(wkt.Work)) + "</td></tr>"
	+ "<tr><td id='distance'>Distance: " + wkt.Distance*reps + "m</td></tr>"
	+ "<tr><td>&nbsp;</td></tr></table></td><td><FORM>Target 2k<br /><SELECT id='best2k' size=4 onchange='update2k();'>"
	+ "<OPTION VALUE=350>5:50</OPTION><OPTION VALUE=351>5:51</OPTION><OPTION VALUE=352>5:52</OPTION><OPTION VALUE=353>5:53</OPTION><OPTION VALUE=354>5:54</OPTION><OPTION VALUE=355>5:55</OPTION><OPTION VALUE=356>5:56</OPTION><OPTION VALUE=357>5:57</OPTION><OPTION VALUE=358>5:58</OPTION><OPTION VALUE=359>5:59</OPTION><OPTION VALUE=360>6:00</OPTION><OPTION VALUE=361>6:01</OPTION><OPTION VALUE=362>6:02</OPTION><OPTION VALUE=363>6:03</OPTION><OPTION VALUE=364>6:04</OPTION><OPTION VALUE=365>6:05</OPTION><OPTION VALUE=366>6:06</OPTION><OPTION VALUE=367>6:07</OPTION><OPTION VALUE=368>6:08</OPTION><OPTION VALUE=369>6:09</OPTION><OPTION VALUE=370>6:10</OPTION><OPTION VALUE=371>6:11</OPTION><OPTION VALUE=372>6:12</OPTION><OPTION VALUE=373>6:13</OPTION><OPTION VALUE=374>6:14</OPTION><OPTION VALUE=375>6:15</OPTION><OPTION VALUE=376>6:16</OPTION><OPTION VALUE=377>6:17</OPTION><OPTION VALUE=378>6:18</OPTION><OPTION VALUE=379>6:19</OPTION><OPTION VALUE=380>6:20</OPTION><OPTION VALUE=381>6:21</OPTION><OPTION VALUE=382>6:22</OPTION><OPTION VALUE=383>6:23</OPTION><OPTION VALUE=384>6:24</OPTION><OPTION VALUE=385>6:25</OPTION><OPTION VALUE=386>6:26</OPTION><OPTION VALUE=387>6:27</OPTION><OPTION VALUE=388>6:28</OPTION><OPTION VALUE=389>6:29</OPTION><OPTION VALUE=390>6:30</OPTION><OPTION VALUE=391>6:31</OPTION><OPTION VALUE=392>6:32</OPTION><OPTION VALUE=393>6:33</OPTION><OPTION VALUE=394>6:34</OPTION><OPTION VALUE=395>6:35</OPTION><OPTION VALUE=396>6:36</OPTION><OPTION VALUE=397>6:37</OPTION><OPTION VALUE=398>6:38</OPTION><OPTION VALUE=399>6:39</OPTION><OPTION VALUE=400>6:40</OPTION><OPTION VALUE=401>6:41</OPTION><OPTION VALUE=402>6:42</OPTION><OPTION VALUE=403>6:43</OPTION><OPTION VALUE=404>6:44</OPTION><OPTION VALUE=405>6:45</OPTION><OPTION VALUE=406>6:46</OPTION><OPTION VALUE=407>6:47</OPTION><OPTION VALUE=408>6:48</OPTION><OPTION VALUE=409>6:49</OPTION><OPTION VALUE=410>6:50</OPTION><OPTION VALUE=411>6:51</OPTION><OPTION VALUE=412>6:52</OPTION><OPTION VALUE=413>6:53</OPTION><OPTION VALUE=414>6:54</OPTION><OPTION VALUE=415>6:55</OPTION><OPTION VALUE=416>6:56</OPTION><OPTION VALUE=417>6:57</OPTION><OPTION VALUE=418>6:58</OPTION><OPTION VALUE=419>6:59</OPTION><OPTION VALUE=420>7:00</OPTION><OPTION VALUE=421>7:01</OPTION><OPTION VALUE=422>7:02</OPTION><OPTION VALUE=423>7:03</OPTION><OPTION VALUE=424>7:04</OPTION><OPTION VALUE=425>7:05</OPTION><OPTION VALUE=426>7:06</OPTION><OPTION VALUE=427>7:07</OPTION><OPTION VALUE=428>7:08</OPTION><OPTION VALUE=429>7:09</OPTION><OPTION VALUE=430>7:10</OPTION><OPTION VALUE=431>7:11</OPTION><OPTION VALUE=432>7:12</OPTION><OPTION VALUE=433>7:13</OPTION><OPTION VALUE=434>7:14</OPTION><OPTION VALUE=435>7:15</OPTION><OPTION VALUE=436>7:16</OPTION><OPTION VALUE=437>7:17</OPTION><OPTION VALUE=438>7:18</OPTION><OPTION VALUE=439>7:19</OPTION><OPTION VALUE=440>7:20</OPTION><OPTION VALUE=441>7:21</OPTION><OPTION VALUE=442>7:22</OPTION><OPTION VALUE=443>7:23</OPTION><OPTION VALUE=444>7:24</OPTION><OPTION VALUE=445>7:25</OPTION><OPTION VALUE=446>7:26</OPTION><OPTION VALUE=447>7:27</OPTION><OPTION VALUE=448>7:28</OPTION><OPTION VALUE=449>7:29</OPTION><OPTION VALUE=450>7:30</OPTION>"
	+ "</SELECT></FORM></td><td>&nbsp;</td><td><FORM>Reps<br /><SELECT id='reps' size=4 onchange='update_reps();'>"
	+ "<OPTION SELECTED>1</OPTION><OPTION>2</OPTION><OPTION>3</OPTION><OPTION>4</OPTION><OPTION>5</OPTION><OPTION>6</OPTION><OPTION>7</OPTION><OPTION>8</OPTION><OPTION>9</OPTION><OPTION>10</OPTION></SELECT></FORM></td></tr></table></td></tr></table>";
	
	$('#sterling').append(rendering);
	var y = document.getElementById("best2k");
	y.selectedIndex = B2k - 350;
	
}

function add_reps(index){
	var rendering = "";
	var intv;
	var wrate;
	var wsplit;
	var len = wkt.Interval.length;
	for(var i=0; i<len; i++){
		intv = wkt["Interval"][i];
		wrate = wkt["Rate"][i];
		wsplit = splitter(parseInt(wrate));
		rendering = rendering + "<tr id='" + index + "_intv" + i + "'>"; 
		if(wrate == "rest"){
			rendering = rendering
			+ "<td class='rest' ></td>"
			+ "<td class='rest' >" + intv + "</td>"
			+ "<td class='rest' >" + wrate + "</td>"
			+ "<td class='rest' ></td></tr>";
			moar_rest(intv);
		}
		else{
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
	}
	reps++;
	return rendering;
}
	
function update2k(){
	var y = document.getElementById("best2k");
	var x = y.selectedIndex;
	document.location = 'workout.html?' + pid + '&Best2k=' + y.getElementsByTagName("option")[x].value;
}

function update_totals(){
	$('#time').replaceWith("<td id='time'>Time: " + timify(reps*detimify(wkt.Time)) + "</td>");
	$('#work').replaceWith("<td id='work'>Work: " + timify(reps*detimify(wkt.Work)) + "</td>");
	$('#distance').replaceWith("<td id='distance'>Distance: " + wkt.Distance*reps + "m</td>");
}

function update_reps(){
	var y = document.getElementById("reps");
	var x = y.selectedIndex + 1;
	var rendering = "";
	var z = reps;
	var len = wkt.Interval.length;
	if(x < z){
		for(var i = z; i>x; i--){
			for(var j=0; j<len; j++){
				z = '#' + i + '_intv' + j;
				$(z).remove();
			}
			reps--;
		}
	}
	else{
		for(var i = z; i<x; i++){
			rendering = rendering + add_reps(i+1);
		}
		z = '#' + z + '_intv' + (len - 1);
		$(z).after(rendering);
	}
	update_totals();
}

function user2k(){
	if(localStorage['2k'] == undefined){
		localStorage['2k'] = 420;
	}
	B2k = localStorage['2k'];
}

function rate(){
	var text = '<br><form><table>';
	text += '<tr><td>Difficulty:</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td><button class="big_butt" type="button" onclick="submit()">Submit</button></td></tr>';
	text += '<tr><td>Very Easy</td>';
	text += '<td><input type="radio" name="difficulty" value="1"></td>';
	text += '<td><input type="radio" name="difficulty" value="2"></td>';
	text += '<td><input type="radio" name="difficulty" value="3"></td>';
	text += '<td><input type="radio" name="difficulty" value="4"></td>';
	text += '<td><input type="radio" name="difficulty" value="5"></td>';
	text += '<td>DEATH</td></tr></table></form><br>';
	$('#rbutt').replaceWith(text);
}

function submit(){
	alert('halt');
	var rating = new Object();
	rating.rating = $( "input:radio[name=difficulty]:checked" ).val();
	rating.workout = wkt;
	rating.target2k = B2k;
	rating.pid = pid;
	rating.reps = reps;
	//$.post("http://fleetofthemalden.herokuapp.com/rate.json", rating);
	alert("Thank you for your feedback.");
}

function moar_rest(moar){
	t_rest += detimify(moar);
}
	
