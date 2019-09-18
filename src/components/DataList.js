import React from 'react';
import "../styles/DataList.css";

export default (props) => {

    const classNameList = [];

    classNameList.push('data-list-wrapper');

    const template = props.list.map(listItem => {
        return props.template(listItem);
    });

    if (props.styleType === 'grid') {
        classNameList.push('grid');
    }

    return (
        <div className={classNameList.join(' ')}>
            {template}
        </div>
    );

};