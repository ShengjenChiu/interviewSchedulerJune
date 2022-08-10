import React from "react";
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";

//the function of the InterviewerList component
//Object.values(props.interviewers);
export default function InterviewerList(props) {

const intArr = props.interviewers;

  //the array of InterviewerList's child InterviewerListItem component
  const interviewersArr = intArr.map(_interviewer => {
    return (
      <InterviewerListItem
        key={_interviewer.id}
        name={_interviewer.name} 
        avatar={_interviewer.avatar} 
        selected={_interviewer.id === props.value}
        setInterviewer={() => props.onChange(_interviewer.id)}  
      />
    );
  });
  
  //the rendering of the InterviewerList component
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersArr}
      </ul>
    </section>
  
  );
}