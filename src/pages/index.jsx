import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import SEO from "components/SEO"
import Bio from "components/Bio"
import PostList from "components/PostList"
import SideTagList from "components/SideTagList"
import Divider from "components/Divider"
import VerticalSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse()

  if (posts.length === 0) {
    return (
      <p>
        Ingen blogs fundet. Se [raske.xyz](https://raske.xyz) eller
        [@raske.xyz](https://instagram.com/raske.xyz).
      </p>
    )
  }

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <Bio />
      <Divider />
      <SideTagList tags={tags} postCount={posts.length} />
      <PostList postList={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
          description
          draft
        }
      }
    }
  }
`
