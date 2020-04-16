function play() {
  document.getElementById("round").innerHTML = "Tour de " + players[index].name;
  var dices = rollDices();
  getActionsByRoll(dices);
  getPlayers();
  index = (index + 1) % players.length;
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
    "Lancer de dés: " +
    "<span class='dice'>" +
    roll[0] +
    "</span> <span class='dice'>" +
    roll[1] +
    "</span> <span class='dice special'>" +
    roll[2];
  if (
    players[index].roles.includes("Prisonnier") &&
    (roll[0] === 3 || roll[1] === 3)
  ) {
    players[index].roles.splice("Prisonnier");
    text +=
      "<div>" + "Le joueur sort de prison. Il boit pour fêter ça" + "</div>";
  } else {
    if (players[index].roles.includes("Prisonnier")) {
      text +=
        "<div>" +
        "Le joueur ne sort pas de prison. Son lancer ne sert à rien et il boit" +
        "</div>";
    } else {
      //6
      if (roll[0] == 6 || roll[1] == 6) {
        //Distribution
        if (roll[0] == 6) {
          text +=
            "<div>" +
            "Le joueur distribue " +
            roll[1] +
            " gorgée(s) à qui il souhaite</div>";
        } else {
          text +=
            "<div>" +
            "Le joueur distribue " +
            roll[0] +
            " gorgée(s) à qui il souhaite</div>";
        }
        //666 = Démon
        if (roll[0] == 6 && roll[1] == 6 && roll[2] == 6) {
          text +=
            "<div>" +
            "666, le joueur devient Démon et distribue le dé spécial à chaque lancer jusqu'à son prochain tour" +
            "</div>";
          text +=
            "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
          //setRole("Démon");
        } else {
          //6 = Dieu
          if (roll[0] == 6 && roll[1] == 6) {
            text +=
              "<div>" +
              "66, le joueur devient Dieu tout puissant et pourra attaquer le village quand la somme fait 7" +
              "</div>";
            setRole("Dieu");
          }
          //5 = Dragon
          if (roll[0] == 5 || roll[1] == 5) {
            text +=
              "<div>" +
              "65, le joueur devient LE Dragon et pourra souffler ses gorgées " +
              "</div>";
            setRole("Dragon");
          }
          //1 = Dieu attaque le village
          if (roll[0] == 1 || roll[1] == 1) {
            text += dieuAttaqueLeVillage(roll[2]);
          }
        }
      }
      //5
      if (roll[0] == 5 || roll[1] == 5) {
        //555 = Impératrice
        if (roll[0] == 5 && roll[1] == 5 && roll[2] == 5) {
          text +=
            "<div>" +
            "555, le joueur devient Impératrice et donne la moitié de ses gorgées à qui il veut" +
            "</div>";
          text +=
            "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
          //setRole("Impératrice");
        } else {
          //5 = Dieu
          if (roll[0] == 5 && roll[1] == 5) {
            text +=
              "<div>" +
              "55, le joueur devient Dieu tout puissant et pourra attaquer le village quand la somme fait 7" +
              "</div>";
            setRole("Dieu");
          }
          //4 = Princesse
          if (roll[0] == 4 || roll[1] == 4) {
            text +=
              "<div>" +
              "54, Le joueur devient la Princesse et distribuera la moitié de ses gorgées au Héros" +
              "</div>";
            setRole("Princesse");
          }
          //3 = Aubergiste
          if (roll[0] == 3 || roll[1] == 3) {
            text +=
              "<div>" +
              "53, le joueur devient Aubergiste et peut faire +/-1 sur les gorgées distribuées" +
              "</div>";
            setRole("Aubergiste");
          }
          //2 = Dieu attaque le village
          if (roll[0] == 2 || roll[1] == 2) {
            text += dieuAttaqueLeVillage(roll[2]);
          }
          //1
          if (roll[0] == 1 || roll[1] == 1) {
            text +=
              "<div>" +
              "51, C'est la Fête au village!!! Tout le monde boit " +
              roll[2] +
              " gorgées</div>";
          }
        }
      }
      //4
      if (roll[0] == 4 || roll[1] == 4) {
        //444 = Gourgandine
        if (roll[0] == 4 && roll[1] == 4 && roll[2] == 4) {
          text +=
            "<div>" +
            "444, le joueur devient la Gourgandine. Il doit s'interposer à chaque lancer de dés de la même façon que la Catin " +
            "</div>";
          text +=
            "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
          //setRole("Gourgandine");
        } else {
          //4 = Dieu
          if (roll[0] == 4 && roll[1] == 4) {
            text +=
              "<div>" +
              "44, le joueur devient Dieu tout puissant et pourra attaquer le village quand la somme fait 7" +
              "</div>";
            setRole("Dieu");
          }
          //3 = Dieu attaque le village
          if (roll[0] == 3 || roll[1] == 3) {
            text += dieuAttaqueLeVillage(roll[2]);
          }
          //2
          if (roll[0] == 2 || roll[1] == 2) {
            text +=
              "<div>" +
              "42, C'est la Fête au village!!! Tout le monde boit " +
              roll[2];
            (" gorgées</div>");
          }
          //1 = Catin
          if (roll[0] == 1 || roll[1] == 1) {
            text +=
              "<div>" +
              "41, Le joueur devient la Catin et s'interpose quand Dieu attaque le village" +
              "</div>";
            setRole("Catin");
          }
        }
      }
      //3
      if (roll[0] == 3 || roll[1] == 3) {
        if (roleExist("Prisonnier")) {
          text +=
            "<div>" +
            "Le Prisonnier boit autant qu'il y a de 3 dans le lancer" +
            "</div>";
        }
        //333 = Apprenti
        if (roll[0] == 3 && roll[1] == 3 && roll[2] == 3) {
          text +=
            "<div>" +
            "333, le joueur devient l'Apprenti et bois autant de gorgées bues par les autres joueurs" +
            "</div>";
          text +=
            "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
          //setRole("Apprenti");
        } else {
          //3 = Héros
          if (roll[0] == 3 && roll[1] == 3) {
            text +=
              "<div>" +
              "33, le joueur devient Héros et s'interposera quand Dieu attaquera le village" +
              "</div>";
            setRole("Héros");
          }
          //2 = Prisonnier
          if (roll[0] == 2 || roll[1] == 2) {
            text +=
              "<div>" +
              "32, le joueur devient Prisonnier et boira à chaque dé valant 3" +
              "</div>";
            if (roleExist("Prisonnier")) {
              text +=
                "<div> Il y a déjà quelqu'un en prison. Le lancer ne sert à rien, le joueur boit </div>";
            } else {
              while (players[index].roles.length != 0) {
                players[index].roles.splice(0, 1);
              }
              "<div>" +
                "Le Prisonnier perd tout ses rôles et boit " +
                roll[2] +
                " gorgée(s) pour fêter ça" +
                "</div>";
              setRole("Prisonnier");
            }
          }
        }
        //1 = Ecuyer
        if (roll[0] == 1 || roll[1] == 1) {
          text +=
            "<div>" +
            "31, le joueur devient Ecuyer et boira autant de gorgées que le Héros" +
            "</div>";

          if (roleExist("Héros")) {
            setRole("Ecuyer");
          } else {
            text +=
              "<div>" +
              "Un Ecuyer n'est rien sans son Héros. Le lancer est annulé et le joueur boit" +
              "</div>";
          }
        }
      }
      //2
      if (roll[0] == 2 || roll[1] == 2) {
        //222 = Devin
        if (roll[0] == 2 && roll[1] == 2 && roll[2] == 2) {
          text +=
            "<div>" +
            "222, le joueur deviens Devin et pourra interférer sur un des dés lancés en début de tour" +
            "</div>";
          text +=
            "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
          //setRole("Devin");
        } else {
          //2 = Héros
          if (roll[0] == 2 && roll[1] == 2) {
            text +=
              "<div>" +
              "22, le joueur devient Héros et s'interposera quand Dieu attaquera le village" +
              "</div>";
            setRole("Héros");
          }
          //2 = Oracle
          if (roll[0] == 1 || roll[1] == 1) {
            text +=
              "<div>" +
              "21, le joueur devient Oracle et tentera de prédire le lancer du Héros (WIP)" +
              "</div>";
            setRole("Oracle");
          }
        }
      }
      //1
      if (roll[0] == 1 || roll[1] == 1) {
        //111 = Clochard
        if (roll[0] == 1 && roll[1] == 1 && roll[2] == 1) {
          text +=
            "<div>" +
            "111, le joueur devient le Clochard et boira le dé spécial à chaque lancer pendant un tour" +
            "</div>";
          text +=
            "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
          //setRole("Clochard");
        } else {
          //1 = Héros
          if (roll[0] == 1 && roll[1] == 1) {
            text +=
              "<div>" +
              "33, le joueur devient Héros et s'interposera quand Dieu attaquera le village" +
              "</div>";
            setRole("Héros");
          }
        }
      }
    }
  }
  document.getElementById("actions").innerHTML = "<div> Actions:</div>" + text;
}

