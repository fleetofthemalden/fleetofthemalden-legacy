var ProtoId = 81;
var show = showWorkoutBrian;
var show2 = showWorkout;
var benchString = 'width=350,height=350,left=130,top=5,toolbar=no,scrollbars=no,status=no,resizable=no';
var workString = 'width=350,height=600,left=30,top=5,toolbar=no,scrollbars=no,status=no,resizable=no';
var TEST;

function init(){
	displayQuote();
	user2k();
	set_size();
	event_init();
}

function event_init(){
	
	//Coming Soon!
}

function set_size(){
	if (screen.width >= 699) {
		workString = 'width=600,height=600,left=50,top=20,toolbar=no,scrollbars=no,status=no,resizable=no';
		benchString = 'width=500,height=350,left=150,top=10,toolbar=no,scrollbars=no,status=no,resizable=no';
	}
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

function showBenchBrian() {
 B2k = localStorage['2k'];
 benchWin = window.open(
  'http://tuftsoarsmen.org/dergs/benchmark_show.php?p='+ProtoId+'&best2k='+B2k,
  'benchWin',
  benchString
 );
 benchWin.focus();
}

function showBench() {
 B2k = localStorage['2k'];
 benchWin = window.open(
  'bench.html?bid='+ProtoId+'&Best2k='+B2k,
  'benchWin',
  benchString
 );
 benchWin.focus();
}

function showWorkoutBrian() {
 B2k = localStorage['2k'];
 benchWin = window.open(
  'http://tuftsoarsmen.org/dergs/workout_show.php?pid='+ProtoId+'&best2k='+B2k,
  'benchWin',
  workString
 );
 benchWin.focus();
}

function showWorkout() {
 B2k = localStorage['2k'];
 benchWin = window.open(
  'workout.html?pid='+ProtoId+'&Best2k='+B2k+'&reps=1',
  'benchWin',
  workString
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
		show2 = showBench;
		show = showBenchBrian;
	}
	else{
		show2 = showWorkout;
		show = showWorkoutBrian;
	}
}