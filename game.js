function rollDices(){
	var dices = new Array()
	dices.push(getRandomInt(7));
	dices.push(getRandomInt(7));
	dices.push(getRandomInt(7));
	return(dices); 
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRoleByRoll(roll){
	
}
