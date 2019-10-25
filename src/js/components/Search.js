import React, {Component} from 'react';
import AutoComplete from './AutoComplete';

export default class Search extends Component {

    render() {
        const {foundCities, onSearchInput} = this.props;

        return (
            <div className='search-bar'>
                <input
                    className='search-field'
                    type='search'
                    onChange={onSearchInput}
                />
                {foundCities.length > 0
                    ? <AutoComplete select={this.props.select} foundCities={foundCities}/>
                    : ''}
            </div>
        )
    }
}
