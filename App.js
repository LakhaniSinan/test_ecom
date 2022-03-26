import React, { useState, useEffect } from "react"
import Navigation from "./src/navigation"
import AppProvider from "./src/context"
import SplashScreen from 'react-native-splash-screen'
const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])
  
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  )
}

export default App