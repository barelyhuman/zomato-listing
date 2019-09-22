import React, { useState, useEffect } from 'react';

import Loader from "../components/Loader";

import "../styles/DataList.css";


export default (props) => {

    const [listItems, setListItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const classNameList = [];

    classNameList.push('data-list-wrapper');

    if (props.styleType === 'grid') {
        classNameList.push('grid');
    }

    if (props.resolve) {
        useEffect(() => {
            props.resolve().then(data => {
                setLoading(() => false);
                setListItems(() => data);
            });
        }, [props.resolve]);
    }


    let template = null;

    if (loading) {
        template = <Loader />
    } else if (!loading && !listItems.length) {
        "No Data"
    } else {
        template = listItems.map(item => {
            return props.children(item);
        });
    }

    return (
        <div className={classNameList.join(' ')}>
            {
                template
            }
        </div>
    );

};