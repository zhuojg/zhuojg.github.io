import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { VscLinkExternal } from 'react-icons/vsc'

import Carousel from '../../components/Carousel'
import LoadingImage from '../../components/LoadingImage'

import fred from '../../assets/fred.png'
import calligraphy from '../../assets/calligraphy.png'

const CarouselPage = (props: {
  title: string
  content?: React.ReactNode
  innerUrl?: string
  outterUrl?: string
  img?: string
}) => {
  const { title, content, innerUrl, outterUrl, img } = props

  return (
    <div className={styles.content_wrap}>
      <div className={styles.content_left}>
        <div className={styles.content_title}>{title}</div>
        <div className={styles.content_body_wrap}>{content}</div>
        <div>
          {!!innerUrl && (
            <Link className="button inline-button" to={innerUrl}>
              Learn more
            </Link>
          )}
          {!!outterUrl && (
            <a
              className="button inline-button"
              href={outterUrl}
              target="_blank"
              rel="noreferrer"
            >
              Learn more{' '}
              <VscLinkExternal
                style={{ paddingLeft: '8px', verticalAlign: 'middle' }}
              />
            </a>
          )}
        </div>
      </div>
      <div className={styles.content_right}>
        <div className={styles.content_img_wrap}>
          {!!img && (
            <LoadingImage
              src={img}
              alt={title}
              spinner={<div className="loader"></div>}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const showingItemList: React.ReactNode[] = [
    <CarouselPage
      title="Calligraphy.AI"
      content={
        <>
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
          <p>
            We use Chinese calligraphy images to train a conditional GAN to
            generate abstract artworks.
          </p>
        </>
      }
      innerUrl="/project/calligraphy"
      img={calligraphy}
    />,
    <CarouselPage
      title="FRED"
      content={<>An End-to-End Boilerplate for Full Stack Development</>}
      outterUrl="https://github.com/harrywang/fred"
      img={fred}
    />,
  ]

  return (
    <div className={styles.home_wrap}>
      <Carousel data={showingItemList} />
    </div>
  )
}

export default Home
