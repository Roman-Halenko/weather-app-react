import React from 'react';

export function ListItem(props) {

    const {id, name, country} = props.city;

    function selectCity() {
        console.log(id);
    }

    return (
        <li onClick={selectCity}>{name}, {country}</li>
    )
}
