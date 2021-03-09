import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styles from './index.module.scss'

const Breadcumb = () => {
  const location = useLocation()
  const pathList = location.pathname.split('/')

  return (
    <div className={styles.content_wrap}>
      {pathList.map((item, idx) => {
        if (idx === 0) {
          return (
            <div className={styles.path_item} key={idx}>
              <Link to="/">home</Link>
            </div>
          )
        } else if (idx === pathList.length - 1) {
          return (
            <div className={styles.path_item} key={idx}>
              <span style={{ padding: '0 8px' }}>/</span>
              <span>{item}</span>
            </div>
          )
        } else {
          return (
            <div className={styles.path_item} key={idx}>
              <span style={{ padding: '0 8px' }}>/</span>
              <Link to={pathList.slice(0, idx + 1).join('/')}>{item}</Link>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Breadcumb
