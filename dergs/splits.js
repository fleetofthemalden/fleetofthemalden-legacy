var ProtoId = 81;
var show = showWorkoutBrian;
var show2 = showWorkout;
var benchString = 'width=350,height=350,left=130,top=5,toolbar=no,scrollbars=no,status=no,resizable=no';
var workString = 'width=350,height=600,left=30,top=5,toolbar=no,scrollbars=no,status=no,resizable=no';
var TEST;

function init(){
	displayQuote();
	user2k();
	cachedCustom();
	set_size();
	//event_init();
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

function cachedCustom(){
	var custom = localStorage['custom'];
	if(custom == undefined){
		updateCustom();
	}
	else{
		//$(custom).insertBefore('#updateCustom');
		displayCustom(custom);
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

function updateCustom(){
	var qry = "";
	qry = "http://fleetofthemalden.herokuapp.com/clist.json";
	$.get(qry, function (workouts){
		if(workouts.length == 0){
			alert("No workout data found");
			//TEST = workouts;
		}
		else{
			var customs = '';
			for(var i=0; i<workouts.length; i++){
				var temp = '<option value=' + workouts[i].pid + '>' + workouts[i].name + '</option>';
				customs += temp;
			}
			localStorage['custom'] = customs;
			//$(customs).insertBefore('#updateCustom');
			displayCustom(customs);
		}
	});
}

function displayCustom(custom){
	var text = 'Custom:<select id="custom" onchange="selectWorkout("custom")"><option value=6969>SELECT</option>"';
	text += custom;
	text += '<option value=4242 id="updateCustom">Update</option></select>';
	$('#customForm').html(text);
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
	if(z == 4242){
		updateCustom();
	}
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