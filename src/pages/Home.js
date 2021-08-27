import React, { useState, useEffect } from 'react'
import avatar from '@/assets/avatar.jpg'
import clsx from 'clsx'

const Card = (props) => {
  const { label, children, bgFrom, bgTo, scaleFrom } = props

  // const [scale, setScale] = useState(`scale-${scaleFrom}`)
  // const [opacity, setOpacity] = useState(0)
  const [initializing, setInitializing] = useState(true)

  // !! Notice
  // !! do not use something like `from-${bgFrom}`, use complete classname instead
  // !! because tailwindcss will not include corresponding styles in build stylesheet
  // !! reference: https://tailwindcss.com/docs/optimizing-for-production

  useEffect(() => {
    setInitializing(false)
  }, [])

  return (
    <div
      className={clsx(
        'transition-all duration-1000 transform-gpu',
        initializing ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div
        className={clsx(
          'relative h-full p-8 rounded-lg',
          'bg-gradient-to-r',
          'dark:bg-none',
          'dark:border-gray-200 dark:border-solid dark:border-2',
          bgFrom,
          bgTo,
          'text-gray-50',
          'transition-all transform-gpu duration-1000',
          initializing ? scaleFrom : 'scale-100',
        )}
      >
        {!!label && (
          <div
            className={clsx(
              'absolute rounded-lg bg-white bg-opacity-20',
              'text-center text-xl font-mono text-gray-50',
              // 'dark:bg-opacity-0',
              'p-2 z-10 top-0 right-0',
            )}
          >
            {label}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

const BasicInfo = () => (
  <Card bgFrom="from-indigo-500" bgTo="to-blue-400" scaleFrom="scale-50">
    <div className="h-full flex flex-col items-center justify-between">
      <img
        className="h-24 w-24 rounded-full inline-block border-white border-solid border-2"
        src={avatar}
        alt="avatar"
      />
      <div className="flex flex-col justify-around space-y-2 mt-6">
        <div className="flex flex-row space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <span>jg.zhuo@outlook.com</span>
        </div>

        <div className="flex flex-row space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span>+86 181 0190 1029</span>
        </div>

        <div className="flex flex-row space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>zhuojinggang</span>
        </div>
      </div>
    </div>
  </Card>
)

const EducationInfo = () => (
  <Card
    bgFrom="from-blue-400"
    bgTo="to-green-500"
    scaleFrom="scale-75"
    label="Education"
  >
    <div className="flex flex-col space-y-2 mt-6">
      <div className="">
        <div className="text-lg font-mono">AI and Data Design</div>
        <div className="">Tongji University</div>
        <div className="opacity-50">2019 - 2022</div>
      </div>
      <div className="">
        <div className="text-lg font-mono">Computer Science</div>
        <div className="">Tongji University</div>
        <div className="opacity-50">2015 - 2019</div>
      </div>
    </div>
  </Card>
)

const InternshipInfo = () => (
  <Card
    bgFrom="from-green-500"
    bgTo="to-indigo-500"
    scaleFrom="scale-50"
    label="Internship"
  >
    <div className="flex flex-col space-y-2 mt-6">
      <div className="">
        <div className="text-lg font-mono">NetScout Shanghai</div>
        <div className="">Technical Support Intern</div>
        <div className="opacity-50">2018.05 - 2018.11</div>
      </div>
      <div className="">
        <div className="text-lg font-mono">Tezign</div>
        <div className="">Algorithms Intern</div>
        <div className="opacity-50">2018.12 - 2019.03</div>
      </div>
    </div>
  </Card>
)

const Project = (props) => {
  const { title, time, description, url, bgFrom, bgTo, scaleFrom } = props

  return (
    <Card bgFrom={bgFrom} bgTo={bgTo} scaleFrom={scaleFrom} label="Project">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="font-mono text-2xl mt-6 lg:mt-4">{title}</div>
          <div className="font-mono text-opacity-20 text-sm">{time}</div>
          <div className="mt-6">{description}</div>
        </div>

        <div className="flex flex-row">
          <div className="mt-6 hover:bg-white hover:bg-opacity-20 transition duration-200 rounded-md">
            <a
              className="flex transform hover:translate-x-2 transition-transform duration-200 py-2 pr-4"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}

const Home = () => {
  return (
    <div className="grid grid-cols-1 mx-8 lg:m-auo lg:grid-cols-3 gap-4">
      <BasicInfo />
      <EducationInfo />
      <InternshipInfo />

      <Project
        title="Calligraphy.AI"
        time="Dec, 2020"
        description='"A Framework and Dataset for Abstract Art Generation via CalligraphyGAN", accepted by Machine Learning for Creativity and Design, NeurIPS Workshop'
        url="https://arxiv.org/abs/2012.00744"
        bgFrom="from-yellow-400"
        bgTo="to-red-400"
        scaleFrom="scale-75"
      />

      <Project
        title="sg2layout"
        time="Dec, 2020"
        description="Reimplement part of sg2im in TensorFlow 2.3, and trained it on magazine dataset to generate layout data from scene graph."
        url="https://github.com/zhuojg/sg2layout"
        bgFrom="from-red-400"
        bgTo="to-pink-400"
        scaleFrom="scale-50"
      />

      <Project
        title="Subculture Colorization"
        time="Mar, 2021"
        description='"Culture-inspired Multi-modal Color Palette Generation and Colorization: A Chinese Youth Subculture Case", accepted by The 3rd IEEE Workshop on Artificial Intelligence for Art Creation.'
        url="https://github.com/tezignlab/subculture-colorization"
        bgFrom="from-pink-400"
        bgTo="to-yellow-400"
        scaleFrom="scale-75"
      />
    </div>
  )
}

export default Home
