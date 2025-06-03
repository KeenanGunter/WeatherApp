import { useForecast, useCurrentWeather } from "../hooks/weather-hooks";

const Home = () => {
  const { weather, loading: weatherLoading, error: weatherError } = useCurrentWeather("Simpsonville");
  const { forecast, loading: forecastLoading, error: forecastError } = useForecast("Simpsonville", 8);

  if (weatherLoading || forecastLoading) return <p className="text-center mt-10">Loading...</p>;
  if (weatherError) return <p className="text-center text-red-500 mt-10">Error fetching weather: {weatherError}</p>;
  if (forecastError) return <p className="text-center text-red-500 mt-10">Error fetching forecast: {forecastError}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {weather && (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            {weather.location.name}, {weather.location.country}
          </h2>
          <p className="text-lg">{weather.current.condition.text}</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt="Current Weather Icon"
            className="mx-auto"
          />
          <p className="text-xl mt-2">
            {weather.current.temp_c}°C / {weather.current.temp_f}°F
          </p>
        </div>
      )}

      {forecast?.forecast?.forecastday && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forecast.forecast.forecastday.map((day) => (
            <div key={day.date} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
              <p className="font-semibold">{day.date}</p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="mx-auto"
              />
              <p>{day.day.condition.text}</p>
              <p>☀️ Max: {day.day.maxtemp_c}°C</p>
              <p>🌙 Min: {day.day.mintemp_c}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
