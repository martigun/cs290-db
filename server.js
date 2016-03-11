var express = require('express');
var mysql = require('./connectSQL.js');//this??

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3300);

app.get('/',function(req,res,next){
	
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		//set the dArray to the rows object
		context.dArray = rows;
		
		//render the context
		res.render('data', context);
	});	
});

app.get('/addrow',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) " +
					"VALUES (?, ?, ?, ?, ?)",
					[req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs],
					function(err, result){
	
	if(err){
		next(err);
		return;
	}
	
  
    context.results = "Inserted id " + result.insertId;
    //context.results = "Add was successful!";
	res.render('home',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?",
					[req.query.id],
					function(err, result){
	
	//check for errors
	if(err){
		next(err);
		return;
	}
	
	//tell user
    //context.results = "Deleted " + result.changedRows + " rows.";
	
	
	context.results = "Deleted row id= " + [req.query.id];
	res.render('home',context);
	
  });
});





app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
	
	
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

app.get('/json', 
	function(req,res,next){
	
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		context.results = JSON.stringify(rows);
		
		res.render('home', context);
		
			//get field names
		for (var i=0; i < fields.length ; i++) console.log(i + ": " + fields[i].name);
	

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

console.log("Running on 3300...")
app.listen(3300);