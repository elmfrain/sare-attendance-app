import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function AppBasePage({theme, setTheme})
{
  const scrollDivStyle = {
    overflowY: "auto"
  };

  return (
    <div className="d-flex flex-column gap-3 vh-100" style={scrollDivStyle}>
      <NavigationBar theme={theme} setTheme={setTheme} />
      <div id="main-div" className="container flex-grow-1">
        <Outlet />
      </div>
    </div>
  )
}