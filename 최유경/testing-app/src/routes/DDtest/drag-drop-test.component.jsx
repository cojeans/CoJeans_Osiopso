import * as React from "react";
import Moveable from "react-moveable";

import './drag.styles.css'

import MoveableHelper from "moveable-helper";

// In order to use only some able, make a component with makeMoveable function.
// const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
//   Draggable,
//   Scalable,
//   Rotatable
// ]);

export default function TreeShakingApp() {
  const [helper] = React.useState(() => {
    return new MoveableHelper();
  });
  const targetRef = React.useRef(null);
  return (
    <div className="container">
      <div className="target" ref={targetRef}>
        <img
          width="320"
          height="240"
          src="https://picsum.photos/320/240
"
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
