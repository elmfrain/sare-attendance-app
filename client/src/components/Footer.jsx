export default function Footer({theme, setTheme}) {
  return (
    <footer className="navbar p-4 bg-dark box-shadow justify-content-center" data-bs-theme="dark">
      <a className="navbar-brand d-flex justify-content-center align-items-center gap-3" href="#">
        <img src="/assets/images/logo/64.png"/>
        <div className="d-flex flex-column">
          Attendance Portal
          <span className="fs-6 text-secondary">Dev Build</span>
        </div>
      </a>
    </footer>
  );
}