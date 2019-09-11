import React, { Component } from "react"
import Search from "./Search"
import CurrentWeather from "./CurrentWeather"


export default class App extends Component {

    state = {}

    render() {
        const {selectedCityId} = this.state

        return (
            <div className="container backdrop-blur">
                <Search selectCity={this.selectCity}/>
                <CurrentWeather cityId={selectedCityId || 703447}/>
            </div>
        );
    }
}
