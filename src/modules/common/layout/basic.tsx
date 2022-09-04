import { FC } from 'react'

export const BasicLayout: FC = ({ children }) => (
  <div className="flex flex-col">
    {children}
    <div className="h-32" />
  </div>
)
