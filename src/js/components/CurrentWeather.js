import React, { Component } from "react"
import {API, weatherIcon} from "../Data"


export default class CurrentWeather extends Component {
    state = {
        weatherData: {},
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
                    id: response.weather[0].id,
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
        if (Object.keys(this.state.weatherData).length === 0) return null;

        const {dt, icon, description, country, name, temperature} = this.state.weatherData;
        const {availableUnits} = this.state;
        const {unitName, onUnitChange, blured} = this.props;
        const dataCalcDate = new Date(dt*1000);
        const dataCalcDay = dataCalcDate.toLocaleDateString('en', {weekday: 'long'});
        const dataCalcTime = {
            hours: `${dataCalcDate.getHours()}`.padStart(2, '0'),
            minutes: `${dataCalcDate.getMinutes()}`.padStart(2, '0')
        }

        const temp = this.props.calcTemperature(temperature, unitName);

        return (
            <div className={`content ${blured ? 'blured' : ''}`}>
                <h1 className="title">{name}, {country}</h1>
                <span>{dataCalcDay} {dataCalcTime.hours}:{dataCalcTime.minutes}</span>
                <p className="description">{description}</p>
                <img className="weather-icon" src={weatherIcon(icon)} alt={description}/>
                <div className="temperature">{temp}
                    <ul className="temperature-units">
                        <li className="unit" onClick={this.toggleAvailableUnitsVisib}>
                            °{unitName}
                        </li>
                        {this.state.isAvailableUnitsShown
                            ? availableUnits.map(unit =>
                                unit !== unitName
                                    ? <li className="unit" key={unit} onClick={() => onUnitChange(unit)}>{unit}</li>
                                    : null)
                            : null
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
