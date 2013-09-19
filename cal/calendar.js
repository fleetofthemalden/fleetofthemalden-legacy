/*Copyright 1996 - Tomer and Yehuda Shiran
Feel free to "steal" this code provided that you leave this notice as is.
Additional examples from the book can be found at http://www.geocities.com/SiliconValley/9000/
For more information contact Tomer or Yehuda Shiran <yshiran@iil.intel.com>*/

var wkts = new Object()
var now


function leapYear(year) {
if (year % 4 == 0) // basic rule
return true // is leap year
/* else */ // else not needed when statement is "return"
return false // is not leap year
}

function getDays(month, year) {
// create array to hold number of days in each month
var ar = new Array(12)
ar[0] = 31 // January
ar[1] = (leapYear(year)) ? 29 : 28 // February
ar[2] = 31 // March
ar[3] = 30 // April
ar[4] = 31 // May
ar[5] = 30 // June
ar[6] = 31 // July
ar[7] = 31 // August
ar[8] = 30 // September
ar[9] = 31 // October
ar[10] = 30 // November
ar[11] = 31 // December

// return number of days in the specified month (parameter)
return ar[month]
}

function getMonthName(month) {
// create array to hold name of each month
var ar = new Array(12)
ar[0] = "January"
ar[1] = "February"
ar[2] = "March"
ar[3] = "April"
ar[4] = "May"
ar[5] = "June"
ar[6] = "July"
ar[7] = "August"
ar[8] = "September"
ar[9] = "October"
ar[10] = "November"
ar[11] = "December"

// return name of specified month (parameter)
return ar[month]
}

function setCal() {
// standard time attributes
var year = now.getYear()
if (year < 1000)
year+=1900
var month = now.getMonth()
var monthName = getMonthName(month)
var date = now.getDate()
now = null

// create instance of first day of month, and extract the day on which it occurs
var firstDayInstance = new Date(year, month, 1)
var firstDay = firstDayInstance.getDay()
firstDayInstance = null

// number of days in current month
var days = getDays(month, year)

// call function to draw calendar
drawCal(firstDay + 1, days, date, monthName, year)
}

function drawCal(firstDay, lastDate, date, monthName, year) {
// constant table settings
var headerHeight = 50 // height of the table's header cell
var border = 2 // 3D height of table's border
var cellspacing = 4 // width of table's border
var headerColor = "midnightblue" // color of table's header
var headerSize = "+3" // size of tables header font
var colWidth = 90 // width of columns in table
var dayCellHeight = 25 // height of cells containing days of the week
var dayColor = "darkblue" // color of font representing week days
var cellHeight = 70 // height of cells representing dates in the calendar
var todayColor = "red" // color specifying today's date in the calendar
var timeColor = "purple" // color of font representing current time

// create basic table structure
var text = "" // initialize accumulative variable to empty string
text += '<CENTER>'
text += '<TABLE BORDER=' + border + ' CELLSPACING=' + cellspacing + '>' // table settings
text += '<TH COLSPAN=7 HEIGHT=' + headerHeight + '>' // create table header cell
text += '<FONT COLOR="' + headerColor + '" SIZE=' + headerSize + '>' // set font for table header
text += monthName + ' ' + year 
text += '</FONT>' // close table header's font settings
text += '</TH>' // close header cell

// variables to hold constant settings
var openCol = '<TD WIDTH=' + colWidth + ' HEIGHT=' + dayCellHeight + '>'
openCol += '<FONT COLOR="' + dayColor + '">'
var closeCol = '</FONT></TD>'

// create array of abbreviated day names
var weekDay = new Array(7)
weekDay[0] = "Sun"
weekDay[1] = "Mon"
weekDay[2] = "Tues"
weekDay[3] = "Wed"
weekDay[4] = "Thu"
weekDay[5] = "Fri"
weekDay[6] = "Sat"

// create first row of table to set column width and specify week day
text += '<TR ALIGN="center" VALIGN="center">'
for (var dayNum = 0; dayNum < 7; ++dayNum) {
text += openCol + weekDay[dayNum] + closeCol 
}
text += '</TR>'

// declaration and initialization of two variables to help with tables
var digit = 1
var curCell = 1

for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
text += '<TR ALIGN="right" VALIGN="top">'
for (var col = 1; col <= 7; ++col) {
if (digit > lastDate)
break
if (curCell < firstDay) {
text += '<TD></TD>';
curCell++
} else {
if (digit == date) { // current cell represent today's date
text += '<TD HEIGHT=' + cellHeight + '>'
text += '<FONT COLOR="' + todayColor + '">'
text += cell_text(digit)
text += '</FONT><BR>'
text += '</TD>'
} else
text += '<TD HEIGHT=' + cellHeight + '>' + cell_text(digit) + '</TD>'
digit++
}
}
text += '</TR>'
}

// close all basic table tags
text += '</TABLE>'
text += '</CENTER>'

// print accumulative HTML string
$('#caldiv').append(text)
}

function cell_text(digit){
	var text = "";
	for(var i=0; i<wkts[digit].length; i++){
		text+= wkts[digit][i].a + "<br />";
	}
	return "<table id='tabd" + digit + "' border=0 width=90 height=70><tr><td ALIGN='left' id='d" + 
	digit + "'><small>" + text + "</small></td><td ALIGN='right' VALIGN='top'>" + digit + "</td></tr></table>";
}

function getWorkouts(cal){
	now = new Date()
	//var qry = "http://oldv1kenobi.herokuapp.com/cal.json?month=" + (now.getMonth() + 1) + "&cal=" + cal;
	var qry = "http://oldv1kenobi.herokuapp.com/cal.json?cal=" + cal;
	$.get(qry, function (workouts){
		if(workouts.length == 0){
			//alert("No workout data found");
			setCal();
		}
		else{
			for(var i=1; i<32; i++){
				wkts[i] = new Array();
			}
			for(var i=0; i<workouts.length; i++){
				var temp = workouts[i];
				TEST = temp;
				wkts[temp.day].push(temp);
			}
			setCal();
		}
	});
	
}
	