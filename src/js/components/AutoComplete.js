import React, {Component} from 'react';

import ListItem from './ListItem';

class AutoComplete extends Component {

    state = {};

    render() {
        const {foundCities} = this.props;

        return (
            <ul className="hint-list">
                {foundCities.map(city => (
                    <ListItem
                        select={this.props.select}
                        key={city.id}
                        city={city}
                    />
                ))}
            </ul>
        )
    }
}

export default AutoComplete;
