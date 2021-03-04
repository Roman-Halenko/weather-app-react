import React from 'react';
// import AutoComplete from './AutoComplete';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Search(props) {

    const {select, foundCities, onSearchInput, onSearcFocus, onSearcBlur} = props;

    return (
        <div className='search-bar' onFocus={onSearcFocus} onBlur={onSearcBlur}>
            <Autocomplete
                id="combo-box-demo"
                options={foundCities}
                getOptionLabel={ option => `${option.name}, ${option.country}` }
                onChange={ (e, val) => select(val) }
                blurOnSelect={true}
                renderInput={ params => <TextField {...params} label="Search" variant="outlined" onChange={(e) => onSearchInput(e)} />}
            />
        </div>
    )
}
