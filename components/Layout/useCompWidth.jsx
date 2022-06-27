import { useState, useRef, useEffect } from "react";

const useCompWidth = (contRef) => {
  const getWidth = () => {
    if (!contRef.current) return 0;
    return contRef.current.offsetWidth;
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
  }, [contRef.current]);

  return state;
}

export default useCompWidth
