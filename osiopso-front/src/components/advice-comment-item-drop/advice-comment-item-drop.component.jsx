import MoveItem from "../advice-create-move-item/advice-create-move-item.component";

const DropArea = ({ targetItem }) => {
  return (
    <div className="container">
      {
        targetItem.map((item, idx) => {
          return <MoveItem key={idx} item={ item} />
        })
      }
    </div>
  );
}

export default DropArea