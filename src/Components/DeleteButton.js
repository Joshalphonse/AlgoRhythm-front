import React from "react";
// import erase from '../assets/images/eraser.svg'
// import delete1 from '../assets/images/delete.svg'
export default function DeleteBtn(props) {
  //change button to image
  return (
    <div className="DeleteBtn">
      <img
        src={"eraser.svg"}
        className="deleteIcon"
        alt="clear"
        onClick={() => props.clearRow(props.rowIndex)}
        text="clear"
      />
      <img
        src={"delete.svg"}
        className="deleteIcon"
        alt="delete"
        onClick={() => props.deleteRow(props.rowIndex)}
      />
    </div>
  );
}
