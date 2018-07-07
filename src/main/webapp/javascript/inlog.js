function login(event) {
var formData = new FormData(document.querySelector("#loginform"));
var encData = new URLSearchParams(formData.entries());

  fetch("restservices/authentication", { method: 'POST', body: encData })
    .then(function(response) {
      if (response.ok){
    	  window.location = "/firstapp/openweathermap.html";
    	  return response.json();
    	  
      }
      else{ throw "Wrong username/password";
      }
     
    })
    .then(myJson => window.sessionStorage.setItem("myJWT", myJson.JWT))
    .catch(error => console.log(error));
}
 document.querySelector("#login").addEventListener("click", login);

 
 
 var fetchoptions = { 
		  method: 'DELETE’,
	      headers : { 
		    'Authorization': 'Bearer ' +  window.sessionStorage.getItem("myJWT") }
		}
		fetch("restservices/countries/CN", fetchoptions)
		  .then(function(response) {
		    if (response.ok) {
		      console.log("Country deleted!");
		    } else console.log("Could not delete country!");
		  })
		  .catch(error => console.log(error));
