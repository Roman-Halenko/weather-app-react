import React, { Component } from "react"
import {API} from "../Data"


export default class CurrentWeather extends Component {
    state = {
        data: {}
    }

    getWeatherData = (id) => {
        fetch( API(id) )
            .then(response => response.json())
            .then(response => this.setState({ data: response }))
    }

    componentDidMount() {
        this.getWeatherData(this.props.cityId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cityId !== prevProps.cityId) {
            this.getWeatherData(this.props.cityId);
        }
    }

    render() {
        const {name} = this.state.data;
        const {country} = this.state.data.sys ? this.state.data.sys : '';
        const {icon} = this.state.data.weather ? this.state.data.weather[0] : '';
        return (
            <div className={`content ${this.props.blured ? 'blured' : ''}`}>
                <h1 className="title">{name+' ('+country+')'}</h1>
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="not yet"/>
            </div>
        );
    }
}
