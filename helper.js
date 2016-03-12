



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
			
			//get data table
			var dataTable = document.getElementById("dataTable");
			
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
					var thisData = dArray[i][tFields[j]];
					
					//format dates
					if(tFields[j]=="date") {
						var date = new Date(thisData);
						thisData = date.toDateString();
					}
					
					data_cell.textContent = thisData;
					
					thisRow.appendChild(data_cell);
				}
				
				//append row to table
				dataTable.appendChild(thisRow);
			}
			
		} else {
			//there was an error
			console.log("Error in network request: " + req.statusText);
		};
	});
	
	//activates when call comes back
	req.send(null);
	
	
	
	

	
	
};


//on city click
function addClick(Content){
	
	//alert("addClick was clicked!");
	
	var name_input = document.getElementById("name_input").value;
	
	if(!name_input) {
		alert("Name must be filled in!");
		return;
	};
	
	alert("Your name is: " + name_input);
	
	
	
	
	
	
};

//add listener
document.getElementById("addButton").addEventListener("click", addClick);