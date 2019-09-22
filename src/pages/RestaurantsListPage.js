import React, { useEffect, useState } from 'react';

import DataList from "../components/DataList";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Menu from "../components/Menu";
import CategoriesSection from "../components/CategoriesSection";

import APIService from "../services/api.service";
import ObjectGet from "../services/object-get.service";
import HistoryService from "../services/history.service";

export default (props) => {

    const [restaurantsList, setRestaurantsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const { location } = props.dataStore;

        if (location && location.lat && location.lng) {

            setLoading(() => true);

            APIService.searchRestaurants(props.dataStore.location.lat, props.dataStore.location.lng)
                .then(data => {
                    setRestaurantsList(formatRestaurantResults(data.restaurants));
                    setLoading(() => false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [])

    const goToSearch = (e) => {
        e.preventDefault();
        return HistoryService.push('/');
    }

    const currentLocation = ((props.dataStore || {}).location || {}).addressLabel || '';

    const formattedCategories = formatCategories(props.categories);

    return (
        <div className="container">
            <div>
                <div className="row margin-md">
                    <div className="column column-50 column-offset-25">
                        <div className="row">
                            <div className="column">
                                <p>Current Location: {currentLocation}</p>
                            </div>
                            <div className="column">
                                <a href="#" onClick={goToSearch}>Set Location</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row padding-lg">
                    <div className="column column-25">
                        <Menu items={formattedCategories} />
                    </div>
                    <div className="column ">
                        {
                            loading
                                ? <Loader size="30px" />
                                // : <DataList styleType="grid" list={restaurantsList}>
                                //     {
                                //         (item) => (
                                //             <div className="hover-black cursor-pointer data-card margin-md" id={item.uniqueId} key={item.uniqueId}>
                                //                 <span className="bold">{item.restaurantLabel}</span>
                                //                 <br />
                                //                 <span>{item.rating + '★'}</span>
                                //             </div>
                                //         )
                                //     }
                                // </DataList>
                                : <CategoriesSection dataStore={props.dataStore} categories={formattedCategories} />
                        }
                    </div>
                </div>
            </div >
        </div>
    )
}

function formatRestaurantResults(results) {
    const propsToReadFromDataList = [{
        label: 'restaurantLabel',
        path: 'restaurant.name'
    },
    {
        label: 'rating',
        path: 'restaurant.user_rating.aggregate_rating'
    }
    ];

    let resultDataSet = results.map((resultItem) => {
        const formattedProps = {};
        propsToReadFromDataList.forEach(item => {
            formattedProps[item.label] = ObjectGet(resultItem, item.path);
        });
        return formattedProps;
    });

    resultDataSet = resultDataSet.map((item, index) => {
        item.uniqueId = index
        // + item.restaurantLabel;
        return item;
    })

    return resultDataSet;
}

function formatCategories(categoriesList) {
    return categoriesList.map(catitem => ({
        jumpId: catitem.categories.id,
        label: catitem.categories.name
    }));
}