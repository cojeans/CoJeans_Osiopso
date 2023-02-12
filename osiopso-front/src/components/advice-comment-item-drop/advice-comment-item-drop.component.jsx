import Moveable from "react-moveable";
import './drag.styles.css'
import MoveableHelper from "moveable-helper";

import { useState, useRef } from "react";

const DropArea = ({ targetItem }) => {
   const [helper] = useState(() => {
    return new MoveableHelper();
  });
	const targetRef = useRef(null);
	const containerRef = useRef(null)
	
  return (
    <div className="container">
      <div className="target" ref={targetRef}>
        <img
          width="70"
          height="70"
					src={ targetItem }
          alt=""
        />
      </div>

      <Moveable
        target={targetRef}
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
      />
    </div>
  );
}

export default DropArea