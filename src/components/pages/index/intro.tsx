import { Typewriter } from '@/components/common/typewriter'
import { FC } from 'react'

export const Intro: FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Typewriter fontClass="font-bold text-4xl" content="Hi!" duration={0.5} delay={1} hideCursorAfterFinish={true} />
      <Typewriter fontClass="text-lg" content="I'm Zhuo Jinggang." duration={2} delay={2.5} />
    </div>
  )
}
