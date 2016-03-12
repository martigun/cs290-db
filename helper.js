



//build form row and append to table

//call getTable on load
getTable();

//on load
function getTable(Content){
	
	//report to console
	console.log("Get table was called.");

	var req = new XMLHttpRequest();
	req.open("GET", "/get", true); //true for async!
	
	//waits for the response to load
	req.addEventListener('load',function(){
		//check status
		if(req.status >= 200 && req.status < 400){
			
			//move results to dArray
			var obj = JSON.parse(req.responseText);			
			var dArray = obj.dArray;
			
			displayTable(dArray);
			
			// //get data table
			// var dataTable = document.getElementById("dataTable");
						
			// //Build table from this array
			// for(var i=0; i < dArray.length; i++){
				
				// //create row
				// var thisRow = document.createElement("tr");
				
				// var tFields = ["name","reps","weight","date","lbs"];
				// for(var j=0; j < tFields.length; j++){
					
					// var data_cell = document.createElement("td");
					// var thisData = dArray[i][tFields[j]];
					
					// //format dates
					// if(tFields[j]=="date") {
						// var date = new Date(thisData);
						// thisData = date.toDateString();
					// }
					
					// data_cell.textContent = thisData;
					
					// thisRow.appendChild(data_cell);
				// }
				 // //Add delete button
				// var deleteCell = document.createElement("td");
				// var deleteButton = document.createElement("button");
				// deleteButton.textContent = "Delete";
				// deleteCell.appendChild(deleteButton);
				// thisRow.appendChild(deleteCell);
				
				// //append row to table
				// dataTable.appendChild(thisRow);
			// }
			
		} else {
			//there was an error
			console.log("Error in network request: " + req.statusText);
		};
	});
	
	//activates when call comes back
	req.send(null);
	
	
	
	
	

	
	
};

function displayTable(dArray){
	
	//get data table
	var dataTable = document.getElementById("dataTable");
	
	//Build table from this array
	for(var i=0; i < dArray.length; i++){
		
		//create row
		var thisRow = document.createElement("tr");
		
		var tFields = ["name","reps","weight","date","lbs"];
		for(var j=0; j < tFields.length; j++){
			
			var data_cell = document.createElement("td");
			var thisData = dArray[i][tFields[j]];
			
			//format dates
			if(tFields[j]=="date") {
				var date = new Date(thisData);
				thisData = date.toDateString();
			}
			
			data_cell.textContent = thisData;
			
			thisRow.appendChild(data_cell);
		}
		 //Add delete button
		var deleteCell = document.createElement("td");
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteCell.appendChild(deleteButton);
		thisRow.appendChild(deleteCell);
		
		//append row to table
		dataTable.appendChild(thisRow);
	}
	
	
	
	
	
}


//on city click
function addClick(Content){
	
	//alert("addClick was clicked!");
	
	var name = document.getElementById("input_name").value;
	
	//check that name is filled in
	if(!name) {
		alert("Name must be filled in!");
		return;
	};
	
	var reps = document.getElementById("input_reps").value
	var weight = document.getElementById("input_weight").value
	var date = document.getElementById("input_date").value
	//convert date
	// if(input_date){
		// var date = new Date(input_date);
		// input_date = date.toDateString();
	// }
	var lbs = document.getElementById("input_lbs").value
	
	
	var qString = "/addrow2?";
	
	qString += "name=" + name;
	qString += "&reps=" + reps;
	qString += "&weight=" + weight;
	qString += "&date=" + date;
	qString += "&lbs=" + lbs;
	
	alert(qString);
	
	var req = new XMLHttpRequest();
	req.open("GET", qString, true); //true for async!
	
	//waits for the response to load
	req.addEventListener('load',function(){
		//check status
		if(req.status >= 200 && req.status < 400){
			
			console.log("success!");

			
			
		} else {
			
			//there was an error
			console.log("Error in network request: " + req.statusText);
		};
	});
	
	//activates when call comes back
	req.send(null);
	
	
	
	
};

//add listener
document.getElementById("addButton").addEventListener("click", addClick);