import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'

const Carousel = (props: { data: React.ReactNode[] }) => {
  const { data } = props
  const [showingIdx, setShowingIdx] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      setShowingIdx((showingIdx + 1) % data.length)
    }, 3000)
  })

  return (
    <div className={styles.wrap}>
      {data.map((item, idx) => (
        <div
          className={classnames({
            [styles.item]: true,
            [styles.showing_item]: idx === showingIdx,
            [styles.last_item]: idx < showingIdx,
            [styles.next_item]: idx > showingIdx,
          })}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default Carousel
