var express = require('express');
var mysql = require('./connectSQL.js');//this??

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3300);

app.use(express.static(__dirname));

app.get('/',function(req,res,next){
	
	console.log(req.originalUrl);
	
	var obj = {};
	res.render('blank', obj);
	
});

app.get('/empty',function(req,res,next){
	
	console.log(req.originalUrl);
});

app.get('/addrow2',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) " +
					"VALUES (?, ?, ?, ?, ?)",
					[req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs],
					function(err, result){
	
	if(err){
		next(err);
		return;
	}
	
	console.log(req.originalUrl);
	
	
	
    //context.results = "Inserted id " + result.insertId;
    //context.results = "Add was successful!";
	//res.render('home',context);
	//res.redirect("/");
  });
	
	//load the table
  	var context2 = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		//set the dArray to the rows object
		context2.dArray = rows;
		
		//render the context2
		res.render('form2', context2);
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
	
	console.log(req.originalUrl);
	
    //context.results = "Inserted id " + result.insertId;
    //context.results = "Add was successful!";
	//res.render('home',context);
	res.redirect("/");
  });
});

//<input type="hidden" name="id" value="3">

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
	console.log(req.originalUrl);
	
	//redirect
	res.redirect("/");
	
	//context.results = "Deleted row id= " + [req.query.id];
	//res.render('home',context);
	
  });
});

app.get('/update',function(req,res,next){
	var context = {};
  
	//trace path
	console.log(req.originalUrl);
  
	mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err){
		  next(err);
		  return;
		}
		
		//if result comes back...
		if(result.length == 1){
			
		//set variable to result
		var curVals = result[0];
		
		//run update query
		mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
			[req.query.name || curVals.name, 
			req.query.reps || curVals.reps, 
			req.query.weight || curVals.weight, 
			req.query.date || curVals.date, 
			req.query.lbs || curVals.lbs, 
			req.query.id],
			
			function(err, result){
				if(err){
					next(err);
					return;
				}
				
				//print path and redirect to main
				res.redirect("/");
			});
		}
  });
});

app.get('/edit',function(req,res,next){

	var context = {};
	
	mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
		
		//set the dArray to the rows object
		context.rowToEdit = rows[0];
		
		//render the context
		res.render('update', context);
	});	
  

  console.log(req.originalUrl);
  
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

app.get('/get',function(req,res,next){
	
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		//set the dArray to the rows object
		context.dArray = rows;
		
		//render the context
		res.json(context);
	});	
	
	//console.log(req.originalUrl);
});


app.get('/render',function(req,res,next){
	
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		//set the dArray to the rows object
		context.dArray = rows;
		
		//render the context
		res.render('form2', context);
	});	
	
	console.log(req.originalUrl);
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

app.get('/data',function(req,res,next){
	
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		
		//set the dArray to the rows object
		context.dArray = rows;
		
		//render the context
		res.render('data', context);
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