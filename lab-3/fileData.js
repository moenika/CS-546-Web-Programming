//Moenika Chowdhury
//I pledge my honor that I've abided by the Stevens Honor System
//September 23rd, 2017

const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

module.exports = {

    async getFileAsString(path) {

        if (!path) throw "ERROR: There is no path provided.";
        let data = await fs.readFileAsync(path, 'utf8');
        return data;
    },

    async getFileAsJSON(path){
    if (!path) throw "ERROR: There is no path provided.";
    let data = await fs.readFileAsync(path, 'utf8');
    return data;
    }
    ,

async saveStringToFile(path, text){
        if (!path || !text) throw "ERROR: ONE OR BOTH parameters are not prodided. ";
        let data = await fs.writeFileAsync(path, text, "utf8");//write file! 
        return data;    
    },

    async saveJSONToFile(path, obj){
            if (!path || !obj || typeof obj !== 'object') throw "ERROR: Cannot save file.";
            let data = await fs.writeFileAsync(path, JSON.stringify(obj), 'utf8');
            return data;
            }
}

