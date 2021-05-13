import React from 'react'
import avatar from '@/assets/avatar.jpg'

const Home = () => {
  return (
    <div className="flex flex-col divide-y space-y-4">
      <div className="p-4 grid grid-cols-3 space-x-4">
        <div className="shadow-md rounded-lg p-8 flex flex-col items-center border-solid border-gray-900 border-2 dark:border-gray-100">
          <img className="h-32 w-32 rounded-full inline-block border-solid border-gray-900 border-2 dark:border-gray-100" src={avatar} />

          <div className="flex flex-col space-y-2 mt-6">
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
              <span>zhuojg1519</span>
            </div>
          </div>
        </div>

        <div className="shadow-md rounded-lg p-8 flex flex-col border-solid border-gray-900 border-2 dark:border-gray-100">
          <div className="text-2xl font-mono">Education</div>
          <div className="flex flex-col space-y-2 mt-6">
            <div className="">
              <div className="font-bold text-lg font-mono">AI and Data Design</div>
              <div className="font-light">Tongji University</div>
              <div className="text-gray-300">2019 - 2022</div>
            </div>
            <div className="">
              <div className="font-bold text-lg font-mono">Computer Science</div>
              <div className="font-light">Tongji University</div>
              <div className="text-gray-300">2015 - 2019</div>
            </div>
          </div>
        </div>

        <div className="shadow-lg rounded-lg p-8 flex flex-col border-solid border-gray-900 border-2 dark:border-gray-100">
          <div className="text-2xl font-mono">Internship</div>
          <div className="flex flex-col space-y-2 mt-6">
            <div className="">
              <div className="font-bold text-lg font-mono">NetScout Shanghai</div>
              <div className="font-light">Technical Support Intern</div>
              <div className="text-gray-300">2018.05 - 2018.11</div>
            </div>
            <div className="">
              <div className="font-bold text-lg font-mono">Tezign</div>
              <div className="font-light">Algorithms Intern</div>
              <div className="text-gray-300">2018.12 - 2019.03</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="p-4">
        <div className="text-2xl font-mono">Projects</div>
        <div className="">
          aboutaboutaboutaboutaboutaboutaboutaboutaboutaboutabout
        </div>
      </div> */}
    </div>
  )
}

export default Home
