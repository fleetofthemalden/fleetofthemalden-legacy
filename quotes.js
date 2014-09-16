var quote = new Array("In order to maximize the efficiency of the stroke, it is essential to minimize the time spent on the recovery.", "There's an easy way to do this, and then there's what we're doing.", "The oarswoman can improve her versatility by practicing the act of feathering with her outside wrist.", "The most effective way to apply power to the face of the oar is to put the whole shaft in, not just the tip, the entire shaft.", "Loose and easy, hard and long.", "Turn the blade with as much wrist-work as necessary, and especially see that the blade does not under-square.", "Pick the weak point of a crew rather than that of an individual. More often than not, it's three-seat.", "Feel the shaft in your hands.", "Give a thought to the circular movement of the oar, and keep your circular pressure going.", "Making no apparent effort on the drive is the hall-mark of a good oarswoman.", "Don't wet the loom of the oarswoman.", "It is of the greatest importance to get each oarswoman to understand what rowing is. Pain.", "If Gary Caldwell lets the women know that he is keen and watching, he need not say as much.", "Keeping one's head turned directly forward is antagonistic to the natural flow of the recovery.", "The crew need reminding that when finishing the race one does not want to do too much.", "Actively balancing the boat at the slightest sign of any instability is done by varying the position of the body instinctively.", "Try to be as light as possible at the finish, throwing your whole weight away from the rowlock.", "Cox is often over-regarded. She is often the least essential woman in the boat.", "Never coach to drive the back out, but to work the shaft as hard and as far as possible.", "When in doubt as to what to say to a woman, or whether anything need be said, say 'yes dear.'", "ASCII penis.", "Sure, sure.", "Ain't it Jay?", "Be a looser woman.","Check out our cox.");
var temp_msg = new Array("Workout will open in new window");
//quote = temp_msg; // in case Brian Dawe doesn't find my quotes amusing. Remove me later :)
function displayQuote(){
	var node = document.createElement("I");
	var quoteNode = document.createTextNode(getQuote());
	node.appendChild(quoteNode);
	var newQuote = document.getElementById("quote");
	newQuote.insertBefore(node, newQuote.childNodes[0]);
}

function getQuote(){
	index = Math.floor(Math.random()*quote.length);
	return quote[index];
}
