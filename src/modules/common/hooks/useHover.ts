// reference: https://usehooks.com/useHover/

import { RefObject, useEffect, useRef, useState } from 'react'

export const useHover = <T extends HTMLElement>(): [boolean, RefObject<T>] => {
  const [value, setValue] = useState(false)
  const ref = useRef<T>(null)
  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)
  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)
        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }
    },
    [ref.current], // Recall only if ref changes
  )
  return [value, ref]
}
