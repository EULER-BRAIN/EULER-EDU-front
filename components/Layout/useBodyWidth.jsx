import { useState, useRef, useEffect } from "react";

const useBodyWidth = () => {
  const getWidth = () => {
    return document.body.clientWidth;
  }
  const stateR = useRef(0);
  const [state, setState] = useState(stateR.current);
  
  useEffect(() => {
    const resizeEvent = () => {
      const _state = getWidth();
      if (stateR.current !== _state) {
        stateR.current = _state;
        setState(_state);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  return state;
}

export default useBodyWidth
