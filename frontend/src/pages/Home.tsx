import { useForecast, useCurrentWeather } from "../hooks/weather-hooks";
import CurrentWeatherCard from "../components/general/weather/currentWeatherCard";
import ForecastWeatherCard from "../components/general/weather/ForecastWeatherCard";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";

interface HomeProps {
  city: string;
}

const Home = ({ city }: HomeProps) => {
  const [isCelsius, setIsCelsius] = useState(false);

  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useCurrentWeather(city);

  const {
    forecast,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast(city, 10);

  const toastShownRef = useRef(false);

  useEffect(() => {
    const cityNotFound =
      weatherError === "City not found" || forecastError === "City not found";

    if (cityNotFound && !toastShownRef.current) {
      toast.error(`City/Zipcode: ${city} not found or invalid.`);
      toastShownRef.current = true;
    }

    if (!weatherError && !forecastError) {
      toastShownRef.current = false;
    }
  }, [weatherError, forecastError]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
      <div className="rounded-lg shadow-md bg-gradient-to-r from-sky-200 via-sky-200 to-sky-100 p-6 shadow-lg shadow-black/50">
        {weatherLoading || forecastLoading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress color="primary" />
          </div>
        ) : weather && forecast && forecast.forecast?.forecastday?.[0] ? (
          <>
            <div className="mb-10">
              <div className="relative mb-4">
                <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 text-center">
                  Weather Today in {weather.location.name},{" "}
                  {weather.location.region}
                </h2>

                <div className="hidden sm:flex items-center space-x-2 absolute right-0 top-1/2 -translate-y-1/2">
                  <span className="text-lg font-bold text-gray-700">
                    {isCelsius ? "°C" : "°F"}
                  </span>
                  <Switch
                    checked={isCelsius}
                    onChange={() => setIsCelsius((prev) => !prev)}
                  />
                </div>
              </div>

              <div className="text-left max-w-fit mx-auto mt-1">
                <p className="text-base sm:text-sm font-semibold text-gray-700 tracking-wide">
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

              <div className="flex sm:hidden justify-center items-center space-x-2 mt-4">
                <span className="text-base font-bold text-gray-700">
                  {isCelsius ? "°C" : "°F"}
                </span>
                <Switch
                  checked={isCelsius}
                  onChange={() => setIsCelsius((prev) => !prev)}
                  size="small"
                />
              </div>

              <CurrentWeatherCard
                current={weather.current}
                maxTempC={
                  isCelsius
                    ? forecast.forecast.forecastday[0].day.maxtemp_c
                    : forecast.forecast.forecastday[0].day.maxtemp_f
                }
                minTempC={
                  isCelsius
                    ? forecast.forecast.forecastday[0].day.mintemp_c
                    : forecast.forecast.forecastday[0].day.mintemp_f
                }
                isCelsius={isCelsius}
              />
            </div>

            <div className="my-8 border-t border-blue-800" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              8-Day Weather Forecast
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {forecast.forecast.forecastday.filter((day) => day.date > today).map((day) => (
                <ForecastWeatherCard
                  key={day.date}
                  date={day.date}
                  icon={day.day.condition.icon}
                  condition={day.day.condition.text}
                  maxTempC={isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f}
                  minTempC={isCelsius ? day.day.mintemp_c : day.day.mintemp_f}
                  isCelsius={isCelsius}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No results found
            </h2>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Please enter a valid city name or ZIP code.
            </p>
            <p className="text-sm text-gray-600 font-semibold">
              Try searching for{" "}
              <span className="font-semibold text-blue-700">
                "Simpsonville"
              </span>{" "}
              or a ZIP like{" "}
              <span className="font-semibold text-blue-700">"29681"</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
