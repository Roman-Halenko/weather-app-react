import React from 'react';

const SingleDayWeather = ({day, weatherData, unitName, calcTemperature}) => {

    function getTemp(minmax) {
        return weatherData.reduce((acc, period) => {
            if (acc === undefined) {
                if (minmax === 'min') {
                    acc = period.main.temp_min;
                } else if (minmax === 'max') {
                    acc = period.main.temp_max;
                }
            } else {
                if (minmax === 'min') {
                    acc = period.main.temp_min < acc ? period.main.temp_min : acc;
                } else if (minmax === 'max') {
                    acc = period.main.temp_max > acc ? period.main.temp_max : acc;
                }
            }
            return acc;
        }, undefined);
    }

    const weatherIconCode = weatherData[0].weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
    const weatherDecription = weatherData[0].weather[0].description;
    const tempMin = calcTemperature( getTemp('min'), unitName );
    const tempMax = calcTemperature( getTemp('max'), unitName );

    return (
        <li key={weatherData[0].dt}>
            <div>{day}</div>
            <img className="weather-icon"
                src={weatherIconUrl}
                alt={weatherDecription}
            />
            <div>{tempMax}°
                <span className="min-temp"> {tempMin}°</span>
            </div>
            
        </li>
    )
}

export default SingleDayWeather;