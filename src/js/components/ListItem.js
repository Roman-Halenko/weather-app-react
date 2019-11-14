import React from 'react';

function ListItem({city, select}) {

    const {html} = city;

    return (
        <li onClick={() => select(city)} dangerouslySetInnerHTML={{__html: html}}></li>
    )
}

export default ListItem;
