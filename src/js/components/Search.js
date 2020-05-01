import React, {Component} from 'react';
import AutoComplete from './AutoComplete';

export default class Search extends Component {

    render() {
        const {foundCities, onSearchInput, onSearcFocus, onSearcBlur, searchFocused} = this.props;

        return (
            <div className='search-bar' onFocus={onSearcFocus} onBlur={onSearcBlur}>
                <input
                    placeholder='Search'
                    className='search-field'
                    type='search'
                    onChange={onSearchInput}
                />
                {foundCities.length && searchFocused
                    ? <AutoComplete select={this.props.select} foundCities={foundCities}/>
                    : null}
            </div>
        )
    }
}
