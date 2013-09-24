function updateData(data){
	var y = document.getElementById(data);
	var x = y.selectedIndex;
	var z = y.getElementsByTagName("option")[x].value;
	if(z != 6969){
		localStorage[data] = y.getElementsByTagName("option")[x].value;
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
	updateData('2k');
}

function init(){
	user2k();
}