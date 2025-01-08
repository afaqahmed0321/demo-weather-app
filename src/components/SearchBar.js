import React, { useEffect, useState } from "react";

const SearchBar = ({ fetchWeather, fetchWeatherByLocation }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    fetchWeather(city);
    setCity("");
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        alert("Unable to retrieve your location. Please allow location access.");
      }
    );
  };

  useEffect(() => {
    handleUseMyLocation();
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4 mt-4 w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 text-white placeholder-gray-300 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 w-full"
      />
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-2">
        <button
          onClick={handleSearch}
          className="bg-skyBlue hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium w-full "
        >
          Search
        </button>
        <button
          onClick={handleUseMyLocation}
          className="bg-skyBlue hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium lg:mt-0 mt-4 w-full"
        >
          Use My Location
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
