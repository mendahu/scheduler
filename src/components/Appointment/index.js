import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "../../hooks/useVisualMode"
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  const edit = () => {
    transition(EDIT)
  }

  const confirm = () => {
    transition(CONFIRM)
  }

  const deleteApp = () => {

    transition(DELETING)

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
  }

  return (
    <article className="appointment" key={props.id}>
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interview={props.interview} onEdit={edit} onDelete={confirm}/>
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
      {mode === DELETING && (
        <Status message="Deleting..."/>
      )}
      {mode === CONFIRM && (
        <Confirm message="Are you sure you want to delete?" onConfirm={deleteApp} onCancel={back}/>
      )}
      {mode === EDIT && (
        <Form 
        onSave={save} 
        interviewers={props.interviewers} 
        onCancel={back}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />
      )}

    </article>
  )
}