import MoveTree from "./MoveTree";
export default class MoveNode {
    /**
     * Creates new MoveNode
     * @param {number[][]} name - How to get to this point from the parent MoveNode.
     * @param {number[][]} board -  The board at this point.
     * @param {1 | 2} player - The player whose turn it is at this point.
     */
    constructor (name, board, player) {
        if (!(player === 1 || player === 2))
            throw new Error(`Cannot create MoveNode with player=${player}. player must be 1 or 2.`);
        /**
         * Holds the child MoveNode(s) of this MoveNode.
         * Each child is a valid move that can be made
         *  by the current_player on the board.
         * @private
         * @type {MoveNode[]}
         */
        this._children = [];
        /**
         * The current board
         * @type {number[][]}
         */
        this._board = MoveNode.clone(board);
        /**
         * The move that was made to get to
         *  this point from the parents node
         * @type {number[][]}
         */
        this.name = name;
        /**
         * The player whose turn it currently is,
         * and whose valid moves are in _children
         * @type {number}
         */
        this.current_player = player;
        /**
         * The score of this MoveNode's board alone,
         *  non-relative to this MoveNode's children.
         * @type {number}
         */
        this.board_score = (() => {
            let p1_score = 0,
                p2_score = 0;
            for (let row of this._board) {
                for (let pos of row) {
                    if (pos === 1)
                        p1_score++;
                    else if (pos === 2)
                        p2_score++;
                    else if (pos === 1.1) 
                        p1_score += 3;
                    else if (pos === 2.1)
                        p2_score += 3;
                }
            }
            if (MoveTree.otherPlayer(this.current_player) === 1)
                return p1_score - p2_score;
            return p2_score - p1_score;
        })();
    }
    /**
     * Returns this MoveNode's board.
     * @return {number[][]}
     */
    get board () {
        // return MoveNode.clone(this._board);
        return this._board;
    }
    /**
     * Returns whether or not this node is a leaf in the MoveTree
     * @return {boolean}
     */
    get is_leaf () {
        return this._children.length === 0;
    }
    /**
     * Returns a deep copy of a 2D Array
     * @param {number[][]} arr - The Array to be cloned.
     * @return {number[][]}
     */
    static clone (arr) {
        return arr.map(a => a.slice(0));
    }
    /**
     * Yields all of the children of this MoveNode.
     * @yields {MoveNode}
     */
    * getAllChildren () {
        for (let child of this._children)
            yield child;
    }
    /**
     * generates all the pieces for the
     *  current player on this node's board.
     * @yields {number[]}
     */
    * getAllPieces () {
        for (let row = 0; row < this._board.length; row++)
            for (let col = 0; col < this._board.length; col++)
                if (Math.trunc(this._board[row][col]) === this.current_player)
                    yield [row, col];
    }
    /**
     * Creates all the children of this MoveNode.
     * The created children are stored in this._children.
     * @return {void}
     */
    createChildren () {
        //don't recreate the children once they've already be created
        if (!this.is_leaf) return;
        
        let no_jumps = true;
        //loop through all the peices and get the moves from them
        for (let piece of this.getAllPieces()) {
            //get the directions this piece can move
            let dirs = this.validMoveDirections(piece);
            //get any jumps this piece can make
            let jumps = getJumpsFrom(piece, MoveNode.clone(this._board), dirs);
           // this._children.push(jumps);
            if (jumps.length === 0 && no_jumps) {
                //no jumps were found, so check for normal moves
                this._children = this._children.concat(getNormMovesFrom(piece, MoveNode.clone(this._board), dirs));
                
            } else {
                // console.log("jump found"); 
                /*the first time a jump is found,
                    make sure _children is empty so that only jumps will be in it*/
                if (no_jumps) 
                    this._children = [];
                //A jump has been found: no longer check for normal moves
                no_jumps = false;
                
                //add jumps to moves
                this._children = this._children.concat(jumps);
            }
        }
    }
    /**
     * Deletes all the children of this MoveNode
     * @return {void}
     */
    deleteChildren () {
        this._children = [];
    }
    /**
     * Returns the child of this.head with the given name.
     * Returns null if no such child exists.
     * @param {number[][]} name - The name of the child being looked for.
     * @return {MoveNode|null}
     */
    getChild (name) {
        /*cool one-liner (but slightly less efiecent)
            return this._children.filter(c => namesAreEqual(c.name, name))[0] || null;*/
        for (let child of this._children)
            if (nameAreEqual(child.name, name))
                return child;
        return null;
    }
    /**
     * Returns all the directions a given piece can move on the current board.
     * @param {number[][]} piece The piece whose move directions are being looked for.
     * @return {number[]Object[]} All the directions a given piece can move on the current board.
     */
    validMoveDirections ([row,col]) {
        /**
         * All the directions a piece can be moved
         * A kinged piece can move in all the directions listed
         */
        const DIRECTIONS = {
            1: [ //the directions non-kinged Player 1 can move
                {x:1, y:-1}, //down-left
                {x:1, y:1} //down-right
            ],
            2: [ //the directiond non-kinged Player 2 can move
                {x:-1, y:-1}, //up-left
                {x:-1, y:1} //up-right
            ]
        };
        //get the player at pos
        let player = Math.trunc(this._board[row][col]);
        //check if that player is kinged
        let isKinged = this._board[row][col] > this.current_player;
        
        //retrive the directions the player can move
        let dirs = DIRECTIONS[player];
        
        //if the piece is kinged than it can move in all directions
        if (isKinged) {
            //this piece is kinged so add the opposite player's
            //  move directions to the existing ones
            if (player === 1) {
                dirs = dirs.concat(DIRECTIONS[2]);
            } else {
                dirs = dirs.concat(DIRECTIONS[1]);
            }
        }
        return dirs;
    }
    /**
     * @override
     * @return {string} A string representation of this MoveNode.
     */
    toString () {
        return (`name: ${JSON.stringify(this.name)}\n`
                +`number of children: ${this._children.length}`);
    }
}

