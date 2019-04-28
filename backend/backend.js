var express = require('express');
var validator = require('validator');
var cors = require('cors')
var mysql = require('mysql');
config  = require("./config");

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.options('*', cors());

//Connecting to database using config file.
var con = mysql.createConnection(config.db);

//Allowing access from any remote location.
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Gets all notes from database
app.get('/v1/tasks', function(req, res)  {
    var sql = 'SELECT * FROM tasks';

    con.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({message:'Unable to retrieve tasks'});
        } 
        res.status(200).send(results);
    });
});
//Gets spesific task indentified by id
app.get('/v1/tasks/:id', function(req, res)  {
    var id = req.params.id;
    if (validateId(id)) {
        con.query("SELECT * FROM tasks WHERE id = ?", id, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({message:'Unable to add task'});
            } else if (!results.length) {
                res.status(404).send({message:'Task not found'});
                
            } else {
                res.status(200).send(results);
            }
        });
    } else {
        res.status(400).send({message:'Invalid parameter(s)'});
    }
});
//Sets a new task to database
app.post('/v1/tasks', function(req, res)  {
    var task = req.body.task;
    var done = req.body.done;
    if (validateTask(task) && validateDone(done)) {
        con.query('INSERT INTO tasks(task, done) VALUES(?, ?)', [task, done], function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({message:'Couldnt add task to database'});
            } 
            res.status(200).send({message:'Task added to database'});
        });
    } else {
        res.status(400).send({message:'invalid parameter(s)'});
    }
});
//Updates task
app.put('/v1/tasks/:id', function(req, res)  {
    var id = req.params.id;
    var task = req.query.task;
    var done = req.query.done;
    if (validateTask(task) && validateDone(done) && validateId(id)) {
        con.query("UPDATE tasks SET task = ?, done = ? WHERE id = ?", [task, done, id], function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({message:'Unable to modfiy task'});
            } else if (results.affectedRows == 0) {
                res.status(404).send({message:'Task not found'});
            } else {
                res.status(200).send({message:'Task modified successfully'});
            }
        });
    } else {
        res.status(400).send({message:'invalid parameter(s)'});
    }
});
//Deletes a task indentified by id.
app.delete('/v1/tasks/:id', function(req, res)  {
    var id = req.params.id;
    if (validateId(id)) {
        con.query('DELETE FROM tasks WHERE id = ?', id, function(err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({message:'Unable to delete task'});
            } 
            res.status(200).send({message:'Task deleted successfully'});
        });
    } else {
        res.status(400).send({message:'invalid parameter(s)'});
    }
});



var server = app.listen(8080, function() {
    console.log('Server is listening..');
});

function validateId(t) {
    if (t != null) {
        if (!validator.isEmpty(t) && validator.isInt(t)) {
            return true;
        }
    }
    return false;
}
function validateDone(d) {
    if (d != null) {
        if (!validator.isEmpty(d) && validator.isBoolean(d)) {
            return true;
        }
    }
    return false;
}
function validateTask(t) {
    if (t != null) {
        if (!validator.isEmpty(t)) {
            return true;
        }
    }
    return false;
}



