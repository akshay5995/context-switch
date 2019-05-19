import React from "react"
import { Link } from "gatsby"
import { Title, SecondaryTitle } from "./styles"
import { rhythm } from "../utils/typography"
import Footer from "./footer"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <Title>
          <Link to={`/`}>{title}</Link>
        </Title>
      )
    } else {
      header = (
        <SecondaryTitle>
          <Link to={`/`}>{title}</Link>
        </SecondaryTitle>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
