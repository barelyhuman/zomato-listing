import React from 'react';

import DataList from "../components/DataList";

import API from "../services/api.service";
import ObjectGet from "../services/object-get.service";

export default (props) => {

    const { location } = props.dataStore;

    const getRestaurantDetails = (catId) => {
        return API.searchRestaurants(location.lat, location.lng, catId)
            .then(data => formatRestaurantResults(data.restaurants));
    }




    const categoryFragments = props.categories.map(item => {
        return (
            <div id={'cat-' + item.jumpId} key={item.jumpId}>
                <div>
                    <h3>{item.label}</h3>
                </div>
                <DataList styleType="grid" resolve={() => getRestaurantDetails(item.jumpId)}>
                    {
                        (item) => (
                            <div className="hover-black cursor-pointer data-card margin-md" key={item.uniqueId}>
                                <span className="bold">{item.restaurantLabel}</span>
                                <br />
                                <span>{item.rating + '★'}</span>
                            </div>
                        )
                    }
                </DataList>
            </div>
        );
    })

    return <React.Fragment>
        {categoryFragments}
    </React.Fragment>
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