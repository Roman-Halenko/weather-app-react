import React from 'react';

function ListItem({city, select}) {

    const {name, country} = city;

    return (
        <li onClick={() => select(city)}>{name}, {country}</li>
    )
}

export default ListItem;
