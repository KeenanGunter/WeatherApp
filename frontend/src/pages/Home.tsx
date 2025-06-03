import { useForecast, useCurrentWeather } from "../hooks/weather-hooks";
import CurrentWeatherCard from "../components/general/weather/currentWeatherCard";
import ForecastWeatherCard from "../components/general/weather/ForecastWeatherCard";

interface HomeProps {
  city: string;
}

const Home = ({ city }: HomeProps) => {
  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useCurrentWeather(city);
  const {
    forecast,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast(city, 8);

  if (weatherLoading || forecastLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (weatherError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching weather: {weatherError}
      </p>
    );
  if (forecastError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching forecast: {forecastError}
      </p>
    );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
      <div className="rounded-lg shadow-md bg-gradient-to-r from-sky-200 via-sky-200 to-sky-100 p-6 shadow-lg shadow-black/50">
        {weather && forecast && forecast.forecast?.forecastday?.[0] && (
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
              Weather Today in {weather.location.name},{" "}
              {weather.location.region}
            </h2>
            <div className="text-left max-w-fit mx-auto mt-1">
              <p className="text-base sm:text-lg font-semibold text-gray-700 tracking-wide">
                As of{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "America/New_York",
                })}{" "}
                EDT
              </p>
            </div>

            <CurrentWeatherCard
              current={weather.current}
              maxTempC={forecast.forecast.forecastday[0].day.maxtemp_f}
              minTempC={forecast.forecast.forecastday[0].day.mintemp_f}
            />
          </div>
        )}

        <div className="my-8 border-t border-blue-800" />

        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          8-Day Weather Forecast
        </h3>

        {forecast?.forecast?.forecastday && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecast.forecast.forecastday.map((day) => (
              <ForecastWeatherCard
                key={day.date}
                date={day.date}
                icon={day.day.condition.icon}
                condition={day.day.condition.text}
                maxTempC={day.day.maxtemp_f}
                minTempC={day.day.mintemp_f}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
