import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//make sure the browser supports local storage
window.localStorageSupport = typeof(Storage) !== "undefined";
//initialize global variables
window.gameToLoad = null;
window.savedGames = [];

ReactDOM.render(<App />, document.getElementById('root'));
