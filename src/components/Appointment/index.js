import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DEL = "ERROR_DEL";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //transitions to create form
  const onAdd = () => {
    transition(CREATE);
  };

  //transitions to Show or Error states depending on whether db save is successful
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
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  };

  //Transitions to edit visual state
  const edit = () => {
    transition(EDIT);
  };

  //transitions to confirm
  const confirm = () => {
    transition(CONFIRM);
  };

  //transitons to empty or error depending on if delete action is success
  const deleteApp = () => {

    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then((val) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DEL, true);
      });
  };

  return (
    <article className="appointment" key={props.id} data-testid="appointment">
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
      {mode === ERROR_SAVE && (
        <Error message="Error saving." onClose={back}/>
      )}
      {mode === ERROR_DEL && (
        <Error message="Error deleting." onClose={back}/>
      )}

    </article>
  );
}