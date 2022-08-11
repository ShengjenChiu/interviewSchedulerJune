import React from "react";
import DayListItem from "components/DayListItem.js";

//the function of the DayList component
export default function DayList(props) {

  //the array of DayList's child DayListItem component
  let dayListItemArr = props.days.map((d) => {
    return (
      <DayListItem 
        key={d.id}
        name={d.name}
        spots={d.spots} 
        selected={d.name === props.value}
        setDay={props.onChange}  
      />
    );
  });


  //the rendering of the DayList component
  return (
    <ul>
      {dayListItemArr}
    </ul>
  );
}