import CitySearchBar from "./CitySearchBar";

interface AppHeaderProps {
  onCityChange: (city: string) => void;
}

const AppHeader = ({ onCityChange }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-blue-800/5 backdrop-blur-md z-50">
      <div className="max-w-[1200px] w-full mx-auto px-4 flex h-12 min-w-[300px] items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="mr-3 text-black text-2xl font-semibold">
            Keenan's Weather App
          </div>
        </div>
        <CitySearchBar onSearch={onCityChange} />
      </div>
      <div className="h-[2px] w-screen bg-gradient-to-r from-black via-blue-700 shadow-md" />
    </header>
  );
};

export default AppHeader;
