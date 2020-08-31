import React, { useState} from 'react'
import apiKey from './apiKey'

const apiCreds = {
  key: apiKey.API_KEY,
  baseUrl: apiKey.URL,
}

function App() {
  const dateCreate = (elem) => {
    let date = String(elem);
    date = date.slice(3,15);
    return date
  }

const [location, setLocation] = useState('');
const [weather, setWeather] = useState({});
const find = (event) => {
  if (event.key === 'Enter') {
    fetch(`${apiCreds.baseUrl}weather?q=${location}&units=metric&APPID=${apiCreds.key}`)
    .then((res) => res.json())
    .then((result) => {
      setLocation('');
      setWeather(result);
      console.log(result); 
    }); 
  }
};

return ( 
  <div
  className={
    typeof weather.main != 'undefined'
    ? weather.main.temp > 21
    ? 'Theme hot'
    : 'Theme cold'
    : 'Theme'
  }  
  >

    <main> 
      <div className='find-container'>
        <input
        type='text'
        placeholder='Insert the city name...'
        className='find-bar'
        onChange={(event) => setLocation(event.target.value)}
        value={location}
        onKeyPress={find}    
        />
      </div>
      {typeof weather.main != 'undefined' ? (
        <div>
          <div className='place-container'>
            <div className='place'>
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date'> {dateCreate(new Date())}</div>        
          </div>
          <div className='weather-container'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°C
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
            <div className='weather'>Humidity - {weather.main.humidity}%</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  </div>
);
}

export default App;
