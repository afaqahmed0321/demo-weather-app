import React, { useState } from "react";

const WeatherDetails = ({ data }) => {
  const { name, main, weather } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const [isCelsius, setIsCelsius] = useState(true);
  const temperature = isCelsius
    ? main.temp
    : (main.temp * 9) / 5 + 32;

  const feelsLikeTemp = isCelsius
    ? main.feels_like
    : (main.feels_like * 9) / 5 + 32;

  return (
    <div className="mt-6 text-white p-5 rounded-lg">
      <h2 className="text-2xl font-bold">{name}</h2>
      <div className="flex items-center mt-4 bg-white text-black rounded-lg p-4 shadow-lg">
        <img
          src={iconUrl}
          alt={weather[0].description}
          className="w-16 h-16 mr-4"
        />
        <div>
          <p className="text-3xl font-bold">
            {temperature.toFixed(1)}°{isCelsius ? "C" : "F"}
          </p>
          <p className="capitalize">{weather[0].description}</p>
        </div>
      </div>

      <div className="mt-4 bg-white text-black rounded-lg p-4 shadow-lg">
        <p>
          <span className="font-medium">Feels like:</span>{" "}
          {feelsLikeTemp.toFixed(1)}°{isCelsius ? "C" : "F"}
        </p>
        <p>
          <span className="font-medium">Humidity:</span> {main.humidity}%
        </p>
        <p>
          <span className="font-medium">Pressure:</span> {main.pressure} hPa
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsCelsius(!isCelsius)}
          className="hover:text-skyBlue px-4 py-2 rounded-lg text-white font-medium"
        >
          Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
    </div>
  );
};

export default WeatherDetails;
