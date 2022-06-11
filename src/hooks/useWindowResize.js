import { useEffect, useState } from "react";

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleWindowResize() {
      // console.log(windowSize);
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowSize;
};

export default useWindowResize;
