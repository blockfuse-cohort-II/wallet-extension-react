import { useEffect, useRef, RefObject } from 'react';

type UseOutsideClickType = RefObject<HTMLElement>;

type CallbackType = () => void;

const useOutsideClick = (callback: CallbackType): UseOutsideClickType => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;