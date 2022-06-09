import { useEffect, useState } from "react";

const getDimension = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useDimension = () => {
  const [windowDimension, setWindowDimension] = useState(getDimension());

  useEffect(() => {
    function handleResize() {
      setWindowDimension(getDimension());
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize");
  });
  return windowDimension;
};
