import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem"

const classNames = require("classnames");

export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((i) => <InterviewerListItem 
            key={i.id}
            name={i.name}
            avatar={i.avatar}
            selected={i.id === props.interviewer}
            setInterviewer={() => props.setInterviewer(i.id)}
          />)}
      </ul>
    </section>
  )
}