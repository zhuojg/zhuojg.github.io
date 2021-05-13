import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import NavBar from '@/components/NavBar'
import Container from '@/components/Container'
import Footer from '@/components/Footer'

const App = () => {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <Router>
        <div className="flex flex-col min-h-screen text-gray-900 dark:bg-gray-700 dark:text-gray-100">
          <NavBar
            toggleDarkMode={() => {
              setDark(!dark)
            }}
          />
          <Container>
            <Home />
          </Container>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
