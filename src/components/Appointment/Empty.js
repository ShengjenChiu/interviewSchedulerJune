import React from "react";

//the function for the Empty component
export default function Empty(props) {
  //onClick={props.onClick}
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}