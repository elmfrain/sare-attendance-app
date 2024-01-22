import ThemeToggler from "./ThemeToggler";

export default function NavigationBar({theme, setTheme}) {
  const location = window.location.pathname.split("/");
  const currentPage = "/" + location[location.length - 1];

  return (
    currentPage != "/" ? (
    <nav className="navbar navbar-expand-md" data-bs-theme="dark" id="main-nav-bar">
      <div className="container-fluid d-flex justify-content-center">
        <a className="navbar-brand d-flex justify-content-center align-items-center gap-3" href="#">
          <img src="/assets/images/logo/64.png"/>
          Attendance Portal
        </a>
        <div className="collapse navbar-collapse" id="nav-content">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className={currentPage == "/attendance" ? "nav-link active" : "nav-link"} href="/admin/attendance">Attendance</a>
            </li>
            <li className="nav-itme">
              <a className={currentPage == "/meetings" ? "nav-link active" : "nav-link"} href="/admin/meetings">Meetings</a>
            </li>
            <li className="nav-item">
              <a className={currentPage == "/members" ? "nav-link active" : "nav-link"} href="/admin/members">Members</a>
            </li>
          </ul>
          <ThemeToggler theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
    ) : (
    <nav className="navbar" data-bs-theme="dark" id="main-nav-bar">
      <div className="container-fluid d-flex justify-content-center">
        <a className="navbar-brand d-flex justify-content-center align-items-center gap-3" href="#">
          <img src="/assets/images/logo/64.png"/>
          Attendance Portal
        </a>
        <ThemeToggler theme={theme} setTheme={setTheme} />
      </div>
    </nav>
    )
  );
}