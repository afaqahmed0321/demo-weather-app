import React from "react";

const Forecast = ({ data }) => {
  const getDailyForecast = () => {
    const grouped = {};

    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];

      if (!grouped[date]) grouped[date] = { morning: null, afternoon: null, evening: null };

      if (time === "06:00:00") grouped[date].morning = item;
      if (time === "12:00:00") grouped[date].afternoon = item;
      if (time === "18:00:00") grouped[date].evening = item;
    });

    return Object.entries(grouped).slice(0, 3); // Only return the first 3 days
  };

  const dailyForecast = getDailyForecast();

  return (
    <div className=" text-white">
      <h2 className="text-2xl font-bold mb-4">3-Day Forecast</h2>
      <div className="space-y-4 flex flex-col items-center">
        {dailyForecast.map(([date, times]) => (
          <div
            key={date}
            className="bg-white bg-opacity-20 p-4 rounded-lg w-80 text-center shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">{date}</h3>
            <div className="flex justify-between">
              {["morning", "afternoon", "evening"].map((time) => {
                const forecast = times[time];
                return (
                  <div key={time} className="text-center flex flex-col items-center">
                    {forecast ? (
                      <>
                        <p className="font-medium capitalize">{time}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                          alt={forecast.weather[0].description}
                          className="w-12 h-12"
                        />
                        <p>{forecast.main.temp.toFixed(1)}°C</p>
                      </>
                    ) : (
                      <p className="text-gray-400">{time} not available</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
