import React from 'react';
import InterviewerListItem from './InterviewerListItem.js';

import './InterviewerList.scss';

export default function InterviewerList(props) {

  const list = props.interviewers.map(item => {
    return (
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === props.value}
      setInterviewer={() => props.onChange(item.id)}
    />
    )
  });


  return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{list}</ul>
  </section>
)
}
