const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const appID = '&APPID=1d0043e9a6077c0e96a2cea071bf251b';

export function API(cityId) {
    return (apiURL + cityId + appID);
}

export const cityList = require('./city.list.json');
