import React from 'react'
import styles from './index.module.scss'
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom'
import CalligraphyAI from './CalligraphyAI'
import SubcultureColorization from './SubcultureColorization'

export interface ProjectItem {
  name: string
  path: string
  component: React.FunctionComponent
}

const projectList: ProjectItem[] = [
  {
    name: 'Calligraphy.AI',
    path: '/project/calligraphy',
    component: CalligraphyAI,
  },
  {
    name: 'Subculture Colorization',
    path: '/project/subculture',
    component: SubcultureColorization,
  },
]

const Project = () => {
  return (
    <div>
      <div>
        {projectList.map((item: ProjectItem) => (
          <div key={item.name}>
            <Link to={item.path}>{item.name}</Link>
          </div>
        ))}
      </div>

      <Switch>
        {projectList.map((item) => (
          <Route path={item.path} key={item.name}>
            <item.component />
          </Route>
        ))}
        <Route path="/project" exact>
          <div>Choose one</div>
        </Route>
      </Switch>
    </div>
  )
}

export default Project
