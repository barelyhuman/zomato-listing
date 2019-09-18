import React, { useEffect, useState } from 'react';

import DataList from "../components/DataList";
import Button from "../components/Button";
import Loader from "../components/Loader";

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

    return (
        <div className="container">
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
                <div className="column ">
                    {
                        loading
                            ? <Loader size="30px" />
                            : <DataList styleType="grid" list={restaurantsList} template={
                                (item) => (
                                    <div className="hover-black cursor-pointer data-card margin-md" key={item.uniqueId}>
                                        <span className="bold">{item.restaurantLabel}</span>
                                        <br />
                                        <span>{item.rating + '★'}</span>
                                    </div>
                                )
                            } />
                    }
                </div>
            </div>
        </div >
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
        item.uniqueId = index + item.restaurantLabel;
        return item;
    })

    return resultDataSet;
}