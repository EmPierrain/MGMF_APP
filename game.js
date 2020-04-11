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
      setRole("Démon");
    } else {
      //6 = Dieu
      if (roll[0] == 6 && roll[1] == 6) {
        text += "<div>" + "Dieu" + "</div>";
        setRole("Dieu");
      }
      //5 = Dragon
      if (roll[0] == 5 || roll[1] == 5) {
        text += "<div>" + "Dragon" + "</div>";
        setRole("Dragon");
      }
      //1 = Dieu attaque le village
      if (roll[0] == 1 || roll[1] == 1) {
        text += dieuAttaqueLeVillage();
      }
    }
  }
  //5
  if (roll[0] == 5 || roll[1] == 5) {
    //555 = Impératrice
    if (roll[0] == 5 && roll[1] == 5 && roll[2] == 5) {
      text += "<div>" + "Impératrice" + "</div>";
      setRole("Impératrice");
    } else {
      //5 = Dieu
      if (roll[0] == 5 && roll[1] == 5) {
        text += "<div>" + "Dieu" + "</div>";
        setRole("Dieu");
      }
      //4 = Princesse
      if (roll[0] == 4 || roll[1] == 4) {
        text += "<div>" + "Princesse" + "</div>";
        setRole("Princesse");
      }
      //3 = Aubergiste
      if (roll[0] == 3 || roll[1] == 3) {
        text += "<div>" + "Aubergiste" + "</div>";
        setRole("Aubergiste");
      }
      //2 = Dieu attaque le village
      if (roll[0] == 2 || roll[1] == 2) {
        text += dieuAttaqueLeVillage();
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
      setRole("Gourgandine");
    } else {
      //4 = Dieu
      if (roll[0] == 4 && roll[1] == 4) {
        text += "<div>" + "Dieu" + "</div>";
        setRole("Dieu");
      }
      //3 = Dieu attaque le village
      if (roll[0] == 3 || roll[1] == 3) {
        text += dieuAttaqueLeVillage();
      }
      //2
      if (roll[0] == 2 || roll[1] == 2) {
        text += "<div>" + "Fête au village" + "</div>";
      }
      //1 = Catin
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Catin" + "</div>";
        setRole("Catin");
      }
    }
  }
  //3
  if (roll[0] == 3 || roll[1] == 3) {
    //333 = Apprenti
    if (roll[0] == 3 && roll[1] == 3 && roll[2] == 3) {
      text += "<div>" + "Apprenti" + "</div>";
      setRole("Apprenti");
    } else {
      //3 = Héro
      if (roll[0] == 3 && roll[1] == 3) {
        text += "<div>" + "Héro" + "</div>";
        setRole("Héro");
      }
      //2 = Prisonnier
      if (roll[0] == 2 || roll[1] == 2) {
        text += "<div>" + "Prisonnier" + "</div>";
        setRole("Prisonnier");
      }
      //1 = Ecuyer
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Ecuyer" + "</div>";
        setRole("Ecuyer");
      }
    }
  }
  //2
  if (roll[0] == 2 || roll[1] == 2) {
    //222 = Devin
    if (roll[0] == 2 && roll[1] == 2 && roll[2] == 2) {
      text += "<div>" + "Devin" + "</div>";
      setRole("Devin");
    } else {
      //2 = Héro
      if (roll[0] == 2 && roll[1] == 2) {
        text += "<div>" + "Héro" + "</div>";
        setRole("Héro");
      }
      //2 = Oracle
      if (roll[0] == 1 || roll[1] == 1) {
        text += "<div>" + "Oracle" + "</div>";
        setRole("Oracle");
      }
    }
  }
  //1
  if (roll[0] == 1 || roll[1] == 1) {
    //111 = Clochard
    if (roll[0] == 1 && roll[1] == 1 && roll[2] == 1) {
      text += "<div>" + "Clochard" + "</div>";
      setRole("Clochard");
    } else {
      //1 = Héro
      if (roll[0] == 1 && roll[1] == 1) {
        text += "<div>" + "Héro" + "</div>";
        setRole("Héro");
      }
    }
  }
  document.getElementById("actions").innerHTML = "<div> Actions:</div>" + text;
}

function setRole(role) {
  if (roleExist(role)) {
    var playerIndex = getPlayerByRole(role);
    if (playerIndex != index % players.length) {
      var roleIndex = players[playerIndex].roles.indexOf(role);
      //var roleIndex = getIndexByRole(playerIndex);
      players[playerIndex].roles.splice(roleIndex, 1);
      players[index % players.length].roles.push(role);
    }
  } else {
    players[index % players.length].roles.push(role);
  }
  getPlayers();
}

function getPlayerByRole(role) {
  var found = false;
  var playerIndex = 0;
  var roleIndex = 0;
  while (!found && playerIndex < players.length) {
    roleIndex = 0;
    while (!found && roleIndex < players[playerIndex].roles.length) {
      if (players[playerIndex].roles[roleIndex] === role) {
        found = true;
      } else {
        roleIndex += 1;
      }
    }
    if (!found) {
      playerIndex += 1;
    }
  }
  return playerIndex;
}

function roleExist(role) {
  var found = false;
  var playerIndex = 0;
  var roleIndex = 0;
  while (!found && playerIndex < players.length) {
    roleIndex = 0;
    while (!found && roleIndex < players[playerIndex].roles.length) {
      if (players[playerIndex].roles[roleIndex] === role) {
        found = true;
      } else {
        roleIndex += 1;
      }
    }
    if (!found) {
      playerIndex += 1;
    }
  }
  return found;
}

function dieuAttaqueLeVillage() {
  var text = "<div>" + "Dieu attaque le village" + "</div>";
  if (roleExist("Dieu")) {
    var out = false;
    text += "<div> La Catin s'interpose </div>";
    if (roleExist("Catin")) {
      var dice = getRandomInt(6);
      text += "<div> La Catin fait " + dice + "</div>";
      if (dice === 1) {
        text += "<div> La Catin s'est interposée </div>";
        out = true;
      } else {
        text += "<div> La Catin boit " + dice + " gorgées </div>";
      }
    } else {
      text += "<div> Il n'y a pas de Catin </div>";
    }
    if (!out) {
      text += "<div> Le Héro s'interpose</div>";
      if (roleExist("Héro")) {
        text += "<div> L'Oracle prédit le score du héro (WIP)</div>";
        // TODO rôle de l'Oracle
        dice = getRandomInt(6);
        text += "<div> Le Héro fait " + dice + "</div>";
        switch (dice) {
          case 1:
            text += "<div> Le Héro est foudroyé et boit sec (WIP) </div>";
            // TODO enlever le rôle de Héro et le donner à l'ecuyer si il y en a une
            break;
          case 2:
          case 3:
            text += "<div> Le Héro ne s'est pas interposé et boit (WIP) </div>";
            // TODO Le héro boit ce que Dieu doit distribuer
            break;
          case 4:
          case 5:
            text += "<div> Le Héro ne s'est pas interposé </div>";
            break;
          default:
            text +=
              "<div> Le Héro s'est interposé. Dieu est foudroyé et boit sec (WIP) </div>";
            // TODO enlever le rôle de Dieu
            out = true;
        }
      } else {
        text += "<div> Il n'y a pas de Héro </div>";
      }
    }
    if (!out) {
      text += "<div> Dieu distribue (WIP) </div>";
      // TODO récupérer les gorgées à distribuer
    }
  } else {
    text += "<div> Il n'y a pas de Dieu. Le joueur boit </div>";
  }
  return text;
}
