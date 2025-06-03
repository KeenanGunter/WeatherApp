import { useEffect, useState } from "react";
import type { CurrentWeatherApiResponse } from "../types/currentweather";
import type { ForecastApiResponse } from "../types/forecast";

export const useCurrentWeather = (city: string) => {
  const [weather, setWeather] = useState<CurrentWeatherApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${baseUrl}/weather?city=${encodeURIComponent(city)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return { weather, error, loading };
};

export const useForecast = (city: string, days = 8) => {
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${baseUrl}/forecast?city=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=yes`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setForecast(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city, days]);

  return { forecast, error, loading };
};