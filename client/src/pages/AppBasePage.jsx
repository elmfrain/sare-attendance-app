import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function AppBasePage({theme, setTheme})
{
  return (
    <div className="d-flex flex-column gap-3">
      <NavigationBar theme={theme} setTheme={setTheme} />
      <div id="main-div flex-grow-1">
        <Outlet />
      </div>
    </div>
  )
}