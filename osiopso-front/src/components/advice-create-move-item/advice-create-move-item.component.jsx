import { Fragment } from "react"

import Moveable from "react-moveable";
import './drag.styles.css'
import MoveableHelper from "moveable-helper";

import { useState, useRef } from "react";

const MoveItem = ({ item, submitHandler, container }) => {
	const [helper] = useState(() => {
	return new MoveableHelper();
	});

	const targetRef = useRef(null);

	return (
		<Fragment>
			 <div className="target" ref={targetRef} >
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
			/>
			
		</Fragment>
	)
}

export default MoveItem