import React, { useState } from "react";
import Button from "../components/Button";

export default (props) => {
    const [inputValue, setInputValue] = useState('');

    return <div className="searchbar-wrapper padding-md">
        <div className="searchbar">
            <form>
                <fieldset>
                    <div className="row">
                        <input type="text" className="searchbar-input" onChange={(e) => setInputValue(e.target.value)} placeholder="Enter pincode or city name" />
                        <Button label="Search" type="submit" buttonStyle="clear" onClick={(e) => props.onSearch(e, inputValue)} />
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
}