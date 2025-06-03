import { useEffect, useState } from "react";
import type { CurrentWeatherApiResponse } from "../types/currentweather";
import type { ForecastApiResponse } from "../types/forecast";

export const useCurrentWeather = (city: string) => {
  const [weather, setWeather] = useState<CurrentWeatherApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL || "/api";

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/weather?city=${encodeURIComponent(city)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error?.code === 1006) {
          setError("City not found");
        } else {
          setWeather(data);  // ✅ only update if data is valid
          setError("");
        }
      })
      .catch(() => setError("Failed to fetch weather"))
      .finally(() => setLoading(false));
  }, [city]);

  return { weather, error, loading };
};


export const useForecast = (city: string, days = 8) => {
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL || "/api";

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/forecast?city=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=yes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error?.code === 1006) {
          setError("City not found");
        } else {
          setForecast(data);  // ✅ only update if data is valid
          setError("");
        }
      })
      .catch(() => setError("Failed to fetch forecast"))
      .finally(() => setLoading(false));
  }, [city, days]);

  return { forecast, error, loading };
};
