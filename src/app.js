import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import APIService from "./services/api.service";

import "./styles/index.css"

import PageManager from "./pages/PageManager";

const App = () => {
    const [categoriesMaster, setCategoriesMaster] = useState([]);
    useEffect(() => {
        APIService.fetchCategories()
            .then(data => {
                setCategoriesMaster(data.categories);
            });
    }, [])

    return <PageManager categories={categoriesMaster} />
};

render(<App />, document.getElementById("app"));
