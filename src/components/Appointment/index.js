import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";

// The next step is to use our useVisualMode Hook. The same logic as before determines the initial mode. When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.


export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}/>
      { props.interview  ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        : <Empty />
      }
    </article>
  )
}
