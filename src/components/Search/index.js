import Button from "../Button";

function Search() {
  return (
    <div>
      <form className="search-container">
        <label htmlFor="search" className="mx-5">
          Tìm kiếm:
        </label>
        <input
          className="p-2 border border-slate-400 rounded focus:outline-none"
          name="value"
          id="search"
          type="text"
          placeholder="Nhập giá trị..."
        />
        <Button type={"button"}>Lọc</Button>
      </form>
    </div>
  );
}

export default Search;
