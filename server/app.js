// include dependencies
var websocket = require("websocket").server;
var http = require("http");
const { Player, Game } = require('./util.js');

// local variables
var port = 8080;
var games = {};

// create server, and have listen on port 8080
var server = http.createServer();

server.listen(port, function() {
    console.log("Server listening on port " + port + ".");
});

var ws_server = new websocket({
    httpServer: server
});

ws_server.on('request', request => {
    var connection = request.accept(null, request.origin);

    var playerId = request.host + ":" + request.key;
    var player = new Player(playerId, connection);

    var game = findAvailableGame(player);
    console.log('Joined ' + game.id + ': ' + playerId);

    console.log('-----------------------------');
    console.log(games);
    console.log('-----------------------------');

    connection.on('message', message => {
        var data = JSON.parse(message.utf8Data);

        if (data.type == 'ready') {
            console.log('Ready: ' + playerId + ' in game ' + game.id);
            game.setPlayerReady(player);
            game.getOtherPlayer(player).connection.sendUTF(JSON.stringify({
                type: 'opponent_ready'
            }));
        } else {
            console.log('Received from ' + playerId + ': ' + message.utf8Data);
        }
    });

    connection.on('close', (_reasonCode, _description) => {
        if (game.removePlayer(player)) {
            delete games[game.id];
        }
        console.log('Removed ' + playerId + ' from game ' + game.id);
    });
});

// helper function to find game for user
function findAvailableGame(player) {
    for (var gameId in games) {
        if (games[gameId].state == 'waiting') {
            games[gameId].addPlayer(player);
            console.log({0: games[gameId]});
            return games[gameId];
        }
    }
    var newGame = new Game(player);
    games[newGame.id] = newGame;
    return games[newGame.id];
}
