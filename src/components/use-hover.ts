import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useHover = <T extends HTMLElement>(): [
  boolean,
  RefObject<T | null>,
] => {
  const [value, setValue] = useState(false);
  const ref = useRef<T>(null);
  const handleMouseOver = useCallback(() => setValue(true), []);
  const handleMouseOut = useCallback(() => setValue(false), []);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [handleMouseOut, handleMouseOver], // Recall only if ref changes
  );
  return [value, ref];
};
