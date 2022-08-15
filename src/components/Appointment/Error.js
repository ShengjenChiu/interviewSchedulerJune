import React from "react";

//the function for the Error component for both Deleting and Saving errors
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <br/>
        <h3 className="text--light">
          {props.message}
        </h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onCancel}
      />
    </main>
  );
}