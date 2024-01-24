export default function SearchBar() {
  return (
    <form className="d-flex" role="search">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-outline-secondary" type="submit">
          <i className="fa fa-search" />
        </button>
      </div>
    </form>
  )
}