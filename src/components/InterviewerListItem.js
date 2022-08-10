import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//the function of the InterviewerListItem component
export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  //the rendering of the InterviewerListItem component
  return (
    <li className={interviewerClass} onClick={props.setInterviewer} selected={props.selected}>
      {
        props.selected ?
        <>
          <img
            className='interviewers__item-image'
            src={props.avatar}
            alt={props.name}
          />
          {props.name}
        </>
        :
        <img
          className='interviewers__item-image'
          src={props.avatar}
          alt={props.name}
        />
      }
    </li>
  );
}