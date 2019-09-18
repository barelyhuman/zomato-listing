import React, { useState } from 'react';

import SearchBar from "../components/SearchBar";
import DataList from "../components/DataList";

import APIService from "../services/api.service";
import ObjectGet from "../services/object-get.service";
import HistoryService from "../services/history.service";
import Axios from 'axios';

export default (props) => {
    const [searchDataList, setSearchDataList] = useState([]);

    const searchHandler = (e, value) => {
        e.preventDefault();
        APIService.fetchLocationSuggestions(value)
            .then(data => {
                const results = data.suggestions;
                const formattedResults = formatAutoCompleteResult(results);
                setSearchDataList(formattedResults);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const setSelectedLocation = (event, item) => {
        APIService.fetchGeoLocationDetails(item.addressLabel)
            .then(data => {
                const results = data.Response.View[0].Result;
                const formattedResults = formatGeoCodingResults(results);
                const updatedDataStore = Object.assign({}, props.dataStore, { location: formattedResults[0] });
                props.setDataStore(updatedDataStore);
                HistoryService.push('/restaurants');
            });
    }

    return (
        <div className="container view-height-100">
            <div className="row position-absolute top-50 left-50 transform-reverse-50">
                <div className="column column-50 column-offset-25">
                    <SearchBar onSearch={searchHandler} />
                    <DataList list={searchDataList} template={
                        (item) => (
                            <div key={item.uniqueId} className="hover-black margin-sm padding-sm cursor-pointer" onClick={(e) => setSelectedLocation(e, item)}>
                                {item.addressLabel}
                            </div>
                        )
                    } />
                </div>
            </div>
        </div>
    );

}

function formatAutoCompleteResult(results) {
    const propsToReadFromDataList = [{
        label: 'addressLabel',
        path: 'label'
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
        item.uniqueId = index + item.addressLabel;
        return item;
    });

    return resultDataSet;
}

function formatGeoCodingResults(results) {
    const propsToReadFromDataList = [{
        label: 'addressLabel',
        path: 'Location.Address.Label'
    },
    {
        label: 'lat',
        path: 'Location.DisplayPosition.Latitude'
    },
    {
        label: 'lng',
        path: 'Location.DisplayPosition.Longitude'
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
        item.uniqueId = index + item.addressLabel;
        return item;
    });

    return resultDataSet;
}

