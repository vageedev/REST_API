var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();


//Enable the access of the database from different domain

app.use(cors({

    origin: "*"

}));


//Connect to MySQL
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'firealarmdb'
});


connection.connect(function(err) {
    if (err) throw err
    console.log('Connected with mysql database')
})


//Body parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


//App server
const server = app.listen(3000, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

//REST API - fetch the data using GET method
app.get('/sensors', function (req, res) {
    connection.query('select * from sensors', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});
