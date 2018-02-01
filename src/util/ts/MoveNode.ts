import MoveTree, { Player, NodeName, Position } from "./MoveTree";
interface MoveVector {
    readonly x: -1 | 1;
    readonly y: -1 | 1;
}

export default class MoveNode {
    
    public board_score: number;
    public current_player: Player;
    public name: NodeName;

    private _board: number[][];
    private _children: MoveNode[];
    /**
     * Creates new MoveNode
     * @param {Name} name - How to get to this point from the parent MoveNode.
     * @param {number[][]} board -  The board at this point.
     * @param {1 | 2} player - The player whose turn it is at this point.
     */
    constructor (name: NodeName, board: number[][], player: Player) {
        if (!(player === Player.PLAYER_1 || player === Player.PLAYER_2))
            throw new Error(`Cannot create MoveNode with player=${player}. player must be 1 or 2.`);
        /**
         * The current board
         * @type {number[][]}
         */
        this._board = MoveNode.clone(board);
        /**
         * Holds the child MoveNode(s) of this MoveNode.
         * Each child is a valid move that can be made
         *  by the current_player on the board.
         * @private
         * @type {MoveNode[]}
         */
        this._children = [];
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
            const player = this.current_player;
            const opponent = player === 1 ? 2 : 1;
            let player_score: number = 0,
                opponent_score: number = 0;

            for (let row of this._board) {
                for (let pos of row) {
                    switch (pos) {
                        case player: 
                            player_score++; 
                            break;
                        case player + .1:
                            player_score += 3;
                            break;
                        case opponent:
                            opponent_score++;
                            break;
                        case opponent + .1:
                            opponent_score += 3;
                            break;
                        default: break;
                    }
                    
                }
            }
            return player_score - opponent_score;
        })();
    }
    /**
     * Returns this MoveNode's board.
     * @return {number[][]}
     */
    public get board (): number[][] {
        // return MoveNode.clone(this._board);
        return this._board;
    }
    /**
     * Returns whether or not this node is a leaf in the MoveTree
     * @return {boolean}
     */
    public get is_leaf (): boolean {
        return this._children.length === 0;
    }
    /**
     * Returns a deep copy of a 2D Array
     * @param {number[][]} arr - The Array to be cloned.
     * @return {number[][]}
     */
    private static clone (arr: number[][]): number[][] {
        return arr.map(a => a.slice(0));
    }
    /**
     * Yields all of the children of this MoveNode.
     * @yields {MoveNode}
     */
    public * getAllChildren (): IterableIterator<MoveNode> {
        for (let child of this._children)
            yield child;
    }
    /**
     * generates all the pieces for the
     *  current player on this node's board.
     * @yields {number[]}
     */
    private * getAllPieces (): IterableIterator<Position> {
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
    public createChildren (): void {
        //don't recreate the children once they've already be created
        if (!this.is_leaf) return;
        
        let no_jumps: boolean = true;
        //loop through all the peices and get the moves from them
        for (let piece of this.getAllPieces()) {
            //get the directions this piece can move
            const dirs = this.validMoveDirections(piece);
            //get any jumps this piece can make
            const jumps = this.getJumpsFrom(piece, MoveNode.clone(this._board), dirs);
           // this._children.push(jumps);
            if (jumps.length === 0 && no_jumps) {
                //no jumps were found, so check for normal moves
                this._children = this._children.concat(this.getNormMovesFrom(piece, MoveNode.clone(this._board), dirs));
                
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
    public deleteChildren (): void {
        this._children = [];
    }
    /**
     * Returns the child of this.head with the given name.
     * Returns null if no such child exists.
     * @param {NodeName} name - The name of the child being looked for.
     * @return {MoveNode|null}
     */
    public getChild (name: NodeName): MoveNode | null {
        /*cool one-liner (but slightly less efficient)
            return this._children.filter(c => namesAreEqual(c.name, name))[0] || null;*/
        for (let child of this._children)
            if (this.nameAreEqual(child.name, name))
                return child;
        return null;
    }
    /**
     * @override
     * @return {string} A string representation of this MoveNode.
     */
    public toString (): string {
        return (`name: ${JSON.stringify(this.name)}\n`
                +`number of children: ${this._children.length}`);
    }
    /**
     * Returns all the directions a given piece can move on the current board.
     * @param {Position} piece The piece whose move directions are being looked for.
     * @return {MoveVector[]} All the directions a given piece can move on the current board.
     */
    private validMoveDirections ([row, col]: Position): MoveVector[] {
        /**
         * All the directions a piece can be moved
         * A kinged piece can move in all the directions listed
         */
        const DIRECTIONS: {1: MoveVector[], 2: MoveVector[]} = {
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
        let player: Player = Math.trunc(this._board[row][col]);
        //check if that player is kinged
        let isKinged: boolean = this._board[row][col] > this.current_player;
        
        //retrive the directions the player can move
        let dirs: MoveVector[] = DIRECTIONS[player];
        
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
     * Returns an Array of MoveNodes representing all the 
     *  jumps a given piece can make on a given board.
     * @param {Position} piece - The [row, col] of the piece making the jump.
     * @param {number[][]} board - The board on which the jump will be made.
     * @param {MoveVector[]} dirs - The direction array for the piece making the jump.
     * @return {MoveNode[]}
     */
    private getJumpsFrom ([row, col]: Position, board: number[][], dirs: MoveVector[]): MoveNode[] {
        // console.log(row + ", " + col);
        let player: Player = Math.trunc(board[row][col]);
        let all_jumps: MoveNode[] = [];
        
        //in each direction...
        for (let direction of dirs) {
            //see if a jump is open
            const jumped_row = row + direction.x;
            const jumped_col = col + direction.y;
            
            //make sure jumped_row and jumped_col are on the board
            if (!this.onBoard(jumped_row, jumped_col))
                continue;
            //get what is in the square that will be jumped
            const jumped_square = Math.trunc(board[jumped_row][jumped_col]);
            //make sure the space holds an enemy piece
            if (jumped_square === player || jumped_square === Player.EMPTY)
                continue;
            
            const end_row = row + (direction.x * 2);
            const end_col = col + (direction.y * 2);
            
            //make sure end_row and end_col are on the board
            if (!this.onBoard(end_row, end_col))
                continue;

            //get what is at the landing point of the jump
            const end_square = Math.trunc(board[end_row][end_col]);
            //make sure the square is empty
            if (end_square !== 0) continue;
            
            //A jump is open so take it
            
            //make a deep copy of board so it won't really get changed
            let board_copy: number[][] = MoveNode.clone(board);
            
            //make a move on the board copy 
            board_copy[end_row][end_col] = board[row][col];
            board_copy[jumped_row][jumped_col] = 0;
            board_copy[row][col] = 0;
    
            //check if the piece should be kinged
            if (!this.onBoard(end_row + direction.x, end_col))
                board_copy[end_row][end_col] = Math.trunc(board[row][col]) + .1;
    
            let jump_path: Position[] = [ [row, col], [end_row, end_col] ];
    
            let additional_jumps: MoveNode[] = this.getJumpsFrom([end_row, end_col], board_copy, dirs);
            
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
    private getNormMovesFrom ([row, col]: Position, board: number[][], dirs: MoveVector[]): MoveNode[] {
        let moves: MoveNode[] = [];
        //check each direction to see if the piece can be moves there
        for (let direction of dirs) {
            //get the position the piece will end up if moved in the current direction
            const new_row = row + direction.x;
            const new_col = col + direction.y;
            
            //make sure new_row & new_col are on the board
            if (!this.onBoard(new_row, new_col))
                continue;
            
            //make sure that position is empty
            if (board[new_row][new_col] === 0) {
                //this is a vadil move...
                
                let board_copy: number[][] = MoveNode.clone(board);
                board_copy[new_row][new_col] = board[row][col];
                board_copy[row][col] = 0;

                //check if the piece should be kinged
                if (!this.onBoard(new_row + direction.x, new_col))
                    board_copy[new_row][new_col] = Math.trunc(board[row][col]) + .1;


                let move_path: Position[] = [ [row, col], [new_row, new_col] ];
                const opposite_player = MoveTree.otherPlayer(Math.trunc(board[row][col]));
                //add it to the array of moves to be returned
                moves.push(new MoveNode(move_path, board_copy, opposite_player));
            }
        }
        return moves;
    }
    /**
     * Returns whether a given position is on the board
     * @param row - The row index
     * @param col - The column index
     */
    private onBoard (row: number, col: Number): boolean {
        const HEIGHT = 8;
        const WIDTH = 8;
        return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH;
    }
    /**
     * Checks if two NodeNames are the same
     * @param n1 - The first NodeName being compared
     * @param n2 - The second NodeName being compared
     */
    private nameAreEqual (n1: NodeName, n2: NodeName): boolean {
        return JSON.stringify(n1) === JSON.stringify(n2);
    }
}
