import React from 'react';
import {weatherIcon} from '../../../Data';

const SingleDayWeather = ({day, weatherData, unitName, calcTemperature}) => {

    function getTempRange() {

        return weatherData.reduce( (acc, period) => {

            const {temp_min, temp_max} = period.main;

            acc.min = temp_min < acc.min ? temp_min : acc.min;
            acc.max = temp_max > acc.max ? temp_max : acc.max;

            return acc;

        }, {min: Infinity, max: -Infinity});
    }

    const weatherIconCode = weatherData.reduce( (acc, value) => {

        const icon = value.weather[0].icon.replace(/[a-z]/g, '');

        acc[icon] = acc.hasOwnProperty(icon) ? acc[icon] + 1 : 1;

        return acc;
    }, {});

    const wic = Object.keys(weatherIconCode).reduce((a, b) =>
        weatherIconCode[a] > weatherIconCode[b] ? a : b);

    const weatherIconUrl = weatherIcon(`${wic}d`);
    const weatherDecription = weatherData[0].weather[0].description;
    const tempRange = getTempRange();

    return (
        <li key={weatherData[0].dt}>
            <div>{day}</div>
            <img className="weather-icon"
                src={weatherIconUrl}
                alt={weatherDecription}
            />
            <div>{calcTemperature(tempRange.max, unitName)}°
                <span className="min-temp"> {calcTemperature(tempRange.min, unitName)}°</span>
            </div>
        </li>
    )
}

export default SingleDayWeather;