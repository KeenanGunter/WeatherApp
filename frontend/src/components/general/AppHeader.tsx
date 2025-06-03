import { useRef, useState } from "react";
import CitySearchBar, {
  type CitySearchBarHandles,
} from "./CitySearchBar";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { IconButton, Tooltip } from "@mui/material";
import favicon from "../../assets/favicon.svg";

interface AppHeaderProps {
  onCityChange: (city: string) => void;
}

const AppHeader = ({ onCityChange }: AppHeaderProps) => {
  const [locating, setLocating] = useState(false);
  const searchBarRef = useRef<CitySearchBarHandles>(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        searchBarRef.current?.clear();
        onCityChange(`${latitude},${longitude}`);
        setLocating(false);
      },
      () => {
        alert("Unable to retrieve your location.");
        setLocating(false);
      }
    );
  };

  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-blue-800/5 backdrop-blur-md z-50">
      <div className="max-w-[1200px] w-full mx-auto px-4 flex h-12 min-w-[300px] items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={favicon} alt="Weather Icon" className="w-8 h-10 sm:w-12 sm:h-12 min-w-[32px] min-h-[32px]" />
          <div className="text-black text-2xl font-semibold hidden sm:block">
            Keenan's Weather App
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <CitySearchBar ref={searchBarRef} onSearch={onCityChange} />
          <Tooltip title="Use My Location">
            <IconButton
              onClick={handleUseMyLocation}
              color="primary"
              sx={{ p: 1, "&:focus": { outline: "none" } }}
              disabled={locating}
            >
              <MyLocationIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="h-[2px] w-screen bg-gradient-to-r from-black via-blue-700 shadow-md" />
    </header>
  );
};

export default AppHeader;
