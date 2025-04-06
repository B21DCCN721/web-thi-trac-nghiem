import PropTypes from "prop-types";
function Search({ onSearch }) {
  return (
    <div>
      <form className="search-container">
        <label htmlFor="search" className="mx-5 text-md text-gray-500">
          Tìm kiếm:
        </label>
        <input
          className="p-2 w-[500px] border border-slate-400 rounded focus:outline-none"
          name="value"
          id="search"
          type="text"
          placeholder="Nhập giá trị..."
          onChange={onSearch}
        />
      </form>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
}

export default Search;
