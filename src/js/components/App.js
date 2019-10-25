import React, { Component } from "react"
import Search from "./Search"
import {cityList} from '../Data';
import CurrentWeather from "./CurrentWeather"


export default class App extends Component {

    state = {
        defaultCityId: 703447,
        selectedCityId: null,
        foundCities: []
    }

    onSearchInput = ( {target} ) => {
        if (target.value === '' || target.value === ' ') {
            this.setState({foundCities: []});
        } else {
            let regex = new RegExp(`^${target.value}`, 'i');
            let relevantСities = cityList.filter(e => e.name.match(regex)).sort();
            let closestCities = relevantСities.slice(0, 6);
            this.setState({foundCities: closestCities});
        }
    }

    onListItemSelect = selectedCity => {
        this.setState({selectedCityId: selectedCity.id});
    }

    render() {
        const {selectedCityId, defaultCityId, foundCities} = this.state

        return (
            <div className="container backdrop-blur">
                <Search
                    select={this.onListItemSelect}
                    onSearchInput={this.onSearchInput}
                    foundCities={foundCities}
                />
                <CurrentWeather
                    cityId={selectedCityId || defaultCityId}
                    blured={foundCities.length > 0 ? true : false}
                />
            </div>
        );
    }
}
