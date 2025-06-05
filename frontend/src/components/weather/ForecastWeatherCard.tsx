interface Props {
  date: string;
  icon: string;
  condition: string;
  maxTempC: number;
  minTempC: number;
  isCelsius: boolean;
}

const ForecastWeatherCard = ({
  date,
  icon,
  condition,
  maxTempC,
  minTempC,
  isCelsius,
}: Props) => {
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const dayNum = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${dayName} ${dayNum}`;

  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-4 max-w-md w-full mx-auto h-full min-h-[100px] flex flex-col justify-between">
      <div className="flex items-start space-x-4">
        <img src={`https:${icon}`} alt={condition} className="w-12 h-12" />
        <div>
          <p className="text-base font-semibold text-gray-800">
            {formattedDate}
          </p>
          <p className="text-md text-gray-700 font-medium">{condition}</p>
        </div>
      </div>

      <div className="text-sm text-gray-700 gap-y-1 flex flex-col mt-2">
        <p>
          <span className="font-semibold">High:</span>{" "}
          {isCelsius ? `${maxTempC}°C` : `${maxTempC}°F`}
        </p>
        <p>
          <span className="font-semibold">Low:</span>{" "}
          {isCelsius ? `${minTempC}°C` : `${minTempC}°F`}
        </p>
      </div>
    </div>
  );
};

export default ForecastWeatherCard;
