function PaginationGroup({fromPage, toPage, currentPage, setCurrentPage}) {
  const pages = [];

  for (let i = fromPage; i <= toPage; i++) {
    pages.push(
      <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(i)}>{i}</button>
      </li>
    );
  }

  return (
    <ul className="pagination pagination-sm m-0">
      {pages}
    </ul>
  );
}

export default function Pagination({numPages, currentPage, setCurrentPage}) {
  const groups = [];

  if(numPages <= 7) {
    groups.push(<PaginationGroup fromPage={1} toPage={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} key={0}/>);
  } else if(currentPage <= 3) {
    groups.push(<PaginationGroup fromPage={1} toPage={5} currentPage={currentPage} setCurrentPage={setCurrentPage} key={0}/>);
    groups.push(<span key={1}>...</span>);
    groups.push(<PaginationGroup fromPage={numPages - 1} toPage={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} key={2}/>);
  } else if(currentPage >= numPages - 2) {
    groups.push(<PaginationGroup fromPage={1} toPage={2} currentPage={currentPage} setCurrentPage={setCurrentPage} key={0}/>);
    groups.push(<span key={1}>...</span>);
    groups.push(<PaginationGroup fromPage={numPages - 4} toPage={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} key={2}/>);
  } else {
    groups.push(<PaginationGroup fromPage={1} toPage={2} currentPage={currentPage} setCurrentPage={setCurrentPage} key={0}/>);
    groups.push(<span key={1}>...</span>);
    groups.push(<PaginationGroup fromPage={currentPage - 1} toPage={currentPage + 1} currentPage={currentPage} setCurrentPage={setCurrentPage} key={2}/>);
    groups.push(<span key={3}>...</span>);
    groups.push(<PaginationGroup fromPage={numPages - 1} toPage={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} key={4}/>);
  }

  return (
    <nav className="d-flex align-items-center gap-2" >
      <button className="btn btn-primary btn-sm" disabled={currentPage <= 1 ? true : false} onClick={() => setCurrentPage(currentPage - 1)}>
        <i className="fa fa-chevron-left" />
      </button>

      <div className="d-flex align-items-center justify-content-center gap-2" style={ numPages <= 7 ? {} : {minWidth: "233px"}}>
        { groups }
      </div>

      <button className="btn btn-primary btn-sm" disabled={numPages <= currentPage} onClick={() => setCurrentPage(currentPage + 1)}>
        <i className="fa fa-chevron-right" />
      </button>
    </nav>
  );
}