//private functions
/**
 * Returns an Array of MoveNodes representing all the 
 *  jumps a given piece can make on a given board.
 * @param {number[]} piece - The [row, col] of the piece making the jump.
 * @param {number[][]} board - The board on which the jump will be made.
 * @param {Object[]} dirs - The direction array for the piece making the jump.
 * @return {MoveNode[]}
 */
function getJumpsFrom ([row, col], board, dirs) {
    // console.log(row + ", " + col);
    let player = Math.trunc(board[row][col]);
    let all_jumps = [];
    
    //in each direction...
    for (let direction of dirs) {
        //see if a jump is open
        const jumped_row = row + direction.x;
        const jumped_col = col + direction.y;
        
        //make sure jumped_row and jumped_col are on the board
        if (!onBoard(jumped_row, jumped_col))
            continue;
        //get what is in the square that will be jumped
        const jumped_square = Math.trunc(board[jumped_row][jumped_col]);
        //make sure the space holds an enemy piece
        if (jumped_square === player || jumped_square === 0) continue;
        
        const end_row = row + (direction.x * 2);
        const end_col = col + (direction.y * 2);
        
        //make sure end_row and end_col are on the board
        if (!onBoard(end_row, end_col))
            continue;
        //get what is at the landing point of the jump
        const end_square = Math.trunc(board[end_row][end_col]);
        //make sure the square is empty
        if (end_square !== 0) continue;
        
        //A jump is open so take it
        
        //make a deep copy of board so it won't really get changed
        let board_copy = MoveNode.clone(board);
        
        //make a move on the board copy 
        board_copy[end_row][end_col] = player;
        board_copy[jumped_row][jumped_col] = 0;
        board_copy[row][col] = 0;

        //check if the piece should be kinged
        if (!onBoard(end_row + direction.x, end_col))
            board_copy[end_row][end_col] = Math.trunc(board[row][col]) + .1;

        let jump_path = [ [row, col], [end_row, end_col] ];

        let additional_jumps = getJumpsFrom([end_row, end_col], board_copy, dirs);
        
        if (additional_jumps.length !== 0)
            for (let jump of additional_jumps) {
                jump.name.unshift(jump_path[0]);
                all_jumps.push(jump);
            }
        else 
            all_jumps.push(new MoveNode(jump_path, board_copy, MoveTree.otherPlayer(player)));
        
    }
    return all_jumps;
}
/**
 * Returns an Array of MoveNodes representing all the normal moves 
 *  (i.e. non-jumps) that the given piece can make on the given board.
 * @param {number[]} piece - The [row, col] of the piece making the move.
 * @param {numbr[][]} board - The board the piece is moving on.
 * @param {Object[]} dirs - The dirrection array for the piece moving.
 * @return {MoveNode[]}
 */
function getNormMovesFrom ([row, col], board, dirs) {
    let moves = [];
    //check each direction to see if the piece can be moves there
    for (let direction of dirs) {
        //get the position the piece will end up if moved in the current direction
        let new_row = row + direction.x;
        let new_col = col + direction.y;
        
        //make sure new_row & new_col are on the board
        if (!onBoard(new_row, new_col))
            continue;
        
        //make sure that position is empty
        if (board[new_row][new_col] === 0) {
            //this is a vadil move...
            
            let board_copy = MoveNode.clone(board);
            board_copy[new_row][new_col] = board[row][col];
            board_copy[row][col] = 0;

            //check if the piece should be kinged
            if (!onBoard(new_row + direction.x, new_col))
                board_copy[new_row][new_col] = Math.trunc(board[row][col]) + .1;


            let move_path = [ [row, col], [new_row, new_col] ];
            const opposite_player = MoveTree.otherPlayer(Math.trunc(board[row][col]));
            //add it to the array of moves to be returned
            moves.push(new MoveNode(move_path, board_copy, opposite_player));
        }
    }
    return moves;
}
function onBoard (row, col) {
    const HEIGHT = 8;
    const WIDTH = 8;
    return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH;
}
function nameAreEqual (n1, n2) {
    return JSON.stringify(n1) === JSON.stringify(n2);
}