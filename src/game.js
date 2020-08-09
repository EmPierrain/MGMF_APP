function play() {
  /*
   * Main function that'll be used when clicking the play button
   */

  document.getElementById("round").innerHTML = "Tour de " + players[index].name;
  /* Check if the player lose his special role */
  checkSpecial();
  /* Rolling three dices */
  var dices = rollDices();
  /* Do the actions depending of the roll */
  getActionsByRoll(dices);
  /* Update the Player list */
  getPlayers();
  index = (index + 1) % players.length;
}

function rollDices() {
  /*
   * Roll three different dices
   */
  var dices = new Array();
  dices.push(getRandomInt(6));
  dices.push(getRandomInt(6));
  dices.push(getRandomInt(6));
  return dices;
}

function getRandomInt(max) {
  /*
   * Get an int from 1 to max
   */
  return Math.floor(1 + Math.random() * Math.floor(max));
}

function getActionsByRoll(roll) {
  /*
   * Main function that handle different actions depending of the roll
   * and attribute them depending of the rules
   */
  var jeu = true;
  var text = "";
  /* We write the roll so the player can see it */
  document.getElementById("dices").innerHTML =
    "Lancer de dés: " +
    "<span class='dice'>" +
    roll[0] +
    "</span> <span class='dice'>" +
    roll[1] +
    "</span> <span class='dice special'>" +
    roll[2];

  /* Checking if the Clochard is in game */
  if (roleExist("Clochard")) {
    text += "<div> Le Clochard boit " + roll[2] + " gorgée(s) </div>";
  }
  /* Checking if the Démon is in game */
  if (roleExist("Démon")) {
    text += "<div> Le Démon distribue " + roll[2] + " gorgée(s) </div>";
  }
  /* Checking if Gourgandine is in game */
  if (roleExist("Gourgandine")) {
    /* The Gourgandine try to oppose the roll */
    text += "<div> La Gourgandine s'interpose !!!!</div>";
    var dice = getRandomInt(6);
    text += "<div> La Gourgandine fait " + dice + "</div>";
    /* If the Gourgandine roll 1, the roll is over */
    if (dice === 1) {
      text +=
        "<div> La Gourgandine s'est interposée et le tour n'a pas lieu </div>";
      jeu = false;
    } else {
      /* Else we continue and the Gourgandine drink her roll */
      text +=
        "<div> La Gourgandine ne s'est pas interposée et boit " +
        dice +
        " gorgée(s)</div>";
    }
  }
  /* The game start now */
  if (jeu) {
    /* If the player is in prison */
    if (
      players[index].roles.includes("Prisonnier") &&
      (roll[0] === 3 || roll[1] === 3)
    ) {
      /* If he roll a 3 he got out and play */
      players[index].roles.splice("Prisonnier");
      text +=
        "<div>" + "Le joueur sort de prison. Il boit pour fêter ça" + "</div>";
    } else {
      if (players[index].roles.includes("Prisonnier")) {
        /* Else, his turn is over */
        text +=
          "<div>" +
          "Le joueur ne sort pas de prison. Son lancer ne sert à rien et il boit" +
          "</div>";
      } else {
        /* If one of the roll is a 6 */
        if (roll[0] == 6 || roll[1] == 6) {
          /* The player distribute the second dice */
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
          /* If the roll is a 66 and the special dice is a 6 the player became a Démon */
          if (roll[0] == 6 && roll[1] == 6 && roll[2] == 6) {
            text +=
              "<div>" +
              "666, le joueur devient Démon et distribue le dé spécial à chaque lancer jusqu'à son prochain tour" +
              "</div>";
            text += setRole("Démon");
          } else {
            /* If the roll is a 66, the player became Dieu */
            if (roll[0] == 6 && roll[1] == 6) {
              text +=
                "<div>" +
                "66, le joueur devient Dieu tout puissant et pourra attaquer le village quand la somme fait 7" +
                "</div>";
              text += setRole("Dieu");
            }
            /* If the roll is a 65, the player became Dragon */
            if (roll[0] == 5 || roll[1] == 5) {
              text +=
                "<div>" +
                "65, le joueur devient LE Dragon et pourra souffler ses gorgées " +
                "</div>";
              text += setRole("Dragon");
            }
            /* If the roll is a 61, Dieu ateck the village */
            if (roll[0] == 1 || roll[1] == 1) {
              text += dieuAttaqueLeVillage(roll[2]);
            }
          }
        }
        /* If one of the roll is a 5 */
        if (roll[0] == 5 || roll[1] == 5) {
          /* If the roll is a 55 and the special dice is a 5 the player became a Imperatrice */
          if (roll[0] == 5 && roll[1] == 5 && roll[2] == 5) {
            text +=
              "<div>" +
              "555, le joueur devient Impératrice et donne la moitié de ses gorgées à qui il veut" +
              "</div>";
            text +=
              "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
            //text+=setRole("Impératrice");
          } else {
            /* If the roll is a 55, the player became Dieu */
            if (roll[0] == 5 && roll[1] == 5) {
              text +=
                "<div>" +
                "55, le joueur devient Dieu tout puissant et pourra attaquer le village quand la somme fait 7" +
                "</div>";
              text += setRole("Dieu");
            }
            /* If the roll is a 54, the player became Dragon */
            if (roll[0] == 4 || roll[1] == 4) {
              text +=
                "<div>" +
                "54, Le joueur devient la Princesse et distribuera la moitié de ses gorgées au Héros" +
                "</div>";
              /* The Hero can't become the Princesse */
              if (players[index].roles.includes("Héros")) {
                text +=
                  "<div>Le Héros ne peut pas devenir Princesse. Son tour ne sert à rien, le joueur boit</div>";
              } else {
                text += setRole("Princesse");
              }
            }
            /* If the roll is a 53, the player became the Aubergiste */
            if (roll[0] == 3 || roll[1] == 3) {
              text +=
                "<div>" +
                "53, le joueur devient Aubergiste et peut faire +/-1 sur les gorgées distribuées" +
                "</div>";
              text += setRole("Aubergiste");
            }
            /* If the roll is a 52, Dieu attacks the village */
            if (roll[0] == 2 || roll[1] == 2) {
              text += dieuAttaqueLeVillage(roll[2]);
            }
            /* If the roll is a 51, everyone drinks */
            if (roll[0] == 1 || roll[1] == 1) {
              text +=
                "<div>" +
                "51, C'est la Fête au village!!! Tout le monde boit " +
                roll[2] +
                " gorgées</div>";
            }
          }
        }
        /* If one of the roll is a 4 */
        if (roll[0] == 4 || roll[1] == 4) {
          /* If the roll is a 44 and the special dice is a 4 the player became a Gourgandine */
          if (roll[0] == 4 && roll[1] == 4 && roll[2] == 4) {
            text +=
              "<div>" +
              "444, le joueur devient la Gourgandine. Il doit s'interposer à chaque lancer de dés de la même façon que la Catin " +
              "</div>";
            text += setRole("Gourgandine");
          } else {
            /* If the roll is a 44, The player become Dieu */
            if (roll[0] == 4 && roll[1] == 4) {
              text +=
                "<div>" +
                "44, le joueur devient Dieu tout puissant et pourra attaquer le village quand la somme fait 7" +
                "</div>";
              text += setRole("Dieu");
            }
            /* If the roll is a 43, Dieu attacks the village */
            if (roll[0] == 3 || roll[1] == 3) {
              text += dieuAttaqueLeVillage(roll[2]);
            }
            /* If the roll is a 42, everyone drinks */
            if (roll[0] == 2 || roll[1] == 2) {
              text +=
                "<div>" +
                "42, C'est la Fête au village!!! Tout le monde boit " +
                roll[2];
              (" gorgées</div>");
            }
            /* If the roll is a 41, the player become the Catin */
            if (roll[0] == 1 || roll[1] == 1) {
              /* Dieu cannot be the Catin */
              if (players[index].roles.includes("Dieu")) {
                text +=
                  "<div> Dieu ne saurait devenir la Catin. Son tour ne sert à rien, il boit </div>";
              } else {
                text +=
                  "<div>" +
                  "41, Le joueur devient la Catin et s'interpose quand Dieu attaque le village" +
                  "</div>";
                text += setRole("Catin");
              }
            }
          }
        }
        /* If one of the roll is a 3 */
        if (roll[0] == 3 || roll[1] == 3) {
          /* If there is a Prisonnier in the game, he drink */
          if (roleExist("Prisonnier")) {
            text +=
              "<div>" +
              "Le Prisonnier boit autant qu'il y a de 3 dans le lancer" +
              "</div>";
          }
          /* If the roll is a 33 and the special dice is a 3 the player became the Apprenti */
          if (roll[0] == 3 && roll[1] == 3 && roll[2] == 3) {
            text +=
              "<div>" +
              "333, le joueur devient l'Apprenti et bois autant de gorgées bues par les autres joueurs" +
              "</div>";
            text += setRole("Apprenti");
          } else {
            /* If the roll is a 33, the player become the Héros */
            if (roll[0] == 3 && roll[1] == 3) {
              text +=
                "<div>" +
                "33, le joueur devient Héros et s'interposera quand Dieu attaquera le village" +
                "</div>";
              /* Dieu cannot becomme the Héro */
              if (players[index].roles.includes("Dieu")) {
                text +=
                  "<div>Dieu ne saurait devenir le Héros. Son tour ne sert à rien, il boit</div>";
              } else {
                text += setRole("Héros");
              }
            }
            /* If the roll is a 32, the player enter the prison */
            if (roll[0] == 2 || roll[1] == 2) {
              text +=
                "<div>" +
                "32, le joueur devient Prisonnier et boira à chaque dé valant 3" +
                "</div>";
              /* There can be only one player in prison */
              if (roleExist("Prisonnier")) {
                text +=
                  "<div> Il y a déjà quelqu'un en prison. Le lancer ne sert à rien, le joueur boit </div>";
              } else {
                /* If a player enter the prison, he lose all his roles */
                while (players[index].roles.length != 0) {
                  players[index].roles.splice(0, 1);
                }
                "<div>" +
                  "Le Prisonnier perd tout ses rôles et boit " +
                  roll[2] +
                  " gorgée(s) pour fêter ça" +
                  "</div>";
                text += setRole("Prisonnier");
              }
            }
          }
          /* If the roll is a 31, the player become the Ecuyer */
          if (roll[0] == 1 || roll[1] == 1) {
            text +=
              "<div>" +
              "31, le joueur devient Ecuyer et boira autant de gorgées que le Héros" +
              "</div>";
            /* There can be an Ecuyer only if there is a Héros */
            if (roleExist("Héros")) {
              /* Dieu cannot be an Ecuyer */
              if (players[index].roles.includes("Dieu")) {
                text +=
                  "<div>Dieu ne saurait devenir l'Ecuyer. Son tour ne sert à rien, il boit</div>";
              } else {
                /* The Héros cannot be the Ecuyer */
                if (players[index].roles.includes("Héros")) {
                  text +=
                    "<div>Le Héros ne peut pas se servir lui-même. Son tour ne sert à rien, il boit</div>";
                } else {
                  text += setRole("Ecuyer");
                }
              }
            } else {
              text +=
                "<div>" +
                "Un Ecuyer n'est rien sans son Héros. Le lancer est annulé et le joueur boit" +
                "</div>";
            }
          }
        }
        /* If one of the roll is a 2 */
        if (roll[0] == 2 || roll[1] == 2) {
          /* If the roll is a 22 and the special dice is a 2 the player became the Devin */
          if (roll[0] == 2 && roll[1] == 2 && roll[2] == 2) {
            text +=
              "<div>" +
              "222, le joueur deviens Devin et pourra interférer sur un des dés lancés en début de tour" +
              "</div>";
            text +=
              "<div>" + "Pas de rôle spécial pour le moment (WIP)" + "</div>";
            //text+=setRole("Devin");
          } else {
            /* If the roll is a 22, the player become the Héros */
            if (roll[0] == 2 && roll[1] == 2) {
              text +=
                "<div>" +
                "22, le joueur devient Héros et s'interposera quand Dieu attaquera le village" +
                "</div>";
              /* Dieu cannot be the Heros */
              if (players[index].roles.includes("Dieu")) {
                text +=
                  "<div>Dieu ne saurait devenir le Héros. Son tour ne sert à rien, il boit</div>";
              } else {
                text += setRole("Héros");
              }
            }
            /* If the roll is a 21, the player become the Oracle */
            if (roll[0] == 1 || roll[1] == 1) {
              text +=
                "<div>" +
                "21, le joueur devient Oracle et tentera de prédire le lancer du Héros (WIP)" +
                "</div>";
              text += setRole("Oracle");
            }
          }
        }
        /* If one of the roll is a 1 */
        if (roll[0] == 1 || roll[1] == 1) {
          /* If the roll is a 11 and the special dice is a 1 the player became the Clochard */
          if (roll[0] == 1 && roll[1] == 1 && roll[2] == 1) {
            text +=
              "<div>" +
              "111, le joueur devient le Clochard et boira le dé spécial à chaque lancer pendant un tour" +
              "</div>";
            text += setRole("Clochard");
          } else {
            /* If the roll is a 21, the player become the Héros */
            if (roll[0] == 1 && roll[1] == 1) {
              text +=
                "<div>" +
                "11, le joueur devient Héros et s'interposera quand Dieu attaquera le village" +
                "</div>";
              /* Dieu cannot become the Héros */
              if (players[index].roles.includes("Dieu")) {
                text +=
                  "<div>Dieu ne saurait devenir le Héros. Son tour ne sert à rien, il boit</div>";
              } else {
                text += setRole("Héros");
              }
            }
          }
        }
      }
    }
  }
  /* If the Apprenti is in game, we remember him to drink */
  if (roleExist("Apprenti")) {
    text += "<div> L'Apprenti n'oublie pas de prendre ses gorgées! </div>";
  }
  document.getElementById("actions").innerHTML = "<div> Actions:</div>" + text;
}

