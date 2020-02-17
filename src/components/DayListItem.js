import React from "react";

import "components/DayListItem.scss";

const classNames = require("classnames");

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  })

  const formatSpots = (spots) => {
    const remSpots = spots || "no"
    const appSpotText = (spots === 1) ? "" : "s"
    return remSpots + " spot" + appSpotText + " remaining";
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}