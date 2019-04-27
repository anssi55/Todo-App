# Todo-App
Good old todo-application to set remainders for your daily life.

This version contains only backend-part of the app.

## Installation

In the /Todo-App/backend folder run:  
`npm install`

## Running the app

In the /Todo-App/backend folder run:  
`node backend.js`

### Database configuration file
In order to database work, you have to fill missing information in config.json found in /Todo-App/backend


## Rest-api calls

GET | parameters|returns |POST| parameters 
------------ | ------------ | ------- | ----- | ---
/tasks (Gets all tasks)  |  | {id, task, done} | /tasks (add new task) | task, done                                                                                                                                                     
/task (get task by id) | id | {id, task, done} | |


PUT | parameters|delete| parameters 
------------ | ------------ | ------- | ----
/task (Update task by id)  | id | /task (delete by id) | id                                                                                                                                                     

