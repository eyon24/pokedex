import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/search.css";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/${search.toLowerCase()}`);
  };

  const navigate = useNavigate();

  return (
    <div>
      <form className="search" onSubmit={handleSearch}>
        <div>
          <input
            className="search-input"
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
