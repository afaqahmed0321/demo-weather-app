import React from "react";
import WeatherContainer from "./components/WeatherContainer";
import "./App.css";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-[url(./images/sunny-day.jpg)] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-0"></div>
      <WeatherContainer />
    </div>
  );
}

export default App;
