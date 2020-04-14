import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "../../index";
import "./styles.scss";


export default function Appointment(props) {
  return (
    <article className="appointment"></article>
  )
}

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true}]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment", () => <Appointment time="12pm"/>)
