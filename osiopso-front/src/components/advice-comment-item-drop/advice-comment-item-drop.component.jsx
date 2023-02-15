import MoveItem from "../advice-create-move-item/advice-create-move-item.component";
import { useRef } from "react";
import { ItemDropContainer } from "./advice-comment-item-drop.styles";

const DropArea = ({ targetItem }) => {
  const container = useRef(null)
  return (
    <ItemDropContainer ref={container}>
      {
        targetItem.map((item, idx) => {
          return <MoveItem key={idx} item={item} />
        })
      }

    </ItemDropContainer>
  );
}

export default DropArea