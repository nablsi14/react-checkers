import "bootstrap/dist/css/bootstrap.min.css";
import Lockr from "lockr";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

Lockr.prefix = "react_checkers";
// make sure the browser supports local storage
// @ts-ignore
declare let localStorageSupport: boolean;

// window.localStorageSupport = typeof(Storage) !== "undefined";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
// https://www.typescriptlang.org/docs/handbook/advanced-types.html
// https://reactstrap.github.io/components/form/
// https://getbootstrap.com/docs/4.0/components/forms/
// https://fontawesome.com/icons?d=gallery
