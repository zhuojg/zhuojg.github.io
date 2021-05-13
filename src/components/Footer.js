import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-900 py-8">
      <div className="container mx-auto grid grid-cols-4 h-full">
        <div className="col-span-3 flex flex-col justify-center">
          <div className="text-gray-500 font-bold">Powered by</div>
          <div className="flex flex-col text-gray-500 mt-6 space-y-2">
            <div>React</div>
            <div>Create React App</div>
            <div>TailwindCSS</div>
            <div>GitHub</div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="text-gray-500 text-right">Jinggang Zhuo</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
