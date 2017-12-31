//Moenika Chowdhury
//I pledge my honor that I've abided by the Stevens Honor System
//September 21st, 2017
//function that you will then call, that will do the following to each file

const textMetrics = require("./textMetrics.js");
const fileData = require("./fileData.js");
const fs = require("fs");

//a function that will iterate over x to save data and go through all 3 files

async function main(i){
	if (fs.exists("./chapter"+ i + ".result.json")){ 
		fileData.getFileAsJSON("./chapter" + i + ".result.json").then((fileContent) => {
			console.log(fileContent); 
		}, (fileReadError) => {
			console.log(fileReadError); 
		});
	}
	else {
		fileData.getFileAsString("chapter"+ i + ".txt").then((fileContent)=>{ 
			fileData.saveStringToFile("./chapter" + i + ".debug.txt", textMetrics.simplify(fileContent)); 
			var results = textMetrics.createMetrics(fileContent); 
			fileData.saveJSONToFile("./chapter" + i + ".result.json", results); 
			console.log(results); 
		}, (error) => {
			console.log(error);
		});
	}
}

//goes through it 3 times since there are 3 chapters
//this simplifies iterating through each chapter

for (var i = 1; i < 4; i++){ 
	main(i); 
}
