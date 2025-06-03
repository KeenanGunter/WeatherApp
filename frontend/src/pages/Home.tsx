//import React from "react";
import { useWeather } from "../hooks/useWeather";

const Home = () => {
  const { weather, loading, error } = useWeather("Simpsonville");

  return (
    <div className="p-8 flex justify-center">
      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {weather.location.name}, {weather.location.country}
          </h2>
          <p className="text-lg">{weather.current.condition.text}</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-xl">
            {weather.current.temp_c}°C / {weather.current.temp_f}°F
          </p>
        </div>
      )}
    </div>
  );

  return <div>Home</div>;
};

export default Home;
