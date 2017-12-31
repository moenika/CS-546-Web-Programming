//Moenika Chowdhury
//Lab 2
//September 14th 2017
//I pledge my honor that I've abided by the Stevens Honor System.

//This file will require printShape.js and print 
//10 triangles, 10 squares, and 10 rhombi of sizes of your choosing.

function checkNumber(value, variableName) { //function to check that the number provided is defined and is the right type

	if (value == undefined || typeof value !== "number") {
		throw `${variableName || `provided variable`} is not a valid number`;
	}
}

module.exports = { //lets us export this index.js file and call these functions in my printShape file. 

	triangle: (lines) => {
//You will be given a variable representing the number of lines (in height) 
//that a triangle should be. You will draw this triangle.

	checkNumber(lines, "lines"); //checks that variable lines is defined
	var y = 0;
	var line = "";

	//building the shape of the triangle
	for (var x = 1; x <= lines; x++) {
		for (var a = y; a< lines-1; a++) {
			line += " ";
		}

		line += "/"; //left of the triangle, iteratively 

		for (var z = 0; z < y; z++) {
			if (x ==lines) {
				line += "--";
			}
			else {
				line += "  ";
			}
		}
		y++;
		line += "\\\n"; //new line so all of the shapes aren't squished together
	}
	console.log(line);
	line = ""; 
},

	square: (lines) => {
//Will print a square; must provide at least 2 lines.
	
	checkNumber(lines, "lines"); //checks if lines in defined

	if(lines > 1) {
		var line = "";
		for (var x = 1; x<=lines; x++) {

			line += "    |"; //spacing for the square

			for (var a = 0; a<lines; a++) {
				if (x==1 || x == lines) {
					line += "-";
				}
				else {
					line += " ";
				}
			}

			line += "|";
			console.log(line);
			line = "";
		}
	} else {
		throw `The number you entered is not valid to make a square.`;
	}
},

rhombus: (lines) => {
//Has to have a minimum of 2 lines, and must provide an even number of lines!
	checkNumber(lines, "lines");

	//starting with the left side of the rhombus
	if (lines > 1 && !(lines % 2)) {
		var line = "";
		var space = 0; //need space variable to deal with the left of the rhombus
		var inside = 1;
		
		for (var x = 1; x <= lines; x++) {
			if (space < lines/2) {
				for (var a = space; a < lines; a++) {
					line += " ";
				}
			} else {
				for (var a = lines - space - 1; a<lines; a++) {
					line += " ";
				}
			}

			space++;
			if (space <= lines/2) {
				line += "/";
			} else {
				line += "\\";
			}

			//the inside of the rhombus

			if (x == 1) {
				line += "-\\";
			} else if (x == lines) {
				line += "-/"; 
				} else {

					if (x <= lines/2) {
						for (var y = 1; y < x; y++) {
						line += "  ";
					}

					line += " ";

				} else {
					for (var y = 1; y <= lines - x; y++) {
						line += "  ";
					}

					line += " ";
				}

				//ending with the right side of the rhombus

				if (x <= lines/2) {
					line += "\\";
				} else {
					line += "/";
				}
			}

			console.log(line);
			line = "";
			
			}
		
		} else {
		throw `The number you entered is not valid to make a rhombus.`;
	}

},

};

