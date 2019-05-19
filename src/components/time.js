import React, { Fragment } from "react"
import { Time as StyledTime } from "./styles"

const generateCups = number => {
  const cup = `☕ `
  const numberOfCups = Math.ceil(Math.ceil(number) / 10)
  let cups = []
  for (let i = 0; i < Math.ceil(numberOfCups); i++) {
    cups.push(<Fragment key={i}>{cup}</Fragment>)
  }
  return cups
}

function Time({ minutes, text }) {
  return (
    <StyledTime>
      <span> {text} </span>
      {generateCups(minutes)}
    </StyledTime>
  )
}

export default Time
