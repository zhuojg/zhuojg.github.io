import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export interface NavItem {
  name: string
  path: string
}

const NavBar = (props: { linkList: NavItem[] }) => {
  const { linkList } = props
  return (
    <div className={styles.nav_wrap}>
      {linkList.map((item: NavItem) => (
        <div className={styles.nav_item} key={item.name}>
          <Link to={item.path}>{item.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default NavBar
