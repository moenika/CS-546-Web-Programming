//Moenika Chowdhury
//I pledge my honor that I've abided by the Stevens Honor System
//September 21st, 2017
// Function to count the occurances of each word, called by textMetrics

function wordOccurrences(text){
    return text.trim().split(/\s+/).reduce(function(array, word){
            if (word in array){
                array[word]++;
            } else { 
                array[word] = 1;
            }
            return array;
        }, Object.create(null));
    }

module.exports = {


simplify: (text)=> {

    return text.toLowerCase().replace(/[^\w\s]/g,'').replace(/[\t\s]/g, ' '); // \t = removes tabs, \s = white space characters

    },

createMetrics: (text) => {
    var returnObj = new Object();
    text = module.exports.simplify(text);
    //counts alpha letters
    returnObj.totalLetters = text.match(/[a-z]/g).length;

    //counts all words
    returnObj.totalWords = text.match(/(\w+)/g).length;

    //counts all words longer than 6 characters
    returnObj.longWords = text.match(/(\w{6,})/g).length;

    //gets the average length of a word
    returnObj.averageWordLength = returnObj.totalLetters/returnObj.totalWords; //total letters / total words

    //finds unique words
    returnObj.uniqueWords = Object.keys(wordOccurrences(text)).length;

    returnObj.wordOccurrences = wordOccurrences(text);

    return returnObj;
    }

}

