import React, {useState} from "react";
import InterviewerList from '../InterviewerList.js';
import Button from "../Button.js";
 
//the function of the Form component
export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] =useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  //To handle errors of both student and interviewer
  //local save function to pass save function defined in the
  //Appointment component to the Form component
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError('');
    props.onSave(student, interviewer);
  }

  //To reset both student and interviewer
  function reset() {
    setStudent("");
    setInterviewer(null);
  }


  //cancel function to resetting the form and cancel 
  // by the user click the Cancel button
  function cancel() {
    reset();
    props.onCancel();
  }

  //render the Form webpage
  return (
    <main className="appointment__card appointment__card--create">

      <section className="appointment__card-left" >
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"

            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>

        <section className="appointment__validation">
          {error}
        </section>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(interviewer) => setInterviewer(interviewer)}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>

    </main>
  );
}