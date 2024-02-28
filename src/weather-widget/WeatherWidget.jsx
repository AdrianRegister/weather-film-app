import { useRef } from 'react';
import WeatherCard from './weather-card/WeatherCard';
import { useEffect, useState } from 'react';
import Search from '../components/Search';

// get coordinates
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// get weather
// http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const url =
  'http://api.openweathermap.org/geo/1.0/direct?q=granollers&limit=1&appid=API_KEY_HERE';

let newUrl = '';

function WeatherWidget() {
  const [city, setCity] = useState('Granollers');
  const [country, setCountry] = useState('');
  const [currentTemp, setCurrentTemp] = useState(0);
  const [description, setCurrentDescription] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [icon, setIcon] = useState(null);
  const [isError, setIsError] = useState(false);

  const prettyCityName = useRef('');

  useEffect(() => {
    setIsError(false);
    fetch(newUrl || url)
      .then((response) =>
        response.json().then((data) => {
          const { country, lat, lon } = data[0];
          setCountry(country);
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=90a5204dab5e62f6ed32951995934e89`
          ).then((response) =>
            response.json().then((data) => {
              const { description, icon } = data.weather[0];
              const { temp, feels_like } = data.main;
              prettyCityName.current = data.name;
              console.log(data);
              setIcon(icon);
              setFeelsLike(feels_like.toFixed(1));
              setCurrentTemp(temp.toFixed(1));
              setCurrentDescription(
                description[0].toUpperCase() + description.slice(1)
              );
              setIsLoading(false);
            })
          );
        })
      )
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [city]);

  function handleSubmit(e) {
    e.preventDefault();
    newUrl = url.replace('q=granollers', `q=${searchCity}`);
    setCity(searchCity);
    setSearchCity('');
    setIsLoading(true);
  }

  return (
    <div className="bg-sky-200 w-52 h-fit *:p-1 mt-5 ml-5 rounded-lg grow-0">
      <h1 className="bg-sky-100 text-center text-lg font-semibold rounded-t-lg">
        Weather Widget
      </h1>
      <Search
        labelText={'Enter City Name:'}
        buttonText={'Search'}
        state={searchCity}
        SetState={setSearchCity}
        handleSubmit={handleSubmit}
        placeholder={'eg. London'}
      />
      {isLoading ? (
        'Getting weather data...'
      ) : (
        <WeatherCard
          city={prettyCityName.current}
          country={country}
          currentTemp={currentTemp}
          feelsLike={feelsLike}
          description={description}
          icon={icon}
        />
      )}
      {isError && <h4>There was an error retrieving data.</h4>}
    </div>
  );
}

export default WeatherWidget;
