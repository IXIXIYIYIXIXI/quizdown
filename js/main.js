var ws_uri = "ws://localhost:8080";
var websocket = new WebSocket(ws_uri);

// on websocket open
websocket.onopen = function(event) {
    console.log('You have entered the chat room.');
};

// on websocket close
websocket.onclose = function(event) {
    console.log('You have been disconnected.');
};

// on websocket error
websocket.onerror = function(event) {
	console.log('Connection to chat failed.');
};

// on websocket message received
websocket.onmessage = function(event) {
    var data = JSON.parse(event.data);

	if (data.type == "opponent_ready") {
		document.getElementById("opponent-ready").innerHTML = "Opponent is ready!";
	}
};

function readyClicked() {
	document.getElementById("you-ready").innerHTML = "You are ready!";
	
	var data = {
		type: "ready"
	};

	websocket.send(JSON.stringify(data));
}
