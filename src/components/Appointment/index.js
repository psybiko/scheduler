import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";


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
  );

  const onAdd = () => {
   transition(CREATE);
 };

 const onCancel = () => {
   transition(back);
 };

 const onConfirm = (name, interviewer) => {
    const interview = {
       student: name,
       interviewer
    }

    transition(CONFIRM);
    transition(DELETING);
    props.cancelInterview(props.id, interview)
    setTimeout(()=>{
     transition(EMPTY)},1000)
};

// fires the confirm form when clicked 
  const cancel = () => {
    transition(CONFIRM);
  }


 // Function that saves the interview
 function save(name, interviewer) {
   const interview = {
     student: name,
     interviewer
   };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  setTimeout(()=>{
    transition(SHOW)},1000)
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
        // interviewer={props.interview && props.interview.interviewer}
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
      

    </article>
  )
}
