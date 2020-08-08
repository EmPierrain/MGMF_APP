var players = new Array();
var index = 0;

var input = document.getElementById("playerName");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addButton").click();
  }
});

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
      "<div> Ce joueur existe déjà ou rien n'a été renseigné. Veuillez rentrer un autre nom</div>";
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
