import React from "react";

//the function of the Show component
export default function Show(props) {

  // const getInterviewerName = function(id) {
  //   if(id === props.interviewer) {
  //     return props.interviewers[id].name;
  //   }
  // }





//{props.student}
  //{getInterviewerName(props.interviewer)}
  //the rendering of the Show component
  return (
    <main className="appointment__card appointment__card--show">

      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{Object.values(props.interviewer)}</h3>

{console.log('--Show--')}
{console.log(props.interviewer.name)}
{console.log('--Show--')}


        </section>
      </section>



      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            // onClick={props.onEdit}
            onClick={props.onEdit}

          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            // onClick={props.onDelete}
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}