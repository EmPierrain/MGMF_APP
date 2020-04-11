document.write("<p> var players: liste des joueurs<p>");
document.write(
  "<p> function getPlayers(): affiche la liste des joueurs dans la div playerList<p>"
);
document.write(
  "<p> function addPlayer(nom): ajoute un joueur à la liste des joueurs<p>"
);
document.write("<p> function rollDices(): lance 3 dés<p>");
document.write(
  "<p> function getActionsByRoll(roll): retourne les actions selon le lancé<p>"
);
document.write("<p> function Play(): lance les dés et affiche les actions<p>");
document.write(
  "<p> function setRole(role): Attribue le rôle role au joueur actif <p>"
);
document.write(
  "<p> function roleExist(role): Retourne vrai si un role est déjà attribué <p>"
);

/*







*/
document.write("<div style='height:42px; width:100%'></div>");

document.write(
  "<div><label for='playerName'>Player to add:</label><input type='text' id='playerName' name='player_Name'><button type='button' onclick='addPlayer(document.getElementById(\"playerName\").value)'>Add Player</button> </div>"
);
document.write("<div id='playerExist'></div>");
document.write("<div id='playerList'>Liste des joueurs:</div>");
document.write(
  "<p><div>Zone d'action:<div><button type='button' onclick='play()'>Play a turn</button> </div></div>"
);
document.write("<p><div id='round'>Tour de </div>");

document.write("<p><div id='dices'>Lancé de dés:</div>");

document.write("<div id='actions'>Actions:</div>");

var players = new Array();
var index = 0;

function getPlayers() {
  var text = "";
  text += "<div>Liste des joueurs:</div>";
  players.forEach(function (player) {
    text += "<div>" + player.name + " ";
    player.roles.forEach(function (role) {
      text += role + " ";
    });
    text += "</div>";
  });
  document.getElementById("playerList").innerHTML = text;
}

function addPlayer(name) {
  if (!playerExist(name)) {
    document.getElementById("playerExist").innerHTML = "";
    if (index != 0) {
      index = index % players.length;
    }
    document.getElementById("playerName").value = "";
    let player = new Player(name);
    players.push(player);
    getPlayers();
  } else {
    document.getElementById("playerExist").innerHTML =
      "<div> Ce joueur existe déjà. Veuillez rentrer un autre nom</div>";
  }
}

function playerExist(name) {
  var found = false;
  var playerIndex = 0;
  while (!found && playerIndex < players.length) {
    if (name === players[playerIndex].name) {
      found = true;
    } else {
      playerIndex += 1;
    }
  }
  return found;
}
