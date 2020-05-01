import React, { Component } from "react"
import {API} from "../Data"


export default class CurrentWeather extends Component {
    state = {
        data: {},
        availableUnits: ['C', 'F', 'K'],
        isAvailableUnitsShown: false
    }

    getWeatherData = cityId => {
        fetch( API(cityId) )
            .then( response => response.json())
            .then( response => {
                let weatherData = {
                    dt: response.dt,
                    country: response.sys.country,
                    name: response.name,
                    icon: response.weather[0].icon,
                    description: response.weather[0].description,
                    temperature: response.main.temp,
                };

                this.setState({weatherData: weatherData})
            })
    }

    toggleAvailableUnitsVisib = () => {
        this.setState({isAvailableUnitsShown: !this.state.isAvailableUnitsShown});
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
        const {name} = this.state.data ? this.state.data : '';
        const {country} = this.state.data.sys ? this.state.data.sys : '';
        const {icon, description} = this.state.data.weather ? this.state.data.weather[0] : '';
        const {availableUnits} = this.state;
        const {unitType, onUnitChange} = this.props;

        let {temp} = this.state.data.main ? this.state.data.main : '';
        switch (unitType) {
            case 'C': temp -= 273.15; break;
            case 'F': temp = temp * 9/5 - 459.67; break;
            default: break;
        }
        temp = temp.toFixed(1);

        return (
            <div className={`content ${this.props.blured ? 'blured' : ''}`}>
                <h1 className="title">{name} | {country}</h1>
                <p className="description">{description}</p>
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description}/>
                <span className="temperature">{temp}</span>
                <ul className="temperature-units">
                    <li className="unit" onClick={this.toggleAvailableUnitsVisib}>
                        °{unitType}
                    </li>
                    {this.state.isAvailableUnitsShown
                        ? availableUnits.map(unit =>
                            unit !== unitType
                                ? <li className="unit" onClick={() => onUnitChange(unit)}>°{unit}</li>
                                : null)
                        : null
                    }
                </ul>
            </div>
        );
    }
}
