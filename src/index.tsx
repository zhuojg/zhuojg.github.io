import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css'

import Footer from './components/Footer'
import Container from './components/Container'
import NavBar, { NavItem } from './components/NavBar'

import Home from './pages/Home'
import About from './pages/About'
import Project, { ProjectItem } from './pages/Project'

import reportWebVitals from './reportWebVitals'

const linkList: NavItem[] = [
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Project',
    path: '/project',
  },
]

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar linkList={linkList} />
      <Container>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/project">
            <Project />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
