import { Fragment } from "react"

// import Moveable from "react-moveable";
// import './drag.styles.css'
// import MoveableHelper from "moveable-helper";

import { Rnd } from "react-rnd";
// import StyledRect from "react-resizable-rotatable-draggable";
import styled from "styled-components";


import { useState } from "react";


const StyledRnd = styled(Rnd)`
`;



const MoveItem = ({ item }) => {
	// const [helper] = useState(() => {
	// return new MoveableHelper();
	// });

	// const targetRef = useRef(null);


	  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 80,
    height: 80
		});
	
	  function onResize(event, direction, ref, delta) {
    console.log(event);
    const { width, height } = ref.style;

    setPosition((prevPosition) => ({
      ...prevPosition,
      width,
      height
    }));
	}
	
	
  function onDragStop(e, d) {
    const { x, y } = d;
    setPosition((prevPosition) => ({
      ...prevPosition,
      x,
      y
    }));
  }

	
	return (
		<Fragment>
			 {/* <div className="target" ref={targetRef} >
        <img
          width="70"
          height="70"
          src={ item }
          alt=""
        />
      </div>

      <Moveable
				target={!submitHandler ? targetRef : ''}
				draggable={true}
				scalable={true}
				keepRatio={true}
				rotatable={true}
				onDragStart={helper.onDragStart}
				onDrag={helper.onDrag}
				onScaleStart={helper.onScaleStart}
				onScale={helper.onScale}
				onRotateStart={helper.onRotateStart}
				onRotate={helper.onRotate}
				bounds={container }
			/> */}

      <StyledRnd
        default={position}
        onResize={onResize}
        onDragStop={onDragStop}
        bounds="parent"
        lockAspectRatio={true}
      >
				<img
          width="100%"
          height="100%"
          src={ item }
          alt=""
        />
      </StyledRnd>
			
		</Fragment>
	)
}

export default MoveItem