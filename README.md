# Todo-App
Good old todo-application to set remainders for your daily life.

This version contains only backend-part of the app.

Backend have been build by using node.js express framework

## Installation

In the /Todo-App folder run:  
`npm install`

## Running the app

In the /Todo-App/backend folder run:  
`node backend.js`

### Database configuration file
In order to database work, you have to fill missing information in config.json found in /Todo-App/backend


## Rest-api calls

Description |GET  |returns 
------------ | ------------ | ------- 
Get all tasks | v1/tasks   |   {id, task, done}                                                                                                                                                     
Get task by id | v1/tasks/:id   | {id, task, done} 

Description |POST| parameters 
------- | ------- |--- 
Add new task | v1/tasks/:id | task, done 

Description | PUT  
------------ | ---------
Update task by id | v1/tasks/:id   

Description | DELETE 
------- | ---- 
Delete by id | v1/tasks/:id 
