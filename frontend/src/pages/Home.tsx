//import React from "react";
import { useWeather } from "../hooks/useWeather";

const Home = () => {
  const {  loading, error } = useWeather("Simpsonville");

  return (
    <div className="p-8 flex justify-center">
      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}
      TESTING WEATHERAPP DEPLOYMENT WORKING?
    </div>
  );

  return <div>Home</div>;
};

export default Home;
