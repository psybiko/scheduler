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

// The next step is to use our useVisualMode Hook. The same logic as before determines the initial mode. When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.


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
        name={props.interview && props.interview.student}
        // interviews array is empty because getAppointmentsForDay isn't implemented yet
        interviewers={[]}
        onSave={props.onSave}
        onCancel={onCancel}
        interviewer={props.interview && props.interview.interviewer}
      />)}
    </article>
  )
}
