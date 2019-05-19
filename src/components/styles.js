import styled from "styled-components"
import { scale } from "../utils/typography"

const Title = styled.h1`
  a {
    color: #888b8d;
    ${scale(1.25)};
    display: table;
    white-space: nowrap;
    &:before,
    &:after {
      border-top: 1px solid #888b8d;
      content: "";
      display: table-cell;
      position: relative;
      top: 0.5em;
      width: 45%;
    }
    &:before {
      right: 1.5%;
    }
    &:after {
      left: 1.5%;
    }
    box-shadow: none;
  }
`

const SecondaryTitle = styled.h1`
  a {
    color: #888b8d;
    ${scale(1 / 2)};
    box-shadow: none;
  }
`

const TextLink = styled.a`
  color: #888b8d;
  text-decoration: none;
  font-style: italic;
  font-weight: 600;
  text-transform: capitalize;
`

const Footer = styled.footer`
  bottom: 0;

  > div {
    display: flex;
    justify-content: space-evenly;
    width: 15em;

    > a {
      box-shadow: none;
    }
  }
  display: table;
  white-space: nowrap;
  &:before,
  &:after {
    border-top: 1px solid #888b8d;
    content: "";
    display: table-cell;
    position: relative;
    top: 0.5em;
    width: 45%;
  }
  &:before {
    right: 1.5%;
  }
  &:after {
    left: 1.5%;
  }
`

const Time = styled.span`
  > span {
    ${scale(-1 / 5)}
  }
`

export { Title, TextLink, SecondaryTitle, Footer, Time }
