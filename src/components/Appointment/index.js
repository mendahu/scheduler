import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    )

  const onAdd = () => {
    transition(CREATE)
  }

  return (
    <article className="appointment" key={props.id}>
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interview={props.interview}/>
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back}/>
      )}

    </article>
  )
}