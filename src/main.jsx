import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Global error handler to suppress external extension errors
window.addEventListener('error', (event) => {
  // Suppress errors from browser extensions
  if (event.filename && (
    event.filename.includes('webextension') ||
    event.filename.includes('extension') ||
    event.filename.includes('chrome-extension') ||
    event.filename.includes('moz-extension')
  )) {
    event.preventDefault()
    return false
  }
})

// Suppress unhandled promise rejections from external sources
window.addEventListener('unhandledrejection', (event) => {
  // Suppress Firebase and external service errors that don't affect functionality
  if (event.reason && typeof event.reason === 'string' && (
    event.reason.includes('runtime.lastError') ||
    event.reason.includes('message port closed') ||
    event.reason.includes('webextension')
  )) {
    event.preventDefault()
    return false
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
