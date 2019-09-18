import React, { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import NotFoundPage from "./NotFoundPage";
import RestaurantsListPage from "./RestaurantsListPage";


import RouterService from "../services/router.service";
import LocalStorageService from "../services/localstorage.service";

const PAGES = {
    '/': SearchPage,
    '/restaurants': RestaurantsListPage,
    // '/restaurants/:id': RestaurantsDetailsPage
};


export default (props) => {

    const exisitingDataStore = LocalStorageService.loadDataStore();

    const [dataStore, setDataStore] = useState(exisitingDataStore || {});


    const updateDataStore = (update) => {
        LocalStorageService.saveDataStore(update);
        setDataStore(update);
    }

    const matchKeys = Object.keys(PAGES).filter(pageKey => RouterService.pathMatcher(pageKey));

    let PageView = NotFoundPage;

    if (matchKeys.length) {
        PageView = PAGES[matchKeys[0]];
    }

    const properties = Object.assign({}, props, { dataStore, setDataStore: updateDataStore });

    return <PageView {...properties} />;
}