import React, { Component } from 'react'
import {API} from '../../Data'
import {SingleDayWeather} from './SingleDayWeather'


export default class WeatherForecast extends Component {
    state = {
        dailyWeatherForecastData: {},
    }

    groupWeatherData = data => {
        return data.reduce((acc, period) => {
            let calcDate = new Date(period.dt*1000);
            let weekdayName = calcDate.toLocaleDateString('en', {weekday: 'long'});

            if (!acc[`${weekdayName}`]) {
                acc[`${weekdayName}`] = [];
            };
            acc[`${weekdayName}`].push(period);

            return acc;
        }, {})
    }

    getWeatherData = cityId => {
        fetch( API(cityId, 'forecast') )
            .then( response => response.json())
            .then( response => {
                let dailyWeatherForecastData = this.groupWeatherData(response.list);
                this.setState({dailyWeatherForecastData: dailyWeatherForecastData})
            })
            .catch(err => console.error(err))
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
        const {unitName} = this.props;
        const data = this.state.dailyWeatherForecastData;

        if (Object.keys(data).length === 0) return null;

        return (
            <ul className="weather-forecast">
                {Object.keys(data).map(day => 
                    <SingleDayWeather
                        key={day} day={day}
                        weatherData={data[day]}
                        unitName={unitName}
                        calcTemperature={this.props.calcTemperature}
                    />
                )}
            </ul>
        );
    }
}
