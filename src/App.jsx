import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NotificationApi from './NativeApis/Notifications.jsx'
import ShareApi from './NativeApis/Share.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Capacitor React App</h1>
        <NotificationApi />
        <ShareApi button_text='Share'/>
      </div>
    </>
  )
}

export default App
