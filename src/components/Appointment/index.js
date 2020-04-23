import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };

  const onCancel = () => {
    transition(back);
  };

  // confirmation to cancel the interview
  const onConfirm = () => {
 
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  };

// fires the confirm form when clicked 
  const cancel = () => {
    transition(CONFIRM);
  };

 // Function that saves the interview
 const save = (name, interviewer) => {
   const interview = {
     student: name,
     interviewer
   };
 
   transition(SAVING);
 
   props
     .bookInterview(props.id, interview)
     .then(() => transition(SHOW))
     .catch(error => transition(ERROR_SAVE, true));
 }


 const edit = () => {
  transition(EDIT)
};


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={cancel}
        />
      )}

      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
      />)}

      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
      />
      )}

      {mode === SAVING && <Status 
        message="Saving"
      />}

      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={onConfirm} onCancel={onCancel} />}
      
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === ERROR_SAVE && <Error message = 'Sorry could not save' onClose={onCancel}/>}
      {mode === ERROR_DELETE && <Error message = 'Sorry could not delete' onClose={onCancel}/>}
      

    </article>
  )
}
