var UserData = {
	config : {
		user2k : 420,
		cal : 'vmen'
	}, //end config

	init : function(){
		if(localStorage['2k'] == undefined)
			localStorage['2k'] = this.config.user2k;
		else
			this.config.user2k = localStorage['2k'];
		if(localStorage['cal'] == undefined)
			localStorage['cal'] = this.config.cal;
		else
			this.config.cal = localStorage['cal'];
	}, //end function

	get2k : function(){
		return this.config.user2k;
	}, //end function

	cal : function(){
		return this.config.cal;
	}, //end function

	user2k : function() {
		var y = document.getElementById("2k");
		var x = localStorage['2k'];
		x = x/2 - 180;
		y.selectedIndex = x;
		updateData('2k');
	} //end function


};