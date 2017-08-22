import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import Lockr from 'lockr';
// Lockr.prefix = "react_checkers";
// // Lockr.flush("saved_games");
// const gameInfo = {
//     board: [
//         //0   1   2   3   4   5   6   7
//         [ 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 ],//0
//         [ 1 , 0 , 1 , 0 , 1 , 0 , 1 , 0 ],//1
//         [ 0 , 1 , 0 , 1 , 0 , 1 , 0 , 1 ],//2
//         [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//3
//         [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//4
//         [ 2 , 0 , 2 , 0 , 2 , 0 , 2 , 0 ],//5
//         [ 0 , 2 , 0 , 2 , 0 , 2 , 0 , 2 ],//6
//         [ 2 , 0 , 2 , 0 , 2 , 0 , 2 , 0 ]//7,
//     ],
//     created: new Date(),
//     last: new Date(),
//     turn: 1,
//     p1: {
//         name: "Joe", is_ai: false, score: 0
//     },
//     p2: {
//         name: "Bill", is_ai: false, score: 0
//     }
// };
// const games = [gameInfo];
//make sure the browser supports local storage
window.localStorageSupport = typeof(Storage) !== "undefined";
window.gameToLoad = null;
window.savedGames = [];
// Lockr.set("saved_games", games);

ReactDOM.render(<App />, document.getElementById('root'));
