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

    if (props.resolve && !props.list) {
        useEffect(() => {
            setLoading(true);
            props.resolve().then(data => {
                setLoading(() => false);
                setListItems(() => data);
            });
        }, []);
    } else if (props.list && !props.resolve) {
        setListItems(props.list);
    }

    let template = "No Restaurants";

    if (loading) {
        template = <Loader />
    } else if (listItems.length) {
        template = listItems.map(listItem => {
            return props.children(listItem);
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