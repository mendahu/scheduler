import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "../../hooks/useVisualMode"
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    )

  const onAdd = () => {
    transition(CREATE)
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    console.log("on save", interview)

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })

  }

  return (
    <article className="appointment" key={props.id}>
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interview={props.interview}/>
      )}
      {mode === CREATE && (
        <Form 
          onSave={save} 
          interviewers={props.interviewers} 
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving..."/>
      )}

    </article>
  )
}