import { useState, forwardRef, useImperativeHandle } from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface CitySearchBarHandles {
  clear: () => void;
}

interface Props {
  onSearch: (city: string) => void;
}

const CitySearchBar = forwardRef<CitySearchBarHandles, Props>(
  ({ onSearch }, ref) => {
    const [input, setInput] = useState("");

    const handleSearch = () => {
      const trimmed = input.trim();
      if (trimmed) {
        onSearch(trimmed);
        setInput("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch();
    };

    useImperativeHandle(ref, () => ({
      clear: () => setInput(""),
    }));

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex items-center bg-white/90 border border-blue-800 rounded-2xl px-3 shadow-lg w-[260px] sm:w-[360px]"
      >
        <InputBase
          sx={{ flex: 1, paddingLeft: 2 }}
          placeholder="Search city..."
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
  }
);

export default CitySearchBar;
