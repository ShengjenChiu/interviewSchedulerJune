import React from "react";

//the function of the Status component
export default function Status(props) {
  
  //the rendering of the Status component for both Saving and Deleting
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}