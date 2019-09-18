import React from "react";
import { render } from "react-dom";

import "./styles/index.css"

import PageManager from "./pages/PageManager";

const App = () => {

    return <PageManager />

};

render(<App />, document.getElementById("app"));
