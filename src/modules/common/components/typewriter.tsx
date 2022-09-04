import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

// keyframes are defined in global.css
export const Typewriter: FC<{
  content: string
  delay?: number
  duration: number
  hideCursorAfterFinish?: boolean
  fontClass?: string
  align?: 'left' | 'center' | 'right'
}> = ({ content, delay = 0, duration, hideCursorAfterFinish = false, fontClass, align }) => {
  const [hide, setHide] = useState(false)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const durationTimer = setTimeout(() => {
      if (hideCursorAfterFinish) setHide(true)
    }, (duration + delay) * 1000)

    const delayTimer = setTimeout(() => {
      setStart(true)
    }, delay * 1000)

    return () => {
      clearTimeout(delayTimer)
      clearTimeout(durationTimer)
    }
  }, [])

  return (
    <div
      className={clsx('w-full text-base whitespace-nowrap flex', {
        'justify-start': align === 'left',
        'justify-end': align === 'right',
        'justify-center': align === 'center',
      })}
    >
      <div>
        <div
          className={clsx(
            'font-mono overflow-hidden',
            { 'border-r-2 border-r-blue-600': !hide && start },
            { 'w-0': !start },
            fontClass,
          )}
          style={{
            animation: `typing ${duration}s steps(${content.length}, end), blink-caret 0.75s step-end infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  )
}
