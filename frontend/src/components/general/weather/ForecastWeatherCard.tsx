interface Props {
  date: string;
  icon: string;
  condition: string;
  maxTempC: number;
  minTempC: number;
}

const ForecastWeatherCard = ({ date, icon, condition, maxTempC, minTempC }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-4 max-w-md w-full mx-auto h-full min-h-[100px] flex flex-col justify-between">
      <div className="flex items-start space-x-4">
        <img
          src={`https:${icon}`}
          alt={condition}
          className="w-12 h-12"
        />
        <div>
          <p className="text-base font-semibold text-gray-800">{date}</p>
          <p className="text-sm text-gray-700">{condition}</p>
        </div>
      </div>

      <div className="text-sm text-gray-700 gap-y-1 flex flex-col mt-2">
        <p>
          <span className="font-semibold">High:</span> {maxTempC}°C
        </p>
        <p>
          <span className="font-semibold">Low:</span> {minTempC}°C
        </p>
      </div>
    </div>
  );
};

export default ForecastWeatherCard;
