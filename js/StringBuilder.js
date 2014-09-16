function StringBuilder() {
	this.stringData = '';
	this.toString = function(){
		return this.stringData;
	};
	this.append = function(newStuff){
		this.stringData += newStuff;
	};
};