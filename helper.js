



//build form row and append to table

//call getTable on load
getTable();


//on load
function getTable(Content){
	
	//get data table
	var dataTable = document.getElementById("dataTable");

	//build header row and append to table
	var myHeaderRow = document.createElement("tr");
	var myFields = ["AAA","BBB","CCC","DDD","EEE"];
	for(var i=0; i < myFields.length; i++){
		
		var myHeader = document.createElement("td");
		myHeader.textContent = myFields[i];
		myHeaderRow.appendChild(myHeader);
	}
	dataTable.appendChild(myHeaderRow);
	
	
	
	console.log("Get table was called.");

	//console.log("value is:" + document.getElementById("input_name").value);
	
	
	var req = new XMLHttpRequest();
	req.open("GET", "/get", true); //true for async!
	
	//waits for the response to load
	req.addEventListener('load',function(){
		//check status
		if(req.status >= 200 && req.status < 400){
			//parse results for console
			console.log(JSON.parse(req.responseText));
			
			//move results to dArray
			var obj = JSON.parse(req.responseText);
			
			var dArray = obj.dArray;
			
			
			
			//Build table from this array
			for(var i=0; i < dArray.length; i++){
				
				//create row
				var thisRow = document.createElement("tr");
				
				var tFields = ["name","reps","weight","date","lbs"];
				for(var j=0; j < tFields.length; j++){
					
					var data_cell = document.createElement("td");
					data_cell.textContent = dArray[i][tFields[j]];
					thisRow.appendChild(data_cell);
				}
				
				
				
				// //create data cells
				// var name_data = document.createElement("td");
				// var reps_data = document.createElement("td");
				// var weight_data = document.createElement("td");
				// var date_data = document.createElement("td");
				// var lbs_data = document.createElement("td");
				
				// //load data
				// name_data.textContent = dArray[i]["name"];
				// reps_data.textContent = dArray[i].reps;
				// weight_data.textContent = dArray[i]["weight"];
				// date_data.textContent = dArray[i].date;
				// lbs_data.textContent = dArray[i].lbs;
				
				// //append cells to row
				// thisRow.appendChild(name_data);
				// thisRow.appendChild(reps_data);
				// thisRow.appendChild(weight_data);
				// thisRow.appendChild(date_data);
				// thisRow.appendChild(lbs_data);
				
				//append row to table
				dataTable.appendChild(thisRow);
			}
			
			
			document.getElementById("testData").textContent = req.responseText;
			
			//send results string to page
			//document.getElementById("weatherResults").textContent = req.responseText;
			
		} else {
			//there was an error
			console.log("Error in network request: " + req.statusText);
		};
	});
	
	req.send(null); //keep on truckin, since async=true!
	
	
	

	
	
};


//on city click
function addClick(Content){
	
	
	
	
	console.log("--- Add click was pushed again ---");

	//console.log("value is:" + document.getElementById("input_name").value);
	
	var input_name = document.getElementById("input_name").value;
	
	if(!input_name){
		console.log("value is empty!");
	} else {
		
		console.log("value is:" + input_name);
	}
	
	// //get city input value
	// var city_input = document.getElementById("city_input").value;
	
	// var req = new XMLHttpRequest();
	// req.open("GET", root + city_input + appid, true); //true for async!
	
	// //waits for the response to load
	// req.addEventListener('load',function(){
		// //check status
		// if(req.status >= 200 && req.status < 400){
			// //parse results for console
			// console.log(JSON.parse(req.responseText));
			
			// //send results string to page
			// document.getElementById("weatherResults").textContent = req.responseText;
		// } else {
			// //there was an error
			// console.log("Error in network request: " + req.statusText);
		// };
	// });
	
	// req.send(null); //keep on truckin, since async=true!
};

//add listener
//document.getElementById("addButton").addEventListener("click", addClick);