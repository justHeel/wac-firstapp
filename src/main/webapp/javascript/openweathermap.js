function initPage() {
	fetch("https://ipapi.co/json/")
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			document.querySelector("#landcode").append(myJson.region_code);
			document.querySelector("#land").append(myJson.country_name);
			document.querySelector("#regio").append(myJson.region);
			document.querySelector("#stad").append(myJson.city);
			document.querySelector("#postcode").append(myJson.postal);
			document.querySelector("#latitude").append(myJson.latitude);
			document.querySelector("#longitude").append(myJson.longitude);
			document.querySelector("#ip").append(myJson.ip);

			latitude = myJson.latitude;
			longitude = myJson.longitude;
			city = myJson.city;
			//			showWeather(latitude, longitude, city);
			loadCountries();
			document.querySelector("#city").append(myJson.city);

			fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=1db73d752cae83d9ac936d4c0882cba2")
				.then(function (response) {
					return response.json();
				})


				.then(function (myJson) {

					document.querySelector("#temperatuur").innerHTML = myJson.main.temp;
					document.querySelector("#luchtvochtigheid").innerHTML = myJson.main.humidity;
					document.querySelector("#windsnelheid").innerHTML = myJson.wind.speed;
					document.querySelector("#windrichting").innerHTML = myJson.wind.deg;

					var datum = new Date(myJson.sys.sunrise * 1000);
					var datum2 = new Date(myJson.sys.sunset * 1000);


					document.querySelector("#zonsopgang").innerHTML = datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds();
					document.querySelector("#zonsondergang").innerHTML = datum2.getHours() + ":" + datum2.getMinutes() + ":" + datum2.getSeconds();

				});

		});
}

function showWeather(latitude, longitude, city) {
	
	if (localStorage.getItem(city) != undefined) {
		var weather = JSON.parse(localStorage.getItem(city));
		var time = weather.time;
		
		if (time != null) {
			var date = new Date(time);
		
			if (date.setMinutes(date.getMinutes() + 10) >= new Date()) {
				var jsonFromCity = localStorage.getItem(city);
				jsonFromCity = JSON.parse(jsonFromCity);
				
				if (jsonFromCity != null) {
					document.querySelector("#temperatuur").innerHTML = jsonFromCity.main.temp;
					document.querySelector("#luchtvochtigheid").innerHTML = jsonFromCity.main.humidity;
					document.querySelector("#windsnelheid").innerHTML = jsonFromCity.wind.speed;
					document.querySelector("#windrichting").innerHTML = jsonFromCity.wind.deg;

					var datum = new Date(jsonFromCity.sys.sunrise * 1000);
					var datum2 = new Date(jsonFromCity.sys.sunset * 1000);


					document.querySelector("#zonsopgang").innerHTML = datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds();
					document.querySelector("#zonsondergang").innerHTML = datum2.getHours() + ":" + datum2.getMinutes() + ":" + datum2.getSeconds();
				}
				

			}
		}

	} else {
		fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=1db73d752cae83d9ac936d4c0882cba2")
			.then(function (response) {
				return response.json();
			})


			.then(function (myJson) {

				document.querySelector("#temperatuur").innerHTML = myJson.main.temp;
				document.querySelector("#luchtvochtigheid").innerHTML = myJson.main.humidity;
				document.querySelector("#windsnelheid").innerHTML = myJson.wind.speed;
				document.querySelector("#windrichting").innerHTML = myJson.wind.deg;

				var datum = new Date(myJson.sys.sunrise * 1000);
				var datum2 = new Date(myJson.sys.sunset * 1000);


				document.querySelector("#zonsopgang").innerHTML = datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds();
				document.querySelector("#zonsondergang").innerHTML = datum2.getHours() + ":" + datum2.getMinutes() + ":" + datum2.getSeconds();

				myJson.time = new Date();
				
				localStorage.setItem(city, JSON.stringify(myJson));


			});
	}
}

function loadCountries() {
	fetch("http://localhost:8081/firstapp/restservices/countries")
		.then(function (response) {
			return response.json();
		})

		.then(function (myJson) {

			for (const country of myJson) {
				var td = "<td id=t" + country.code + ">";
				var td2 = "</td>";
				var form = "<form id=f"+ country.code + ">";
				var input = "<input type='hidden' name='name' value='your value'/>";
				var closeForm = "</form>";
				var buttonWijzigen = "<input type = 'button' id=w" + country.code  + " value='Wijzigen'></button> " ;
				var buttonVerwijderen = " <input type = 'button' id=v" + country.code  + " value='Verwijderen'></button>"
				var txt =  form + td + country.name + td2 + td + country.capital + td2 + td + country.region + td2 + td + country.surface + td2 + td + country.population + td2 + buttonWijzigen  + buttonVerwijderen + input + closeForm;
				
				var newRow = document.createElement("tr");
				var tdID = "td" + country.code;
				newRow.setAttribute('id',tdID);
				newRow.innerHTML = txt;

				newRow.addEventListener("click", function () {
					document.querySelector("#city").innerHTML = "Het weer in " + country.capital;
					showWeather(country.latitude, country.longitude, country.capital);


				});

				document.getElementById("table").appendChild(newRow);
				
				document.querySelector("#v" + country.code).addEventListener("click", function () {
					  var countryCode = country.code

					  fetch("http://localhost:8081/firstapp/restservices/countries/"+countryCode, { method: 'DELETE' })
					    .then(function (response) {
					      if (response.ok) // response-status = 200 OK
					        console.log("Land verwijdert!");
					      else if (response.status == 404)
					        console.log("Land niet gevonden!");
					      else console.log("Kan de land niet verwijderen!");
					    })
					});
				
				document.querySelector("#w" + country.code).addEventListener("click", function () {
		
					  var countryCode = country.code;
				
					  document.getElementById("td" + country.code).contentEditable = true;
					  x = document.getElementById("w" + country.code);
					
					   
					    if (x.style.display === "none") {
					        x.style.display = "block";
					        
					    } else {
					        x.style.display = "none";
					        console.log("wijzigen button moet nu weg zijn");
					    }
					 
					  
					    });
					    document.querySelector("#td"+country.code).addEventListener('keypress', function (e) {
					        var key = e.which || e.keyCode;					        
					        if (key === 13) {
					        	document.getElementById("td" + country.code).contentEditable = false;
					        	if (x.style.display === "none") {
							        x.style.display = "block";
							        
							    } else {
							        x.style.display = "none";
							        console.log("hij moet nu weer wijzigen zijn");
							    }
					        
					        	
						  var formData = new FormData(document.querySelector("#f"+country.code));
						  var encData = new URLSearchParams(formData.entries());
						  
						  fetch("http://localhost:8081/firstapp/restservices/countries/"+country.code, { method: 'PUT', body: encData })
						    .then(response => response.json())
						    .then(function(myJson) { 
						    	console.log(myJson); 

						    })
					    }
					    })
					    
			}
			
			document.querySelector("#makenButton").addEventListener("click", function () {
	    		 document.getElementById('makenButton').style.display = 'none';
	    		 document.getElementById('POSTcountryForm').style.display='block';
	    		 
	    		 document.querySelector("#post").addEventListener("click",function(){
	    		  var formData = new FormData(document.querySelector("#POSTcountryForm"));
	    		  var encData = new URLSearchParams(formData.entries());

	    		  fetch("http://localhost:8081/firstapp/restservices/countries/", { method: 'POST', body: encData })
	    		    .then(response => response.json())
	    		    .then(function(myJson) { console.log(myJson); });
	    		 })
			        
	    	})
				
				
			})


		}

initPage();