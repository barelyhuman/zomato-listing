import React from 'react';
import MenuItem from "./MenuItem";

import "../styles/menu.css";

export default (props) => {

    const list = props.items.map(item => {
        return <MenuItem key={item.jumpId} jumpTo={'cat-' + item.jumpId} label={item.label} />
    });


    return <div className="menu-wrapper">
        <div>
            <h3 className="bold">
                Categories
            </h3>
        </div>
        <div className="menu-items">
            {list}
        </div>
    </div>

}