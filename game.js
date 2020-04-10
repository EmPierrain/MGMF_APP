function play() {
  document.getElementById("round").innerHTML =
    "Tour de " + players[index % players.length].name;
  var dices = rollDices();
  getActionsByRoll(dices);
  index += 1;
}

function rollDices() {
  var dices = new Array();
  dices.push(getRandomInt(6));
  dices.push(getRandomInt(6));
  dices.push(getRandomInt(6));
  return dices;
}

function getRandomInt(max) {
  return Math.floor(1 + Math.random() * Math.floor(max));
}

function getActionsByRoll(roll) {
  var text = "";
  document.getElementById("dices").innerHTML =
    "Lancé de dés: " + roll[0] + " " + roll[1] + " " + roll[2];
  //6
  if (roll[0] == 6 || roll[1] == 6) {
    //Distribution
    if (roll[0] == 6) {
      text += "<div>" + "Distribue " + roll[1] + "</div>";
    } else {
      text += "<div>" + "Distribue " + roll[0] + "</div>";
    }
    //666 = Démon
    if (roll[0] == 6 && roll[1] == 6 && roll[2] == 6) {
      text += "<div>" + "Démon" + "</div>";
    } else {
      //6 = Dieu
      if (roll[0] == 6 && roll[1] == 6) {
        text += "<div>" + "Dieu" + "</div>";
      }
      //5 = Dragon
      if (roll[0] == 5 || roll[1] == 5) {
        text += "<div>" + "Dragon" + "</div>";
      }
      //1 = Dieu attaque
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Dieu attaque le village" + "</div>";
      }
    }
  }
  //5
  if (roll[0] == 5 || roll[1] == 5) {
    //555 = Impératrice
    if (roll[0] == 5 && roll[1] == 5 && roll[2] == 5) {
      text += "<div>" + "Impératrice" + "</div>";
    } else {
      //5 = Dieu
      if (roll[0] == 5 && roll[1] == 5) {
        text += "<div>" + "Dieu" + "</div>";
      }
      //4 = Princesse
      if (roll[0] == 4 || roll[1] == 4) {
        text += "<div>" + "Princesse" + "</div>";
      }
      //3 = Aubergiste
      if (roll[0] == 3 || roll[1] == 3) {
        text += "<div>" + "Aubergiste" + "</div>";
      }
      //2 = Dieu attaque le village
      if (roll[0] == 2 || roll[1] == 2) {
        text += "<div>" + "Dieu attaque le village" + "</div>";
      }
      //1
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Fête au village" + "</div>";
      }
    }
  }
  //4
  if (roll[0] == 4 || roll[1] == 4) {
    //444 = Gourgandine
    if (roll[0] == 4 && roll[1] == 4 && roll[2] == 4) {
      text += "<div>" + "Gourgandine" + "</div>";
    } else {
      //4 = Dieu
      if (roll[0] == 4 && roll[1] == 4) {
        text += "<div>" + "Dieu" + "</div>";
      }
      //3 = Dieu attaque le village
      if (roll[0] == 3 || roll[1] == 3) {
        text += "<div>" + "Dieu attaque le village" + "</div>";
      }
      //2
      if (roll[0] == 2 || roll[1] == 2) {
        text += "<div>" + "Fête au village" + "</div>";
      }
      //1 = Catin
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Catin" + "</div>";
      }
    }
  }
  //3
  if (roll[0] == 3 || roll[1] == 3) {
    //333 = Apprenti
    if (roll[0] == 3 && roll[1] == 3 && roll[2] == 3) {
      text += "<div>" + "Apprenti" + "</div>";
    } else {
      //3 = Héro
      if (roll[0] == 3 && roll[1] == 3) {
        text += "<div>" + "Héro" + "</div>";
      }
      //2 = Prisonnier
      if (roll[0] == 2 || roll[1] == 2) {
        text += "<div>" + "Prisonnier" + "</div>";
      }
      //1 = Ecuyer
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Ecuyer" + "</div>";
      }
    }
  }
  //2
  if (roll[0] == 2 || roll[1] == 2) {
    //222 = Devin
    if (roll[0] == 2 && roll[1] == 2 && roll[2] == 2) {
      text += "<div>" + "Devin" + "</div>";
    } else {
      //2 = Héro
      if (roll[0] == 2 && roll[1] == 2) {
        text += "<div>" + "Héro" + "</div>";
      }
      //2 = Oracle
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Oracle" + "</div>";
      }
    }
  }
  //1
  if (roll[0] == 1 || roll[1] == 1) {
    //111 = Clochard
    if (roll[0] == 1 && roll[1] == 1 && roll[2] == 1) {
      text += "<div>" + "Clochard" + "</div>";
    } else {
      //1 = Héro
      if (roll[0] == 1 && roll[1] == 1) {
        text += "<div>" + "Héro" + "</div>";
      }
    }
  }
  document.getElementById("actions").innerHTML = "<div> Actions:</div>" + text;
}
