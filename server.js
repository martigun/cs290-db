var express = require('express');
//var mysql = require('./connectSQL.js');//this??

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});
module.exports.pool = pool;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res,next){
	
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		context.results = JSON.stringify(rows);
		
		
		res.render('home', context);

	});	
	
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.query.c], function(err, result){
	
	if(err){
		next(err);
		return;
	}
	
  
    context.results = "Inserted id " + result.insertId;
    //context.results = "Add was successful!";
	res.render('home',context);
  });
});

app.get('/insert2',function(req,res,next){
  var context = {};
  
  var insertString = "INSERT INTO workouts (`name`) VALUES ('JOHNNY')";
  
  mysql.pool.query(insertString, function(err){

    context.results = "Inserted!";
	res.render('home',context);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
		
	if(err){
		next(err);
		return;
	}
	
	
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset!";
      res.render('home',context);
    })
  });
});

console.log("Running on 3000...")
app.listen(3000);