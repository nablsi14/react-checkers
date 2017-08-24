import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//make sure the browser supports local storage
window.localStorageSupport = typeof(Storage) !== "undefined";

ReactDOM.render(<App />, document.getElementById('root'));
