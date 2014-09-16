function updateData(data){
	var y = document.getElementById(data);
	var x = y.selectedIndex;
	var z = y.getElementsByTagName("option")[x].value;
	if(z != 6969){
		localStorage[data] = y.getElementsByTagName("option")[x].value;
	}
}