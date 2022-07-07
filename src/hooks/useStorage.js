import { useEffect, useState } from "react";

const getPrev = (key, initialValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (typeof savedValue !== typeof initialValue) return initialValue;
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useStorage = (key, initialValue) => {
  const [state, setState] = useState(() => getPrev(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    // eslint-disable-next-line
  }, [state]);

  return [state, setState];
};
export default useStorage;
