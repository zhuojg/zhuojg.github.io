import React from 'react'

const FooterLink = (props) => {
  const { href, children } = props

  return (
    <div className="hover:text-white">
      <a
        className="transition duration-200"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="bg-gray-900 py-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 h-full gap-8">
        <div className="lg:col-span-3 flex flex-col justify-center text-center lg:text-left">
          <div className="text-gray-500 font-bold">Powered by</div>
          <div className="flex flex-col text-gray-500 mt-6 space-y-2 transition duration-200">
            <div className="hover:text-white">
              <FooterLink href="https://reactjs.org/">React</FooterLink>
            </div>

            <div className="hover:text-white">
              <FooterLink href="https://tailwindcss.com/">
                tailwindcss
              </FooterLink>
            </div>

            <div className="hover:text-white">
              <FooterLink href="https://github.com/">GitHub</FooterLink>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:justify-end">
          <div className="text-gray-500 text-center lg:text-right">
            Jinggang Zhuo
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
