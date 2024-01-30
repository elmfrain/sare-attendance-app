import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import AuthService from "../utils/auth";
import Footer from "../components/Footer";

export default function AppBasePage({theme, setTheme})
{
  if(!AuthService.isLoggedIn()) 
    window.location.assign('/');

  return (
    <div className="d-flex flex-column gap-3" style={{ minHeight: "100vh", height: "100%" }}>
      <NavigationBar theme={theme} setTheme={setTheme} />
      <div id="main-div" className="container flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}