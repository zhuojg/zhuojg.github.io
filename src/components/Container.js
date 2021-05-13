import React from 'react'

const Container = (props) => {
  const { children } = props

  return <div className="container mx-auto flex-grow py-8">{children}</div>
}

export default Container
