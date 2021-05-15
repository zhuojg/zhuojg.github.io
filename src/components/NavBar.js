import React from 'react'
import { useHistory } from 'react-router-dom'

const NavBar = (props) => {
  const { toggleDarkMode } = props
  const history = useHistory()

  return (
    <div className="container px-2 lg:px-0 mx-auto h-16 border-b-2">
      <div className="grid grid-cols-4 h-full">
        <div className="flex flex-col flex-grow-0 justify-center">
          <div
            className="p-4 m-0 w-24 text-center font-mono cursor-pointer dark:text-gray-100"
            onClick={() => {
              history.push('/')
            }}
          >
            jg.zhuo
          </div>
        </div>
        <div className="col-span-2" />
        <div className="flex flex-col flex-grow-0 justify-center h-full">
          <div className="text-right flex flex-row justify-end">
            <div
              className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                toggleDarkMode()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
