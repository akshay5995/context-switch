/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { SocialIcon } from "react-social-icons"

function Footer() {
  const style = { height: 40, width: 40 }
  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return (
          <footer class="footer">
            <div>
              <SocialIcon
                url={`https://www.linkedin.com/in/${social.linkedin}`}
                style={style}
              />
              <SocialIcon
                url={`https://www.twitter.com/${social.twitter}`}
                style={style}
              />
              <SocialIcon
                url={`https://www.github.com/${social.github}`}
                style={style}
              />
            </div>
          </footer>
        )
      }}
    />
  )
}

const socialQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          linkedin
          github
        }
      }
    }
  }
`

export default Footer
