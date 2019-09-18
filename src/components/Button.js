import React from 'react';


export default (props) => {

    const isButtonClear = props.buttonStyle === 'clear';

    const classNameList = [];

    if (isButtonClear) {
        classNameList.push('button-clear');
    }



    return <button type={props.type} className={classNameList.join(' ')} onClick={props.onClick}>{props.label}</button>
}