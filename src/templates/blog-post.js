import React from "react"
import { Link, graphql } from "gatsby"

import MailChipForm from "../components/mailChimpForm"
import Layout from "../components/layout"
import Time from "../components/time"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1 className="blog-title">{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `flex`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          <span class="date">
            {post.frontmatter.date},{"  "}
          </span>
          <Time
            minutes={post.fields.readingTime.minutes}
            text={post.fields.readingTime.text}
          />
        </p>
        <div
          style={{ lineHeight: "1.7" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <MailChipForm />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        slug
        readingTime {
          text
          minutes
        }
      }
    }
  }
`
