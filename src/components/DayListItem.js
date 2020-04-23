import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const formatSpots = () => {
    return props.spots === 0 ? 'no spots remaining'
    : props.spots === 1 ? '1 spot remaining'
    : `${props.spots} spots remaining`
  }

  let dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected === true,
    'day-list__item--full': props.spots === 0
 });

  return (
    <li
    className={dayClass}
    onClick={() => props.setDay(props.name)}>
    <h2 className={dayClass}>{props.name}</h2>
    <h3 className={dayClass}>{formatSpots()}</h3>
    </li>
  );
}
