console.log("Hello, World!");

var players = new Array()

console.log(rollDices());

/*
let one = new Player("Manu");
players.push(one);
console.log(one.name);

document.write("\n");
document.write("List des joueurs:\n");
players.forEach(function(player){
	document.write(player.name + "\n");
});*/


function getPlayers(){
	console.log("Liste des joueurs:\n");
	players.forEach(function(player){
		console.log(player.name + "\n");
	});
}

function addPlayer(name){
	let player = new Player(name);
	players.push(player);
}
