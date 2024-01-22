import NavigationBar from "../components/NavigationBar";
import LoginForm from "../components/LoginForm";

export default function AdminSignin({theme, setTheme}) {
  return (
    <div className="d-flex flex-column vh-100 bg-dark">
      <NavigationBar theme={theme} setTheme={setTheme} />
      <main className="container flex-grow-1 d-flex align-items-center">
        <div className="d-flex flex-grow-1">
          <div className="flex-grow-1 d-flex justify-content-center">
            <div id="logo-display-area" className="h-100" />
          </div>
          <LoginForm />
        </div>
      </main>
    </div>    
  );
}