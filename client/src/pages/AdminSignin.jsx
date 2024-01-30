import NavigationBar from "../components/NavigationBar";
import LoginForm from "../components/LoginForm";
import AuthService from "../utils/auth";

export default function AdminSignin({theme, setTheme}) {

  if(AuthService.isLoggedIn())
    window.location.assign('/admin/attendance');

  return (
    <div className="d-flex flex-column vh-100 bg-dark">
      <NavigationBar theme={theme} setTheme={setTheme} />
      <main className="container d-flex flex-column flex-grow-1">
        <div className="flex-grow-1" />
        <div className="d-flex flex-column flex-md-row justify-content-evenly w-100 align-items-center">
          <div id="logo-display-area" className="order-1 order-md-0" />
          <LoginForm />
        </div>
        <div className="flex-grow-2" />
      </main>
    </div>    
  );
}