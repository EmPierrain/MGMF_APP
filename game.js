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
	console.log(roll);
	//6
	if(roll[0] == 6 || roll[1] == 6){
		//Distribution
		if(roll[0] == 6){
			console.log("Distribue " + roll[1]);
		}
		else{
			console.log("Distribue " + roll[0]);
		}
		//666 = Démon
		if(roll[0] == 6 && roll[1] == 6 && roll[2] == 6){
			console.log("Démon");
		}
			else{
			//6 = Dieu
			if(roll[0] == 6 && roll[1] == 6){
				console.log("Dieu");
			}
			//5 = Dragon
			if(roll[0] == 5 || roll[1] == 5){
				console.log("Dragon");
			}
			//1 = Dieu attaque
			if(roll[0] == 1 || roll[1] == 1){
				console.log("Dieu attaque le village");
			}
		}
	}
	//5
	if(roll[0] == 5 || roll[1] == 5){
		//555 = Impératrice
		if(roll[0] == 5 && roll[1] == 5 && roll[2] == 5){
			console.log("Impératrice");
		}
		else{
			//5 = Dieu
			if(roll[0] == 5 && roll[1] == 5){
				console.log("Dragon");
			}
			//4 = Princesse
			if(roll[0] == 4 || roll[1] == 4){
				console.log("Princesse");
			}
			//3 = Aubergiste
			if(roll[0] == 3 || roll[1] == 3){
				console.log("Aubergiste");
			}
			//2 = Dieu attaque le village
			if(roll[0] == 2 || roll[1] == 2){
				console.log("Dieu attaque le village");
			}
			//1
			if(roll[0] == 1 || roll[1] == 1){
				console.log("Fête au village");
			}
		}
	}
	//4
	if(roll[0] == 4 || roll[1] == 4){
		//444 = Gourgandine
		if(roll[0] == 4 && roll[1] == 4 && roll[2] == 4){
			console.log("Catin");
		}
		else{
			//4 = Dieu
			if(roll[0] == 4 && roll[1] == 4){
				console.log("Dieu");
			}
			//3 = Dieu attaque le village
			if(roll[0] == 3 || roll[1] == 3){
				console.log("Dieu attaque le village");
			}
			//2
			if(roll[0] == 2 || roll[1] == 2){
				console.log("Fête au village");
			}
			//1 = Catin
			if(roll[0] == 1 || roll[1] == 1){
				console.log("Catin");
			}
		}
	}
	//3
	if(roll[0] == 3 || roll[1] == 3){
		//333 = Apprenti
		if(roll[0] == 3 && roll[1] == 3 && roll[2] == 3){
			console.log("Apprenti");
		}
		else{
			//3 = Héro
			if(roll[0] == 3 && roll[1] == 3){
				console.log("Héro");
			}
			//2 = Prisonnier
			if(roll[0] == 2 || roll[1] == 2){
				console.log("Prisonnier");
			}
			//1 = Ecuyer
			if(roll[0] == 1 || roll[1] == 1){
				console.log("Ecuyer");
			}
		}
	}
	//2
	if(roll[0] == 2 || roll[1] == 2){
		//222 = Devin
		if(roll[0] == 2 && roll[1] == 2 && roll[2] == 2){
			console.log("Devin");
		}
		else{
			//2 = Héro
			if(roll[0] == 2 && roll[1] == 2){
				console.log("Héro");
			}
			//2 = Oracle
			if(roll[0] == 1 || roll[1] == 1){
				console.log("Oracle");
			}
		}
	}
	//1
	if(roll[0] == 2 || roll[1] == 2){
		//111 = Clochard 
		if(roll[0] == 1 && roll[1] == 1 && roll[2] == 1){
			console.log("Clochard");
		}
		else{
			//1 = Héro
			if(roll[0] == 1 && roll[1] == 1){
				console.log("Héro");
			}
		}
	}
}
