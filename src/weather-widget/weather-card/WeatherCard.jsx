import { useState } from 'react';
import '../../index.css';

const WeatherCard = ({
  city,
  country,
  currentTemp,
  feelsLike,
  description,
  icon,
}) => {
  const [tempUnits, setTempUnits] = useState('°C');

  return (
    <div className="bg-sky-300 rounded-b-lg shadow-lg mt-2">
      <h2>
        Weather in {city}, {country}
      </h2>

      {tempUnits === '°C' ? (
        <div className="text-sm">
          <h4>
            Current temperature: {currentTemp}
            {tempUnits}
          </h4>
          <h4>
            Feels like: {feelsLike}
            {tempUnits}
          </h4>
          <button
            className="bg-sky-600 rounded-md text-white p-1 hover:bg-sky-800 active:bg-sky-950 mt-2 text-xs"
            onClick={() => setTempUnits('°F')}
          >
            Show in °F
          </button>
        </div>
      ) : (
        <div className="text-sm">
          <h4>
            Current temperature: {(currentTemp * 1.8 + 32).toFixed(1)}
            {tempUnits}
          </h4>
          <h4>
            Feels like: {(feelsLike * 1.8 + 32).toFixed(1)}
            {tempUnits}
          </h4>
          <button
            className="bg-sky-600 rounded-md text-white p-1 hover:bg-sky-800 active:bg-sky-950 mt-2 text-xs"
            onClick={() => setTempUnits('°C')}
          >
            Show in °C
          </button>
        </div>
      )}

      <div className="flex flex-col mt-4">
        <h4 className="text-center">{description}</h4>
        <img
          className="w-32 mx-auto"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
