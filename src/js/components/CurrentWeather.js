import React, { Component } from "react"
import {API} from "../Data"


export default class CurrentWeather extends Component {
    state = {
        data: {}
    }

    componentDidMount() {

        fetch( API(this.props.cityId) )
            .then(response => response.json())
            .then(response => this.setState({ data: response }))
    }

    render() {
        const {name} = this.state.data;
        const {country} = this.state.data.sys ? this.state.data.sys : '';
        const {icon} = this.state.data.weather ? this.state.data.weather[0] : '';
        return (
            <div className="content">
                <h1 className="title">{name+' ('+country+')'}</h1>
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="not yet"/>
            </div>
        );
    }
}
