function rollDices(){
	var dices = new Array()
	dices.push(getRandomInt(6));
	dices.push(getRandomInt(6));
	dices.push(getRandomInt(6));
	return(dices); 
}

function getRandomInt(max) {
  return Math.floor(1 + Math.random() * Math.floor(max));
}

function getActionsByRoll(roll){
	
}
