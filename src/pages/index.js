import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Time from "../components/time"
import Layout from "../components/layout"
import SEO from "../components/seo"
import posed from "react-pose"

const List = posed.ul({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 },
})

const Item = posed.li({
  enter: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
})

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Posts" />
        <Bio />
        <List style={{ listStyle: "none" }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Item key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: "0.4375rem",
                  }}
                >
                  <Link
                    style={{
                      boxShadow: `none`,
                      fontSize: "20px",
                      fontWight: "800",
                      color: "#007acc",
                      textDecoration: "none",
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>,{"  "}
                <Time
                  minutes={node.fields.readingTime.minutes}
                  text={node.fields.readingTime.text}
                />
                <p
                  style={{ margin: "0 0 1.75rem 0" }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </Item>
            )
          })}
        </List>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
              minutes
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
