export default function SearchBar({ onSearch }) {

  function search(e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value;
    onSearch(query);
  }

  return (
    <form className="d-flex" role="search" onSubmit={search}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-outline-secondary" type="submit">
          <i className="fa fa-search" />
        </button>
      </div>
    </form>
  )
}