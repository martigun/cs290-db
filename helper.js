


//on city click
function addClick(Content){
	
	
	
	
	console.log("--- Add click was pushed again ---");

	console.log("value is:" + document.getElementById("input_name").value);
	
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