function setRole(role) {
  if (roleExist(role)) {
    var playerIndex = getPlayerByRole(role);
    if (playerIndex != index) {
      var roleIndex = players[playerIndex].roles.indexOf(role);
      players[playerIndex].roles.splice(roleIndex, 1);
      players[index].roles.push(role);
    }
  } else {
    players[index].roles.push(role);
  }
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

function dieuAttaqueLeVillage(value) {
  var text =
    "<div>" + "Dieu attaque le village pour " + value + " gorgée(s)</div>";
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
      text += "<div> Le Héros s'interpose</div>";
      if (roleExist("Héros")) {
        text += "<div> L'Oracle prédit le score du Héros (WIP)</div>";
        // TODO rôle de l'Oracle
        dice = getRandomInt(6);
        text += "<div> Le Héros fait " + dice + "</div>";
        switch (dice) {
          case 1:
            text += "<div> Le Héros est foudroyé et boit sec </div>";
            text += "<div> Le Héros perd son rôle </div>";
            var playerIndex = getPlayerByRole("Héros");
            var roleIndex = players[playerIndex].roles.indexOf("Héros");
            players[playerIndex].roles.splice(roleIndex, 1);
            if (roleExist("Ecuyer")) {
              text += "<div> et l'écuyer devient Héros </div>";
              playerIndex = getPlayerByRole("Ecuyer");
              roleIndex = players[playerIndex].roles.indexOf("Ecuyer");
              players[playerIndex].roles.splice(roleIndex, 1);
              players[playerIndex].roles.push("Héros");
            }
            break;
          case 2:
          case 3:
            text +=
              "<div> Le Héros ne s'est pas interposé et boit " +
              value +
              " gorgée(s) </div>";
            break;
          case 4:
          case 5:
            text +=
              "<div> Le Héros ne s'est pas interposé mais se protège lui-même </div>";
            break;
          default:
            text +=
              "<div> Le Héros s'est interposé. Dieu est foudroyé et boit sec (WIP) </div>";
            text += "<div> Dieu perd son rôle </div>";
            var playerIndex = getPlayerByRole("Dieu");
            var roleIndex = players[playerIndex].roles.indexOf("Dieu");
            players[playerIndex].roles.splice(roleIndex, 1);
            out = true;
        }
      } else {
        text += "<div> Il n'y a pas de Héros </div>";
      }
    }
    if (!out) {
      text += "<div> Dieu distribue " + value + " gorgée(s)</div>";
    }
  } else {
    text += "<div> Il n'y a pas de Dieu. Le joueur boit </div>";
  }
  return text;
}