function setRole(role) {
  /*
   * Function that set the role of a player and check if the role already
   * exists
   */
  var text = "";
  /* If the role is already in game */
  if (roleExist(role)) {
    var playerIndex = getPlayerByRole(role);
    /* And if the role is not the player's */
    if (playerIndex != index) {
      var roleIndex = players[playerIndex].roles.indexOf(role);
      /* The player with the role lose it and the player get the role */
      players[playerIndex].roles.splice(roleIndex, 1);
      players[index].roles.push(role);
    } else {
      /* If the player already have this role, he drink */
      text +=
        "<div> Le joueur est déjà " + role + ". Il boit pour oublier ça </div>";
    }
  } else {
    /* If no one has the role, it is directly attributed */
    players[index].roles.push(role);
  }
  return text;
}

function getPlayerByRole(role) {
  /*
   * Function that return the index of the player that have the role in argument
   */
  var found = false;
  var playerIndex = 0;
  var roleIndex = 0;
  /* While the player isn't found or there is more player to check */
  while (!found && playerIndex < players.length) {
    roleIndex = 0;
    /* We check every role until we found it or there is no more */
    while (!found && roleIndex < players[playerIndex].roles.length) {
      /* If the current player have the role, we found it */
      if (players[playerIndex].roles[roleIndex] === role) {
        found = true;
      } else {
        /* Else we go to the next role */
        roleIndex += 1;
      }
    }
    if (!found) {
      /* If the current player don't have the role, we go to the next player */
      playerIndex += 1;
    }
  }
  return playerIndex;
}

