import MoveNode from "./MoveNode";

const starting_board  = [
    //0   1   2   3   4   5   6   7
    [ 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 ],//0
    [ 1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 ],//1
    [ 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 ],//2
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//3
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//4
    [ 2 , 0 , 2 , 0 , 2 , 0 , 2 , 0 ],//5
    [ 0 , 2 , 0 , 2 , 0 , 2 , 0 , 2 ],//6
    [ 2 , 0 , 2 , 0 , 2 , 0 , 2 , 0 ]//7,
];
// const starting_board  = [
//     //0   1   2   3   4   5   6   7
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//0
//     [ 1.1, 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//1
//     [ 0 , 2 , 0 , 0 , 0 , 0 , 0 , 0 ],//2
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//3
//     [ 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 ],//4
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//5
//     [ 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 ],//6
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]//7,
// ];
export default class MoveTree {
    /**
     * Creates a new MoveTree
     * @param {number[][]} [board] - The board to build the MoveTree of.
     * @param {number} [player] - The player whose turn it is.
     * @param {number} [levels=3] - How many levels the tree should be created with.
     */
    constructor (board, player = 1, levels = 3) {
        this._head = new MoveNode([], (board === null ? starting_board : board), player);
        this._levels = (levels > 0 ? levels : 1);
        this.fillTree();
    }
    /**
     * Returns the player who is not the one passed.
     * 0 => 0, 
     * 1 => 2, 
     * 2 => 1
     * @param {0 | 1 | 2} player
     * @throws When an invalid value is passed as player.
     */
    static otherPlayer (player) {
        switch (player) {
            case 0: return 0;
            case 1: return 2;
            case 2: return 1;
            default:
                throw new Error(`${player} is not a valid player number. Must be 1 or 2.`);
        }            
    }
    /**
     * Sets the number of levels this tree should have.
     * @param {number} num The new number of levels the tree should have.
     */
    set levels (num) {
        if (num < 0) {
            this._levels = num;
            this.fillTree();
        }
    }
    /**
     * Returns a deep copy of the head's board.
     * @see this._head.board
     * @return {number[][]}
     */
    get current_board () {
        return this._head.board;
    }
    /**
     * Returns the number player whose turn it currently is
     * (i.e. who is allowed to make a move).
     * @return {number}
     */
    get current_player () {
        return this._head.current_player;
    }
    /**
     * Returns whether this game is over.
     * The game is over whan there are no moves
     *  left for the current player to make.
     * @return {boolean}
     */
    get game_over () {
        if (this._head.is_leaf)
            this.fillTree();
        return this._head.is_leaf;
    }
    /**
     * Recursively fills the MoveTree with the
     *  number of levels given in _levels.
     * @return {void}
     */
    fillTree () {
        const LEVELS = this._levels;
        /**
         * Recursively generates all the children of a given MoveNode,
         *  so that the MOveTree has the correct number of levels.
         * @param {MoveNode} head - The MoveNode whose children will be generated.
         * @param {number} current_level - The current level in the MoveTree.
         * @return {void}
         */
        (function generateSubTree (head, current_level) {
            if (head.is_leaf)
                head.createChildren();
            //base case
            if (current_level + 1 === LEVELS || head.isLeaf) {
                head._children = [];
                return;
            }
            for (let child of head.getAllChildren())
                generateSubTree(child, current_level + 1);
        })(this._head, 0);
        // console.log("tree filled");
    }
    /**
     * Returns an Array of all the valid moves on the current_board
     * @return {number[][]][]}
     */
    getValidMoves () {
        /*converts the getAllCHildren generator into an array
            of MoveNodes, and the maps the results to a new array
            of each of the MoveNode's names*/
        return [...this._head.getAllChildren()].map(c => c.name);
    }
    /**
     * Returns the best move for the current player.
     * @return {number[][]}
     */
    getBestMove () {
        /**
         * Uses a min-max approach to assign a score to a given MoveNode,
         * based the the scores of it's children.
         * The higher the score, the better the move should be.
         * @param {MoveNode} node 
         * @return {number}
         */
        const relativeScore = (node) => {
            let best_score = null;
            const find_max = node.current_player !== this._head.current_player;
            for (let child of node.getAllChildren()) {
                if (child.is_leaf) {
                    if (best_score === null ||
                    (find_max && child.board_score > best_score) ||
                    (!find_max && child.board_score < best_score)) {
                        best_score = child.board_score;
                    }
                } else {
                    const child_score = relativeScore(child);
                    if ((find_max && child_score > best_score) ||
                        (!find_max && child_score < best_score)) {
                        best_score = child_score;
                    }
                }
            }
            return best_score;
        };
        let max_score = -Infinity, max_node = null;
        for (let child of this._head.getAllChildren()) {
            //get the relatviveScore of all the _head's children
            const move_score = relativeScore(child);
            if (move_score >= max_score) {
                max_score = move_score;
                if (max_node === null)
                    max_node = child;
                /*when two MoveNodes have the same relativeScore,
                    choose the MoveNode with the higher board_score*/
                else if (move_score === max_score) {
                    const max_node_score = max_node.board_score;
                    const child_score = child.board_score;
                    if (child_score > max_node_score)
                        max_node = child;
                    //if the two board_scores are equal, pick one at random
                    if (child_score === max_node_score)
                        max_node = (Math.random() > .5 ? max_node : child);
                } else
                    max_node = child;
            }
        }
        return max_node.name;
    }
    getResultingTree (move) {
        const node = this._head.getChild(move);

        if (node === null)
            return null;

        return (new MoveTree(
            node.board, 
            MoveTree.otherPlayer(this.current_player), 
            this._levels
        ));
    }
    /**
     * Returns if the given move is valid on this tree's head node
     * @param {number[][]} path 
     */
    isValidMove (path) {
        return this._head.getChild(path) !== null;
    }
    /**
     * Tries to make a move on the MoveTree.
     * Returns a Object literal with whether the move was successful,
     *  and if the game is now over.
     * @param {number[][]} move - The move that will be made on the MoveTree.
     * @return {{success: boolean, game_over: boolean}}
     */
    makeMove (move) {
        const child = this._head.getChild(move);
        if (child === null)
            return {success: false, game_over: this.game_over};
        this._head = child;
        this.fillTree();
        this._head.name = [];
        return {success: true, game_over: this.game_over};
    }
    pieceAt ([row, col]) {
        return this._head._board[row][col];
    }
}

