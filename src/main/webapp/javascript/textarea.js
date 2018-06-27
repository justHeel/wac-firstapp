var text = document.querySelector("#textArea").value;

function myIntervalFunction(){
	var newText = document.querySelector("#textArea").value;	
	if(newText != text){
		console.log(newText);
		text = newText;
	}
}


var intervalID = setInterval(myIntervalFunction, 5000);