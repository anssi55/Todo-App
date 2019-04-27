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
In order to database work, you have to fill missing information in config.json found in /inno-aviation/backend


## Rest-api calls

GET | parameters|POST| parameters 
------------ | ------------ | ------- | -----
/tasks (Gets all tasks)  |  | /tasks | {task, done}                                                                                                                                                     
/task (get task by id) | id |  |


PUT | parameters|delete| parameters 
------------ | ------------ | ------- | ----
/task (Update task by id)  | id | /task (delete by id) | id                                                                                                                                                     

