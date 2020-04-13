import React from 'react';
import classNames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let spots = props.spots;
  const formatSpots = (spots) => {
    return spots === 0 ? 'no spots remaining'
    : spots === 1 ? '1 spot remaining'
    : spots === 2 ? '2 spots remaining'
    : `${spots} spots remaining`
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
    <h3 className={dayClass}>{formatSpots(spots)}</h3>
    </li>
  );
}
