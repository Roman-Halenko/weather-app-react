import React, {Component} from 'react';

import {ListItem} from './ListItem';

export class AutoComplete extends Component {

    state = {};

    render() {
        const {foundCities} = this.props;

        return (
            <ul className="hint-list">
                {foundCities.map(city => <ListItem key={city.id} city={city}/>)}
            </ul>
        )
    }
}
