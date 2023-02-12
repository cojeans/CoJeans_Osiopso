import MoveItem from "../advice-create-move-item/advice-create-move-item.component";
import { useRef, useState } from "react";
const DropArea = ({ targetItem }) => {
  const [submitHandler, setSubmitHandler] = useState(false)
  const container = useRef(null)
  return (
    <div className="container" ref={container }>
      {
        targetItem.map((item, idx) => {
          return <MoveItem key={idx} item={item} submitHandler={submitHandler} container={ container} />
        })
      }
      			<button onClick={()=>setSubmitHandler(true)}>제출</button>

    </div>
  );
}

export default DropArea