import React, {Component} from 'react';

import {cityList} from '../Data';
import {AutoComplete} from './AutoComplete';

export default class Search extends Component {

    state = {
        foundCities: []
    }

    handleChange = ( {target} ) => {
        if (target.value === '' || target.value === ' ') {
            this.setState({foundCities: []});
        } else {
            let regex = new RegExp(`^${target.value}`, 'i');
            let relevantСities = cityList.filter(e => e.name.match(regex)).sort();
            let closestCities = relevantСities.slice(0, 6);
            this.setState({foundCities: closestCities});
        }
    }

    render() {
        const {foundCities} = this.state

        return (
            <div className='search-bar'>
                <input className='search-field' type='search' onChange={this.handleChange}/>
                {foundCities.length > 0 ? <AutoComplete foundCities={foundCities}/> : ''}
            </div>
        )
    }
}
