class CurrentGame {
    constructor () {
        this._board = null;
        this._created_date = null;
        this._p1 = {
            is_ai: false,
            name: null,
            score: 0,
        };
        this._p2 = {
            is_ai: false,
            name: null,
            score: 0,
        };
        this._turn = 1;
    }
    get board () {
        return this._board;
    }
    get createdDate () {
        return this._created_date;
    }
    get turnIsAI () {
        return this[`_p${this._turn}`].is_ai;
    }
    get info () {
        return {
            board: JSON.parse(JSON.stringify(this._board)),
            created: this._created_date,
            p1: JSON.parse(JSON.stringify(this._p1)),
            p2: JSON.parse(JSON.stringify(this._p2)),
            turn: this._turn
        };
    }
    get p1Name () {
        return this._p1.name;
    }
    get p1Score () {
        return this._p1.score;
    }
    get p2Name () {
        return this._p2.name;
    }
    get p2Score () {
        return this._p2.score;
    }
    get turn () {
        return this._turn;
    }
    newGame (info) {
        this._created_date = new Date();
        this._p1 = JSON.parse(JSON.stringify(info.p1));
        this._p2 = JSON.parse(JSON.stringify(info.p2));
        this._turn = 1;
        this._board = null;
    }
    setBoard (board) {
        if (board.constructor !== Array || board[0].constructor !== Array)
            throw new TypeError("Argument board must be a 2d Array");
        this._board = JSON.parse(JSON.stringify(board));
    }
    setPlayerAI (playerNum, isAI) {
        if (playerNum !== 1 && playerNum !== 2)
            throw new Error("Invalid player number: " + playerNum);
        if (typeof isAI !== "boolean")
            throw new TypeError("Argument 'isAI' must be of type 'boolean'. Type passed: " + typeof isAI);
        this[`_p${playerNum}`].is_ai = isAI;
    }
    setPlayerName (playerNum, name) {
        if (playerNum !== 1 && playerNum !== 2)
            throw new Error("Invalid player number: " + playerNum);
        this[`_p${playerNum}`].name = name;
    }
    setPlayerScore (playerNum, score) {
        if (playerNum !== 1 && playerNum !== 2)
            throw new Error("Invalid player number: " + playerNum);
        if (score < 0)
            throw new Error("Score must always be greater than 0");
        this[`_p${playerNum}`].score = score;
    }
    setTurn (playerNum) {
        if (playerNum !== 1 && playerNum !== 2)
            throw new Error("Invalid player number: " + playerNum);
        this._turn = playerNum;
    }
    update (game) {
        this.setBoard(game.board);
        this._p1 = JSON.parse(JSON.stringify(game.p1));
        this._p2 = JSON.parse(JSON.stringify(game.p2));
        this.setTurn(game.turn);
        this._created_date = game.created;
    }
}
const Current = new CurrentGame();

export default Current;