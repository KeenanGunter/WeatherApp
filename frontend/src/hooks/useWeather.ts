import { useEffect, useState } from "react";
import type { GetCurrentWeatherResponse } from "../types/currentweather";

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<GetCurrentWeatherResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const parsed: GetCurrentWeatherResponse = JSON.parse(data.body);
        setWeather(parsed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return { weather, error, loading };
};
