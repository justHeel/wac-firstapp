var numberOne = 0;
var operator = "";
var lastInput = "";
var lastInput2 = "";
var numberTwo = 0;
var resultaat = 0;
var firstButtonsValue = "";
var secondButtonsValue = "";

function showOnDisplay(event){
	if (document.getElementById("display").innerHTML == "0") {
		document.getElementById("display").innerHTML = "";
		lastInput = "number";
	}
	
	else if(lastInput == "number"){
		var buttonValue = event.target.value;
		document.getElementById("display").innerHTML += buttonValue;
		firstButtonsValue = firstButtonsValue + buttonValue;
		numberOne = parseInt(firstButtonsValue);
		console.log(numberOne);
	}
	

	else if (lastInput == "operator") {
		document.getElementById("display").innerHTML = "";
		var buttonValue2 = event.target.value;
		document.getElementById("display").innerHTML += buttonValue2;
		lastInput = "number";
			if(lastInput == "number") {
				secondButtonsValue = secondButtonsValue + buttonValue2;
			}	

		numberTwo = parseInt(buttonValue2);
		console.log(numberTwo);

	}
		
		

		}
	


function plus(event){
	operator = "+";
	lastInput = "operator";

}

function delen(event){
	operator = "/";
	lastInput = "operator";
}

function min(event){
	operator = "-";
	lastInput = "operator";
}

function product(event) {
	operator = "*";
	lastInput = "operator";
}

function showResultaat(event){
	lastInput = "resultaat";
	if(operator == "+"){
		resultaat = numberOne + numberTwo;
	}
	
	else if(operator == "-"){
		resultaat = numberOne - numberTwo;
	}
	
	else if(operator == "*"){
		resultaat = numberOne * numberTwo;
	}
	
	else if(operator == "/"){
		resultaat = numberOne / numberTwo;
		
	}
	
	else{
		resultaat = "foutmelding!!"
		
	}

	document.getElementById("display").innerHTML = resultaat;
	numberOne = resultaat;
}

function clearDisplay(event){
	document.getElementById("display").innerHTML = "0";
	
}


for (var buttonNummer = 0; buttonNummer < 10; buttonNummer++) {
	var randomString = "#btn_" + buttonNummer;
	var numbersClicked = document.querySelector(randomString);
	numbersClicked.addEventListener("click", showOnDisplay);
}


var plusClicked = document.querySelector("#btn_plus");
var divClicked = document.querySelector("#btn_div");
var minClicked = document.querySelector("#btn_min");
var prodClicked = document.querySelector("#btn_prod");
var equalClicked = document.querySelector("#btn_eq");
var clearClicked = document.querySelector("#btn_clear");

plusClicked.addEventListener("click", plus);
divClicked.addEventListener("click", delen);
minClicked.addEventListener("click", min);
prodClicked.addEventListener("click", product);
equalClicked.addEventListener("click",showResultaat);
clearClicked.addEventListener("click",clearDisplay);

