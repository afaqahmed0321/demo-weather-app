import React, { useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import WeatherDetails from "./WeaherDetails";
import axios from "axios";
import { API_Key } from "../helper";
import Forecast from "./Forcast";

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            units: "metric",
            appid: API_Key,
          },
        }
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: city,
            units: "metric",
            appid: API_Key,
          },
        }
      );

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: latitude,
            lon: longitude,
            units: "metric",
            appid: API_Key,
          },
        }
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            lat: latitude,
            lon: longitude,
            units: "metric",
            appid: API_Key,
          },
        }
      );

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col ">
        <div className="bg-black bg-opacity-30 z-10 p-5 rounded-lg">
          <Header />
          <SearchBar fetchWeather={fetchWeather} fetchWeatherByLocation={fetchWeatherByLocation} />
          {loading ? <LoadingSpinner /> : (
            <div className=" justify-center">
              {(weatherData && <WeatherDetails data={weatherData} />)}
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        {loading ? <></> : (
          <div className="bg-black bg-opacity-30 z-10 p-5 rounded-lg lg:ms-3 ms-0 lg:mt-0 mt-3">
            {forecastData && <Forecast data={forecastData} />}
          </div>
        )}

      </div>
    </>
  );
};

export default WeatherContainer;
