import React from 'react'
import styles from '../index.module.scss'

const CalligraphyAI = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_title}>CalligraphyAI</div>
      <div className={styles.content_note}>
        accepted by{' '}
        <a
          href="https://neurips2020creativity.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          Machine Learning for Creativity and Design 4.0
        </a>
        , NeurIPS 2020 Workshop
      </div>

      <div className={styles.content_links}>
        Links:
        <div className={styles.content_links_item}>
          <a
            href="https://arxiv.org/abs/2012.00744"
            target="_blank"
            rel="noreferrer"
          >
            paper
          </a>
        </div>
      </div>

      <div className="divider"></div>

      <div className={styles.content_body}>
        With the advancement of deep learning, artificial intelligence (AI) has
        made many breakthroughs in recent years and achieved superhuman
        performance in various tasks such as object detection, reading
        comprehension, and video games. Generative Modeling, such as various
        Generative Adversarial Networks (GAN) models, has been applied to
        generate paintings and music. Research in Natural Language Processing
        (NLP) also had a leap forward in 2018 since the release of the
        pre-trained contextual neural language models such as BERT and recently
        released GPT3. Despite the exciting AI applications aforementioned, AI
        is still significantly lagging behind humans in creativity, which is
        often considered the ultimate moonshot for AI. Our work is inspired by
        Chinese calligraphy, which is a unique form of visual art where the
        character itself is an aesthetic painting. We also draw inspirations
        from paintings of the Abstract Expressionist movement in the 1940s and
        1950s, such as the work by American painter Franz Kline. In this paper,
        we present a creative framework based on Conditional Generative
        Adversarial Networks and Contextual Neural Language Model to generate
        abstract artworks that have intrinsic meaning and aesthetic value, which
        is different from the existing work, such as image captioning and
        text-to-image generation, where the texts are the descriptions of the
        images. In addition, we have publicly released a Chinese calligraphy
        image dataset and demonstrate our framework using a prototype system and
        a user study.
      </div>
    </div>
  )
}

export default CalligraphyAI
