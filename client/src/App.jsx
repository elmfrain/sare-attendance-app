import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react';

import AdminSignin from './pages/AdminSignin.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AttendancePage from "./pages/AttendancePage.jsx";
import MeetingsPage from "./pages/MeetingsPage.jsx";
import AppBasePage from "./pages/AppBasePage.jsx";
import MembersPage from "./pages/MembersPage.jsx";

function updateTheme(theme) {
  localStorage.setItem("theme", theme);

  const rootElement = document.getElementById('root');
  rootElement.dataset.bsTheme = theme;
  rootElement.classList.remove("bg-light", "bg-dark");
  rootElement.classList.add(`bg-${theme}`);
  setTimeout(() => {rootElement.style.transition = "background-color 0.5s cubic-bezier(0.25, 1, 0.5, 1)";}, 100); // Don't apply tranisition immediatley
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark");

  updateTheme(theme); // Set theme as soon as app starts initializing

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminSignin theme={theme} setTheme={setTheme} />,
      errorElement: <ErrorPage theme={theme} setTheme={setTheme} />
    },
    {
      path: "/admin",
      element: <AppBasePage theme={theme} setTheme={setTheme} />,
      errorElement: <ErrorPage theme={theme} setTheme={setTheme} />,
      children: [
        {
          path: "/admin/attendance",
          element: <AttendancePage theme={theme} setTheme={setTheme} />,
          errorElement: <ErrorPage theme={theme} setTheme={setTheme} />
        },
        {
          path: "/admin/meetings",
          element: <MeetingsPage theme={theme} setTheme={setTheme} />,
          errorElement: <ErrorPage theme={theme} setTheme={setTheme} />
        },
        {
          path: "/admin/members",
          element: <MembersPage theme={theme} setTheme={setTheme} />,
          errorElement: <ErrorPage theme={theme} setTheme={setTheme} />
        }
      ]
    },
  ]);

  useEffect(() => { updateTheme(theme)}, [theme]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
