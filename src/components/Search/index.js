import PropTypes from "prop-types";
function Search({ valueSearch = "", onSearch }) {
  return (
    <div>
      <form className="search-container">
        <label htmlFor="search" className="mx-5 text-md">
          Tìm kiếm:
        </label>
        <input
          className="p-2 w-[500px] border border-slate-400 rounded outline-blue-500"
          name="value"
          id="search"
          type="text"
          placeholder="Nhập giá trị..."
          value={valueSearch}
          onChange={onSearch}
        />
      </form>
    </div>
  );
}

Search.propTypes = {
  valueSearch: PropTypes.string,
  onSearch: PropTypes.func,
}

export default Search;
