//Moenika Chowdhury
//I pledge my honor that I've abided by the Stevens Honor System
//September 28th, 2017

//after the task is inserted, query all tasks and log them
//after all the tasks are logged, remove the first task
//query all the remaining tasks and log them
//complete the remaining task
//log the task that has been completed with its new value


//create a task with the following details:

const todoItems = require("./todo");
const connection = require("./mongoConnection");
let task1ID, task2ID;

async function main() {
	
	//creating the first task
    let Task1 = await todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
	task1ID = Task1._id;
    console.log("Task 1 has been added!");
    console.log(Task1);

	//creating the second task
    let Task2 = await todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
    console.log("Task 2 has been added!");
	task2ID = Task2._id;
	
    let getTasks = await todoItems.getAllTasks();
    console.log(getTasks);
	
    console.log("Task 1 is: ");
    console.log(Task1);
    console.log("Task 2 is: ");
    console.log(Task2); 

    console.log("Task 1 is completed, removing the first task!");  
    await todoItems.removeTask(task1ID);

    //query all tasks
    console.log("Query all tasks!");  
    let getTasks2 = await todoItems.getAllTasks();
    console.log(getTasks2);

    console.log("Logging all tasks!");  
    console.log(Task1);
    console.log(Task2); 

    console.log("Complete remaining task and log!");  
	
    let finishedTask = await todoItems.completeTask(task2ID);
    
    console.log(finishedTask);

    const db = await connection();
    await db.close();
}

main();