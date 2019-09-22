import React from 'react';


export default (props) => {

    const clickHandler = (elemId) => {
        const elem = document.getElementById(elemId);
        if (elem) {
            elem.scrollIntoView({
                block: 'start',
                behaviour: 'smooth'
            });
        }
    }

    return (
        <div className="margin-sm padding-sm" onClick={() => clickHandler(props.jumpTo)}>
            <div className="cursor-pointer">
                {props.label}
            </div>
        </div>
    );

}