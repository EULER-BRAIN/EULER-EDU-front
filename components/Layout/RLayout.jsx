import { useState, useRef, useEffect } from "react";

const useRstate = () => {
  const getState = () => {
    const width = document.body.clientWidth;
    if (width >= 910) return 1;
    return 2;
  }
  const stateR = useRef(0);
  const [state, setState] = useState(stateR.current);
  
  useEffect(() => {
    const resizeEvent = () => {
      const _state = getState();
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

const RLayout = (props) => {
  const state = useRstate();

  return (
    <div style = { state == 1 ? {
      width: '884px', margin: 'auto',
      position: 'relative'
    } : {
      marginLeft: '13px', marginRight: '13px',
      position: 'relative'
    } }>
      { props.children }
    </div>
  )
}

export default RLayout
