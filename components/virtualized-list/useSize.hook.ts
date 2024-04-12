import { RefObject, useCallback, useLayoutEffect, useState } from "react";

const useSize = (ref: RefObject<HTMLDivElement>, offset = 1) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    if (ref.current) {
      setWindowSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight - offset,
      });
    }
  }, [offset, ref]);

  useLayoutEffect(() => {
    // Copy ref.current to a variable within the effect as ref.current can change by the time this effect cleanup function runs
    const element = ref.current;

    if (element) {
      updateSize(); // Update size immediately when the component mounts

      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(element);

      // Use the stable 'element' variable for cleanup
      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, [updateSize, ref]);

  return {
    windowSize,
    updateSize,
  };
};

export default useSize;
