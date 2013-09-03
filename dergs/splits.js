var ProtoId = 81;
var show = showWorkout;
var TEST;

function init(){
	displayQuote();
	user2k();
	event_init();
}

function event_init(){
	
	//Coming Soon!
}

function user2k(){
	if(localStorage['2k'] == undefined){
		localStorage['2k'] = 420;
	}
	var y = document.getElementById("target2k");
	var x = localStorage['2k'];
	x = x/2 - 180;
	y.selectedIndex = x;
	update2k();
}

function showBench() {
 B2k = localStorage['2k'];
 benchWin = window.open(
  'http://tuftscrew.org/dergs/benchmark_show.php?p='+ProtoId+'&best2k='+B2k,
  'benchWin',
  'width=600,height=350,left=150,top=20,toolbar=no,scrollbars=no,status=no,resizable=no'
 );
 benchWin.focus();
}

function showWorkout() {
 B2k = localStorage['2k'];
 benchWin = window.open(
  'http://tuftscrew.org/dergs/workout_show.php?pid='+ProtoId+'&best2k='+B2k,
  'benchWin',
  'width=600,height=600,left=50,top=20,toolbar=no,scrollbars=no,status=no,resizable=no'
 );
 benchWin.focus();
}

function update2k(){
	var y = document.getElementById("target2k");
	var x = y.selectedIndex;
	TEST = x;
	localStorage['2k'] = y.getElementsByTagName("option")[x].value;
}

function selectWorkout(type){
	var y = document.getElementById(type);
	var x = y.selectedIndex;
	var z = y.getElementsByTagName("option")[x].value;
	if(z != 6969){
		ProtoId = z;
	}
	if(type == "benchmark"){
		show = showBench;
	}
	else{
		show = showWorkout;
	}
}