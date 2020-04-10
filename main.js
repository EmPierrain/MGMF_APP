console.log("Hello, World!");

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

/*







*/
document.write("<div style='height:42px; width:100%'></div>");

document.write(
  "<div><label for='playerName'>Player to add:</label><input type='text' id='playerName' name='player_Name'><button type='button' onclick='addPlayer(document.getElementById(\"playerName\").value)'>Add Player</button> </div>"
);
document.write("<div id='playerList'>Liste des joueurs:</div>");
document.write(
  "<p><div>Zone d'action:<div><button type='button' onclick='play()'>Play a turn</button> </div></div>"
);
document.write("<p><div id='dices'>Lancé de dés:</div>");

document.write("<div id='actions'>Actions:</div>");

var players = new Array();

/*
let one = new Player("Manu");
players.push(one);
console.log(one.name);

document.write("\n");&emsp;
document.write("List des joueurs:\n");
players.forEach(function(player){
	document.write(player.name + "\n");
});*/

function getPlayers() {
  var text = "";
  text += "<div>Liste des joueurs:</div>";
  players.forEach(function (player) {
    text += "<div>" + player.name + "</div>";
  });
  document.getElementById("playerList").innerHTML = text;
}

function addPlayer(name) {
  let player = new Player(name);
  players.push(player);
  getPlayers();
}
