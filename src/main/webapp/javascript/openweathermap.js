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
	fetch("restservices/countries")
		.then(function (response) {
			return response.json();
		})

		.then(function (myJson) {
			
			for (const country of myJson) {
				 td = "<td id=t" + country.code + ">";
				 td2 = "</td>";
//				 form = "<form id=f"+ country.code + ">";
//				 input = "<input type='hidden' name='name' value='your value'/>";
//				 closeForm = "</form>";
				 buttonWijzigen = "<input type = 'button' id=w" + country.code  + " value='Wijzigen'></button> " ;
				 buttonVerwijderen = " <input type = 'button' id=v" + country.code  + " value='Verwijderen'></button>"
				txt =  country.code + td + country.name + td2 + td + country.capital + td2 + td + country.region + td2 + td + country.surface + td2 + td + country.population + td2  + buttonWijzigen  + buttonVerwijderen;
				
				var newRow = document.createElement("tr");
				var tdID = "td" + country.code;
				newRow.setAttribute('id',tdID);
				newRow.innerHTML = txt;
				
				form = document.createElement("form");
				form.id = "f"+country.code;
				
				
				inputName = document.createElement("input");
				inputName.type = "text";
				inputName.name = "name";
				inputName.placeholder = "name";
				
				inputCapital = document.createElement("input");
				inputCapital.type = "text";
				inputCapital.name = "capital";
				
				inputRegion = document.createElement("input");
				inputRegion.type = "text";
				inputRegion.name = "region";
			
				inputSurface = document.createElement("input");
				inputSurface.type = "text";
				inputSurface.name = "surface";
				
				inputPopulation = document.createElement("input");
				inputPopulation.type = "text";
				inputPopulation.name = "population";
				
				form.appendChild(inputName);
				form.appendChild(inputCapital);
				form.appendChild(inputRegion);
				form.appendChild(inputSurface);
				form.appendChild(inputPopulation);
				newRow.appendChild(form);
				
				

				

				newRow.addEventListener("click", function () {
					document.querySelector("#city").innerHTML = "Het weer in " + country.capital;
					showWeather(country.latitude, country.longitude, country.capital);


				});

				document.getElementById("table").appendChild(newRow);
				
				document.querySelector("#v" + country.code).addEventListener("click", function () {
					 var fetchoptions = { 
			    			  method: 'DELETE',
			    		      headers : { 
			    			    'Authorization': 'Bearer ' +  window.sessionStorage.getItem("myJWT") }
			    			}
			    			fetch("restservices/countries/"+country.code, fetchoptions)
			    			  .then(function(response) {
			    			    if (response.ok) {
			    			      console.log("Country deleted!");
//			    			      window.alert("Country deleted!");
			    			    } else console.log("Could not delete country!");
//			    			    window.alert("Could not delete country!");
			    			  })
			    			  .catch(error => console.log(error));
				})
				
				document.querySelector("#w" + country.code).addEventListener("click", function () {
		
				
					  document.getElementById("td" + country.code).contentEditable = true;
					  
					
					        	 var formData = new FormData(document.querySelector("#f"+country.code));
					        	 var encData = new URLSearchParams(formData.entries());
					        	 var fetchoptions = { 
						    			  method: 'PUT',
						    			  body:  encData,
						    		      headers : { 
						    			    'Authorization': 'Bearer ' +  window.sessionStorage.getItem("myJWT") }
						    			}
						    			fetch("restservices/countries/"+country.code, fetchoptions)
						    			  .then(function(response) {
						    			    if (response.ok) {
						    			      console.log("Country edited!");
//						    			      window.alert("Country edited!");
						    			    } else console.log("Could not edit country!");
//						    			    window.alert("Country not edit country!");
						    			  })
						    			  .catch(error => console.log(error));
	    
					        })
								 
							    
		
			document.querySelector("#makenButton").addEventListener("click", function () {
	    		 document.getElementById('makenButton').style.display = 'none';
	    		 document.getElementById('POSTcountryForm').style.display='block';
	    		 
	    		 document.querySelector("#post").addEventListener("click",function(){
	    		  var formData = new FormData(document.querySelector("#POSTcountryForm"));
	    		  var encData = new URLSearchParams(formData.entries());

	    		  var fetchoptions = { 
		    			  method: 'POST',
		    			  body:  encData,
		    		      headers : { 
		    			    'Authorization': 'Bearer ' +  window.sessionStorage.getItem("myJWT") }
		    			}
		    			fetch("restservices/countries/", fetchoptions)
		    			  .then(function(response) {
		    			    if (response.ok) {
		    			      console.log("Country made!");
//		    			      window.alert("Country made!");
		    			    } else console.log("Could not make country!");
//		    			    window.alert("Could not make country!");
		    			  })
		    			  .catch(error => console.log(error));
	    		 })
	    		 

			        
	    	})
			}		
				
			})
}


		

initPage();