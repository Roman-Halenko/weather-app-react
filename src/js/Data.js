const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const appID = '&APPID=1d0043e9a6077c0e96a2cea071bf251b';

export function API(cityID) {
    return (apiURL + cityID + appID);
}

export const firebaseConfig = {
    apiKey: "AIzaSyAEpkcjRZPTl1kH97sTXc-nkLJ-mJ6DHn8",
    authDomain: "weather-app-f1e4e.firebaseapp.com",
    databaseURL: "https://weather-app-f1e4e.firebaseio.com",
    projectId: "weather-app-f1e4e",
    storageBucket: "weather-app-f1e4e.appspot.com",
    messagingSenderId: "1022251616365",
    appId: "1:1022251616365:web:e347162dfdc34d178e9764"
};
