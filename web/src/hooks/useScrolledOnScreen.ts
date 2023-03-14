import { RefObject, useEffect, useState } from 'react';

type UseScrolledOnScreenOptions<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  onIntersection?: () => void;
};

type UseScrolledOnScreenState = {
  isIntersecting: boolean;
};

type UseScrolledOnScreenActions = {
  // add any actions the hook provides
};

export type UseScrolledOnScreenValue = UseScrolledOnScreenState &
  UseScrolledOnScreenActions;

const DEFAULT_PROPS = {} as const;

const useScrolledOnScreen = <T extends HTMLElement>(
  props: UseScrolledOnScreenOptions<T>
): UseScrolledOnScreenValue => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const p = {
    DEFAULT_PROPS,
    ...props,
  };
  const { onIntersection, ref } = p;
  useEffect(() => {
    if (ref.current) {
      const onScreenIntersection: IntersectionObserverCallback = (entries) => {
        const intersection = entries.some((entry) => {
          return entry.isIntersecting;
        });
        setIsIntersecting(intersection);
        if (intersection) {
          onIntersection?.();
        }
      };
      const observer = new IntersectionObserver(onScreenIntersection);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref, onIntersection]);

  return {
    isIntersecting,
  };
};

export default useScrolledOnScreen;
