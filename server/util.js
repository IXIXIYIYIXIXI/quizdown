const { randomUUID } = require('crypto');

class Player {
    constructor(id, connection) {
        if (!id) {
            id = randomUUID();
        }
        this.id = id;
        this.connection = connection;
    }
}

class Game {
    constructor(player1) {
        this.player1 = player1;
        this.id = randomUUID();
        this.state = 'waiting';
    }

    getPlayer(player) {
        if (player.id == this.player1.id) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    getOtherPlayer(player) {
        if (player.id == this.player1.id) {
            return this.player2;
        } else {
            return this.player1;
        }
    }

    addPlayer(player) {
        if (this.state == 'waiting') {
            this.player2 = player;
            this.state = 'ready';
        }
    }

    setPlayerReady(player) {
        if (player.id == this.player1.id) {
            this.player1Ready = true;
        } else {
            this.player2Ready = true;
        }
    }

    start() {
        this.state = 'started';
    }

    removePlayer(player) {
        if (player.id == this.player1.id) {
            this.player1 = null;
        } else {
            this.player2 = null;
        }
        this.state = 'waiting';
        if (!this.player1 && !this.player2) {
            return true;
        }
        return false;
    }

}

module.exports = { Player, Game };