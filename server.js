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
		
		var dArray = [];
		
		//pdArray.push({'field':p,'data-value':req.body[p]})
		
		for(var i=0; i < rows.length; i++){
			
			dArray.push({"name":rows[i].name});
			
			//dArray.push('{"name":"' + rows[i].name + '"}');
			//rows[i].date = rows[i].date.toDateString();
			
		}
		
		//set the dArray to the rows object
		//context.dArray = rows;
		
		context.dArray = dArray;
		
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