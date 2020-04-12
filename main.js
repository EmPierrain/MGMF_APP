document.write("<div>TODO List:</div>");
document.write("<div>- Ajouter le rôle du Dragon</div>");
document.write("<div>- Ajouter des explications + conte</div>");
document.write("<div>- Ajouter la bataille de Héros et de Dieu</div>");
document.write("<div>- Ajouter Les rôles spéciaux</div>");
document.write("<div>- Supprimer un joueur</div>");
document.write("<div>- Rôles incompatibles</div>");
document.write("<div>- Rajouter rôle de l'Oracle</div>");
document.write("<div>- Rajouter le rôle de l'Aubergiste</div>");
document.write("<div>- Pas d'Ecuyer si pas de Héros</div>");
document.write("<div>- Rendre ça jolie? PTDR</div>");
document.write("<div>- Ajouter commentaire au code</div>");

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
  if (!playerExist(name) && name != "") {
    document.getElementById("playerExist").innerHTML = "";
    if (index != 0) {
      index = index;
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
