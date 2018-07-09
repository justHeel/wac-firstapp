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
			    			    } else console.log("Could not delete country!");
			    			  })
			    			  .catch(error => console.log(error));
				})
				
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
//					        	form.submit();
					        	 var formData = new FormData(document.querySelector("#f"+country.code));
					        	 var encData = new URLSearchParams(formData.entries());
					        	 for(var entries of formData.entries()){
					        		 console.log(entries[0] + " " + entries[1] );
					        		 
					        	 }
//					        	 window.alert(encData);
					        	 
					        	 fetch("restservices/countries/"+country.code, { method: 'PUT', body: encData 
					        		 })
								    .then(response => response.json())
								    .catch(error => window.alert(error))
								    	
								    .then(function(myJson) {
//								    	window.alert(myJson); 

								    
					        })
								    document.getElementById("td" + country.code).contentEditable = false;
							    }
					        	if (x.style.display === "none") {
							        x.style.display = "block";
							        
							    } else {
							        x.style.display = "none";
							        console.log("hij moet nu weer wijzigen zijn");
							    }
					        
					        	
//						  var formData = new FormData(document.querySelector("#f"+country.code));
//						  formData.append('code', document.querySelector("#t"+country.code).innerHTML);
//			    		  formData.append('name', document.querySelector("#t"+country.code).innerHTML);
//			    		  formData.append('capital',country.capital);
//			    		  formData.append('regio',country.region);
//			    		  formData.append('surface',country.surface);
//			    		  formData.append('population',country.population);
//						  console.log(formData);
//						  console.log(formData.values);
//						  var encData = new URLSearchParams(formData.entries());
//						  
//						  fetch("http://localhost:8081/firstapp/restservices/countries/"+country.code, { method: 'PUT', body: encData })
//						    .then(response => response.json())
//						    .then(function(myJson) {
//						    	console.log(myJson); 
//
//						    })
//					    }
//					    })
					    		    
			})
			
			document.querySelector("#makenButton").addEventListener("click", function () {
	    		 document.getElementById('makenButton').style.display = 'none';
	    		 document.getElementById('POSTcountryForm').style.display='block';
	    		 
	    		 document.querySelector("#post").addEventListener("click",function(){
	    		  var formData = new FormData(document.querySelector("#POSTcountryForm"));
	    		  var encData = new URLSearchParams(formData.entries());

	    		  fetch("restservices/countries/", { method: 'POST', body: encData })
	    		    .then(response => response.json())
	    		    .then(function(myJson) { console.log(myJson); });
	    		 })
	    		 

			        
	    	})
				
			}		
			})
}


		

initPage();