import React from 'react'
import styles from './index.module.scss'
import { useLocation, Link, Switch, Route } from 'react-router-dom'
import { VscLinkExternal } from 'react-icons/vsc'
import CalligraphyAI from './CalligraphyAI'
import SubcultureColorization from './SubcultureColorization'
import Breadcumb from '../../components/Breadcumb'

export interface ProjectItem {
  name: string
  note: React.ReactNode
  path: string
  component: React.FunctionComponent | undefined
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

const OtherList: ProjectItem[] = [
  {
    name: 'FRED',
    note: (
      <i>
        FRED (Flask + REact + Docker): An End-to-End Boilerplate for Full Stack
        Development
      </i>
    ),
    path: 'https://github.com/harrywang/fred',
    component: undefined,
  },
  {
    name: 'LayoutNet-TF2',
    note: <i>Reimplement a SIGGRAPH 2019 paper using TensorFlow 2.3</i>,
    path: 'https://github.com/tezignlab/LayoutNet-TF2',
    component: undefined,
  },
  {
    name: 'Scene Graph 2 Layout',
    note: (
      <i>Reimplement Scene Graph to Image and train it with a layout dataset</i>
    ),
    path: 'https://github.com/zhuojg/sg2layout',
    component: undefined,
  },
  {
    name: 'Digiboard',
    note: <i>Course project of Digital Design at Tongji University</i>,
    path: 'https://www.bilibili.com/video/BV1VT4y1E72x',
    component: undefined,
  },
]

const Project = () => {
  const location = useLocation()

  return (
    <div className={styles.project_list}>
      <Breadcumb />
      {location.pathname === '/project' && (
        <>
          <div className={styles.project_list_title}>Published Works</div>
          <div className={styles.project_list_content}>
            {projectList.map((item: ProjectItem) => (
              <div
                className={styles.project_list_content_title}
                key={item.name}
              >
                <Link to={item.path}>{item.name}</Link>
                {!!item.note && (
                  <div className={styles.project_list_content_note}>
                    {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className={styles.project_list_title}>Other</div>
          <div className={styles.project_list_content}>
            {OtherList.map((item: ProjectItem) => (
              <div
                className={styles.project_list_content_title}
                key={item.name}
              >
                <a
                  href={item.path}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.name}
                </a>
                {!!item.note && (
                  <div className={styles.project_list_content_note}>
                    {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <Switch>
        {projectList.map((item) => (
          <Route path={item.path} key={item.name}>
            {!!item.component && <item.component />}
          </Route>
        ))}
        <Route path="/project" exact></Route>
      </Switch>
    </div>
  )
}

export default Project
