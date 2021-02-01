import React from 'react'
import styles from './index.module.scss'

const Container: React.FunctionComponent = (props: {
  children?: React.ReactNode
}) => {
  const { children } = props
  return <div className={styles.main_wrap}>{children}</div>
}

export default Container
