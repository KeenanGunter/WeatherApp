import { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  onSearch: (city: string) => void;
}

const CitySearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const trimmed = input.trim();
    const query = trimmed || "Simpsonville";
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex items-center bg-white/90 border border-blue-800 rounded-2xl px-3 shadow-lg w-[300px] sm:w-[360px]"
    >
      <InputBase
        sx={{ flex: 1, paddingLeft: 2 }}
        placeholder="Search city or zipcode..."
        inputProps={{ "aria-label": "search city" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type="button"
        onClick={handleSearch}
        sx={{
          p: 1,
          "&:focus": { outline: "none", boxShadow: "none" },
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default CitySearchBar;
