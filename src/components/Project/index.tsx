import React from 'react'
import styles from './index.module.scss'
import { useLocation, Link, Switch, Route } from 'react-router-dom'
import CalligraphyAI from './CalligraphyAI'
import SubcultureColorization from './SubcultureColorization'

export interface ProjectItem {
  name: string
  note: React.ReactNode
  path: string
  component: React.FunctionComponent
}

const projectList: ProjectItem[] = [
  {
    name: 'Calligraphy.AI',
    note: (
      <i>
        accepted by{' '}
        <a
          href="https://neurips2020creativity.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          Machine Learning for Creativity and Design 4.0
        </a>
        , NeurIPS 2020 Workshop
      </i>
    ),
    path: '/project/calligraphy',
    component: CalligraphyAI,
  },
  // {
  //   name: 'Subculture Colorization',
  //   note: '',
  //   path: '/project/subculture',
  //   component: SubcultureColorization,
  // },
]

const Project = () => {
  const location = useLocation()

  return (
    <div className={styles.project_list}>
      <div className={styles.project_list_title}>Published Work</div>
      <div className={styles.project_list_content}>
        {projectList.map((item: ProjectItem) => (
          <div className={styles.project_list_content_title} key={item.name}>
            <Link to={item.path}>{item.name}</Link>
            {!!item.note && location.pathname === '/project' && (
              <div style={{ fontSize: '16px', opacity: 0.6 }}>{item.note}</div>
            )}
          </div>
        ))}
      </div>

      <Switch>
        {projectList.map((item) => (
          <Route path={item.path} key={item.name}>
            <item.component />
          </Route>
        ))}
        <Route path="/project" exact></Route>
      </Switch>
    </div>
  )
}

export default Project
