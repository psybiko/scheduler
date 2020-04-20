import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
   transition(CREATE);
 };

 const onCancel = () => {
   transition(EMPTY);
 };

 // Function that saves the interview
 function save(name, interviewer) {
   const interview = {
     student: name,
     interviewer
   };
  props.bookInterview(props.id, interview);
  transition(SHOW);
 }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
        // interviewer={props.interview && props.interview.interviewer}
      />)}
    </article>
  )
}
