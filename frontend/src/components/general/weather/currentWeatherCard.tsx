import type { WeatherCurrent } from "../../../types/currentweather";

interface Props {
  current: WeatherCurrent;
  maxTempC: number;
  minTempC: number;
  isCelsius: boolean;
}

const CurrentWeatherCard = ({
  current,
  maxTempC,
  minTempC,
  isCelsius,
}: Props) => {
  return (
    <div className="mt-4 bg-white rounded-lg shadow-md px-6 py-4 max-w-md mx-auto">
      <div className="flex items-start space-x-4">
        <img
          src={`https:${current.condition.icon}`}
          alt="Current Weather Icon"
          className="w-16 h-16"
        />
        <div>
          <p className="text-xl text-gray-800 font-semibold">
            {isCelsius ? `${current.temp_c}°C` : `${current.temp_f}°F`}
          </p>
          <p className="text-lg text-gray-700 font-medium">
            {current.condition.text}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Feels Like:</span>{" "}
          {isCelsius ? `${current.feelslike_c}°C` : `${current.feelslike_f}°F`}
        </p>
        <p>
          <span className="font-semibold">High/Low:</span>{" "}
          {isCelsius
            ? `${maxTempC}°C / ${minTempC}°C`
            : `${maxTempC}°F / ${minTempC}°F`}
        </p>
        <p>
          <span className="font-semibold">Humidity:</span> {current.humidity}%
        </p>
        <p>
          <span className="font-semibold">Wind:</span> {current.wind_kph} km/h (
          {current.wind_dir})
        </p>
        <p>
          <span className="font-semibold">UV Index:</span> {current.uv}
        </p>
        <p>
          <span className="font-semibold">Visibility:</span> {current.vis_km} km
        </p>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
