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
	console.log(city);
	if (localStorage.getItem(city) != undefined) {
		var weather = JSON.parse(localStorage.getItem(city));
		var time = weather.time;
		console.log(time);
		if (time != null) {
			var date = new Date(time);
			console.log(date);
			if (date.setMinutes(date.getMinutes() + 10) >= new Date()) {
				var jsonFromCity = localStorage.getItem(city);
				jsonFromCity = JSON.parse(jsonFromCity);
				console.log(jsonFromCity.main);
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
				console.log("diz is weird");

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
				console.log("else show");
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
				var td = "<td>";
				var td2 = "</td>";
				var buttonWijzigen = "<input type = " + "'button' id='edit' onclick = 'alert(het werkt)'> Wijzigen</button>" ;
				var buttonVerwijderen = "<input type = 'button' id='delete'> Verwijderen</button>"
				var txt =  td + country.name + td2 + td + country.capital + td2 + td + country.region + td2 + td + country.surface + td2 + td + country.population + td2 + buttonWijzigen + buttonVerwijderen;

				var newRow = document.createElement("tr");
				newRow.innerHTML = txt;

				newRow.addEventListener("click", function () {
					document.querySelector("#city").innerHTML = "Het weer in " + country.capital;
					showWeather(country.latitude, country.longitude, country.capital);


				});

				document.getElementById("table").appendChild(newRow);
				
				document.querySelector("#delete").addEventListener("click", function () {
					  var countryCode = country.code

					  fetch("http://localhost:8081/firstapp/restservices/countries/"+countryCode, { method: 'DELETE' })
					    .then(function (response) {
					      if (response.ok) // response-status = 200 OK
					        console.log("Customer deleted!");
					      else if (response.status == 404)
					        console.log("Customer not found!");
					      else console.log("Cannot delete customer!");
					    })
					});
				
				
			}


		});

}

initPage();