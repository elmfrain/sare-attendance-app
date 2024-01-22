import React from 'react'
import ReactDOM from 'react-dom/client'

// Import bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// Import fontawesome icons
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
// Import custom styling
import './index.css'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
