function fetchData(search) {

	var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search;

	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {

		if(request.readyState === 4 && request.status === 200) {
			renderData(JSON.parse(request.responseText));
		}

	}

	request.open('GET',url);

	request.send();

}

function renderData(jsonData) {

	var objectData = jsonData.query.pages;
	var html = "";

	// loops through property of the object.
	// every property is a result
	for(var property in objectData) {

		html += "<div class='col-md-12'>";
		html += "<div class='panel panel-primary'>";
		html += "<div class='panel-heading'>";
		html += "<h3 class='panel-title'> "+objectData[property].title+"</h3>";
		html += "</div>";
		html += "<div class='panel-body'>";
		html += objectData[property].extract;
		html += "</div>";
		html += "</div>";
		html += "</div>";

	}

	// sets the html content of row
	var row = document.querySelector('#results');
	row.innerHTML = html;

}


// selects the SEARCH BUTTON
var searchButton = document.querySelector('#search-btn');
var input = document.querySelector('#search-input');


// listens for a click on SEARCH BUTTON
searchButton.addEventListener('click', function() {

	fetchData(input.value);
	
});


// listens for keypress 'ENTER'
document.addEventListener('keydown', function(event) {
	

	if(event.keyCode === 13) {
		
		fetchData(input.value);
		
		
	}

});