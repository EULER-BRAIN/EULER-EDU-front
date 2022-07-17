import { useState, useRef, useEffect } from "react";

const useRstate = (contRef) => {
  const getState = () => {
    let width = document.body.clientWidth;
    if (contRef?.current) {
      width = contRef?.current.clientWidth;
    }
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
  }, [contRef?.current]);

  return state;
}

const RLayout = (props) => {
  const contRef = useRef();
  const state = useRstate(props.nbody ? contRef : null);

  return (
    <div ref={ contRef }>
      <div style = { state == 1 ? {
        width: '884px', margin: 'auto',
        position: 'relative'
      } : {
        marginLeft: '13px', marginRight: '13px',
        position: 'relative'
      } }>
        { props.children }
      </div>
    </div>
  )
}

export default RLayout
export { RLayout, useRstate }
