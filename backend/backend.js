const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');

app = express();
const cors = require('cors')
const mysql = require('mysql');
config  = require("./config");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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
app.get('/tasks', function(req, res, next)  {
    var sql = 'SELECT * FROM tasks';

    con.query(sql, function (err, results) {
        if (err) console.log(err);
        res.json(results);
    });
});
//Gets spesific task indentified by id
app.get('/task', function(req, res, next)  {
    var id = req.query.id;
    console.log(id);
    con.query("SELECT * FROM tasks WHERE id = ?", [id], function (err, results) {
        if (err) console.log(err);
        res.json(results);
    });
});
//Sets a new task to database
app.post('/tasks', function(req, res, next)  {
    var task = req.query.task;
    var done = req.query.done;
    con.query('INSERT INTO tasks(task, done) VALUES(?, ?)', [task, done], function(err, results) {
        if (err) console.log(err);

        console.log(results);
        res.json(results);
    });
});
//Updates task
app.put('/task', function(req, res, next)  {
    var id = req.query.id;
    var task = req.query.task;
    var done = req.query.done;
    con.query("UPDATE tasks SET task = ?, done = ? WHERE id = ?", [task, done, id], function(err, results) {
        if (err) console.log(err);

        console.log(results);
        res.json(results);
    });
});
//Deletes a task indentified by id.
app.delete('/task', function(req, res, next)  {
    var id = req.query.id;
    con.query('DELETE FROM tasks WHERE id = ?', id, function(err, results) {
        if (err) console.log(err);

        console.log(results);
        res.json(results);
    });
});

var server = app.listen(8080, function() {
    console.log('Server is listening..');
});




