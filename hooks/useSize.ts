import { RefObject, useCallback, useEffect, useState } from "react";

const useSize = (ref: RefObject<HTMLDivElement>) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    setWindowSize({
      width: ref?.current?.offsetWidth ?? 0,
      height: ref?.current?.offsetHeight ? ref?.current?.offsetHeight - 20 : 0,
    });
  }, [ref]);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  return windowSize;
};

export default useSize;
