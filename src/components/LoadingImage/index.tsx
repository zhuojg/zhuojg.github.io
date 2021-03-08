import React, { useState } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'

interface ImageProps {
  src: string
  alt: string
  spinner: React.ReactNode
}

const LoadingImage = (props: ImageProps) => {
  const { src, alt, spinner } = props

  const [loading, setLoading] = useState(true)

  return (
    <div className={styles.image_wrap}>
      {loading && <div className={styles.spinner_wrap}>{spinner}</div>}

      <img
        className={classnames({
          [styles.image_content]: true,
          [styles.image_invisible]: loading,
        })}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoading(false)
        }}
      />
    </div>
  )
}

export default LoadingImage
