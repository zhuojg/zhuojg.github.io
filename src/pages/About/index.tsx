import React, { useState } from 'react'
import styles from './index.module.scss'
import avatar from '../../assets/avatar.png'
import wechat from '../../assets/wechat.jpg'
import classnames from 'classnames'
import LoadingImage from '../../components/LoadingImage'

interface SocialLink {
  name: string
  url: string | undefined
  content: React.ReactNode
}

const linkList: SocialLink[] = [
  {
    name: 'WeChat',
    url: undefined,
    content: (
      <img src={wechat} style={{ height: '128px' }} alt="wechat-qrcode" />
    ),
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/jgzhuo/',
    content: undefined,
  },
  {
    name: 'E-mail',
    url: 'mailto:jg.zhuo@outlook.com',
    content: undefined,
  },
  {
    name: 'Github',
    url: 'https://github.com/zhuojg',
    content: undefined,
  },
]

const LinkWithPopover = (props: SocialLink) => {
  const { name, url, content } = props
  const [popVisible, setPopVisible] = useState(false)

  return (
    <div
      className={styles.links_item}
      onMouseEnter={() => {
        setPopVisible(true)
      }}
      onMouseLeave={() => {
        setPopVisible(false)
      }}
      key={name}
    >
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="button">
          {name}
        </a>
      ) : (
        <div className="button">{name}</div>
      )}
      {!!content && (
        <div
          className={classnames({
            [styles.links_item_popover]: true,
            [styles.links_item_popover_none]: !popVisible,
          })}
        >
          <div className={styles.links_item_popover_content}>{content}</div>
        </div>
      )}
    </div>
  )
}

const About = () => {
  return (
    <div className={styles.about_wrap}>
      {/* <img className={styles.avatar} src={avatar} alt="avatar" /> */}
      <div className={styles.avatar}>
        <LoadingImage
          src={avatar}
          alt="zhuojg"
          spinner={<div className="loader"></div>}
        />
      </div>

      <div className={styles.basic_info_wrap}>Jinggang Zhuo | 卓京港</div>
      <div className={styles.links_wrap}>
        {linkList.map((item) => LinkWithPopover(item))}
      </div>
      <div className="divider" />
      <div className={styles.intro_wrap}>
        <p>
          I am now a master student at{' '}
          <a href="https://sheji.ai" target="_blank" rel="noreferrer">
            Design A.I. Lab
          </a>
          , College of Design & Innovation, Tongji University. And I took my
          bachelor's degree in Computer Science at Tongji University.
        </p>
        <p>
          My current work is about empowering graphic design tools with deep
          learning algorithms.
        </p>
        <br />
        <p>
          <b>Work Experience</b>
        </p>
        <ul>
          <li>
            2018/12 - 2019/03: Intern of AI Lab at{' '}
            <a href="https://www.tezign.com" target="_blank" rel="noreferrer">
              Tezign.com
            </a>
          </li>
          <li>
            2018/03 - 2018/11: Technical Support Intern at{' '}
            <a
              href="https://www.netscout.com/"
              target="_blank"
              rel="noreferrer"
            >
              NETSCOUT
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
