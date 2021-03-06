import React from 'react'
import styles from './index.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { VscHome } from 'react-icons/vsc'
import classnames from 'classnames'

export interface NavItem {
  name: string
  path: string
}

const NavBar = (props: { linkList: NavItem[] }) => {
  const { linkList } = props

  const location = useLocation()

  return (
    <div className={styles.nav_wrap}>
      {linkList.map((item: NavItem) => (
        <Link
          className={classnames([styles.nav_item, 'button'])}
          key={item.name}
          to={item.path}
        >
          {item.name}
        </Link>
      ))}
      {location.pathname !== '/' && (
        <Link to="/" className={styles.home_button}>
          <VscHome style={{ color: 'black', verticalAlign: 'middle' }} />
        </Link>
      )}
    </div>
  )
}

export default NavBar