function roleExist(role) {
  /*
   * Function that check if someone has the role in argument
   */
  var found = false;
  var playerIndex = 0;
  var roleIndex = 0;
  /* While we didn't found the role or there is more player to check */
  while (!found && playerIndex < players.length) {
    roleIndex = 0;
    /* We check each role of the player */
    while (!found && roleIndex < players[playerIndex].roles.length) {
      if (players[playerIndex].roles[roleIndex] === role) {
        /* If the player have the role, it is found */
        found = true;
      } else {
        /* else, we check the next role */
        roleIndex += 1;
      }
    }
    if (!found) {
      /* If we didn't found the role, we check the next player */
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
        text += "<div> Dieu boit " + value + " gorgée(s) </div>";
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

function checkSpecial() {
  text = "";
  if (players[index].roles.includes("Clochard")) {
    players[index].roles.splice("Clochard");
    text +=
      "<div>Fin du tour spécial: le Clochard trouve une maison et devient le Héros</div>";
    if (players[index].roles.includes("Dieu")) {
      text += "<div>Dieu ne saurait devenir le Héros. Il reste Dieu</div>";
    } else {
      text += setRole("Héros");
    }
  }
  if (players[index].roles.includes("Devin")) {
    players[index].roles.splice("Devin");
    text += setRole("Oracle");
    text += "Fin du tour spécial: Le Devin perd ses pouvoirs et devient Oracle";
  }
  if (players[index].roles.includes("Apprenti")) {
    players[index].roles.splice("Apprenti");
    text +=
      "Fin du tour spécial: L'Apprenti a fini d'étudier et devient Ecuyer";
    if (players[index].roles.includes("Dieu")) {
      text += "<div>Dieu ne saurait devenir l'Ecuyer. Il reste Dieu</div>";
    } else {
      if (players[index].roles.includes("Héros")) {
        text += "<div>Le joueur ne peut devenir son propre Ecuyer</div>";
      } else {
        text += setRole("Ecuyer");
      }
    }
  }
  if (players[index].roles.includes("Gourgandine")) {
    players[index].roles.splice("Gourgandine");
    text += setRole("Catin");
    text +=
      "Fin du tour spécial: La Gourgandine a fini de jouer et devient la Catin";
  }
  if (players[index].roles.includes("Impératrice")) {
    players[index].roles.splice("Impératrice");
    text +=
      "Fin du tour spécial: L'Impératrice perd son status et devient Princesse";
    if (players[index].roles.includes("Héros")) {
      text += "<div>Le Héros ne peut pas devenir Princesse</div>";
    } else {
      text += setRole("Princesse");
    }
  }
  if (players[index].roles.includes("Démon")) {
    players[index].roles.splice("Démon");
    text += setRole("Dieu");
    text += "Fin du tour spécial: le Démon calme sa colère et devient Dieu";
  }
  document.getElementById("special").innerHTML = text;
}
