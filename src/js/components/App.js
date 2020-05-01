import React, { Component } from "react"
import Search from "./Search"
import {firebaseConfig} from '../Data';
import CurrentWeather from "./CurrentWeather"
import {WeatherForecast} from "./WeatherForecast"
import firebase from 'firebase/app';
import 'firebase/database';


export default class App extends Component {

    state = {
        defaultCityId: 703447,
        selectedCityId: null,
        foundCities: [],
        searchFocused: false,
        temperatureUnit: 'C'
    }

    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = this.firebaseApp.database();

    onSearchInput = ( {target} ) => {
        let userInput = target.value.replace(/[^\w\s]/gi, '');
        if (userInput === '' || userInput === ' ') {
            this.setState({foundCities: []});
        } else {
            let regex = new RegExp(userInput, 'i');
            this.database.ref('/').orderByChild('name')
                .startAt(userInput)
                .limitToFirst(6)
                .once('value', snap => {
                    let relevantСities = Object.values(snap.val())
                        .filter(e => e.name.match(regex));

                    relevantСities.forEach(e => {
                        e.html = e.name.replace(regex, match =>
                            `<u>${match}</u>`) + `, ${e.country}`;
                        });

                    this.setState({foundCities: relevantСities});
                });
        }
    }

    onListItemSelect = selectedCity => {
        this.setState({selectedCityId: selectedCity.id});
    }

    onSearcFocus = () => {
        this.setState({searchFocused: true});
    }

    onSearcBlur = () => {
        setTimeout(() => {
            this.setState({searchFocused: false})
        }, 100)
    }

    changeTemperatureUnit = unit => {
        this.setState({temperatureUnit: unit})
    }

    calcTemperature = (value, unitName) => {

        switch (unitName) {
            case 'C': value -= 273.15; break;
            case 'F': value = value * 9/5 - 459.67; break;
            default: break;
        }

        return Math.round(value);
    }

    render() {
        const { selectedCityId,
            defaultCityId,
            foundCities,
            searchFocused,
            temperatureUnit } = this.state

        return (
            <div className="container backdrop-blur">
                <Search
                    select={this.onListItemSelect}
                    onSearchInput={this.onSearchInput}
                    onSearcFocus={this.onSearcFocus}
                    onSearcBlur={this.onSearcBlur}
                    foundCities={foundCities}
                    searchFocused={searchFocused}
                />
                <CurrentWeather
                    cityId={selectedCityId || defaultCityId}
                    blured={foundCities.length > 0 && searchFocused ? true : false}
                    unitName={temperatureUnit}
                    onUnitChange={this.changeTemperatureUnit}
                    calcTemperature={this.calcTemperature}
                />
                <WeatherForecast
                    cityId={selectedCityId || defaultCityId}
                    unitName={temperatureUnit}
                    calcTemperature={this.calcTemperature}
                />
            </div>
        );
    }
}
