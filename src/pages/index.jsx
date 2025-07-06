import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import SEO from "components/SEO"
import Bio from "components/Bio"
import PostList from "components/PostList"
import SideCategoryList from "components/SideCategoryList"
import Divider from "components/Divider"
import VerticalSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  // Manually create categories from posts, handling both string and array formats
  const allCategories = posts
    .filter(post => post.frontmatter.category)
    .flatMap(post => {
      const category = post.frontmatter.category
      return Array.isArray(category) ? category : [category]
    })

  const categoryGroups = _.countBy(allCategories)
  const categories = _.sortBy(
    Object.entries(categoryGroups).map(([fieldValue, totalCount]) => ({
      fieldValue,
      totalCount,
    })),
    ["totalCount"],
  ).reverse()

  if (posts.length === 0) {
    return (
      <p>
        Ingen blogs fundet. Se [raske.xyz](https://raske.xyz) eller
        [@raske.xyz](https://instagram.com/raske.xyz).
      </p>
    )
  }

  return (
    <Layout
      sidebar={
        <SideCategoryList categories={categories} postCount={posts.length} />
      }
    >
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <Bio />
      <Divider />
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
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
          readingTime {
            minutes
          }
        }
        frontmatter {
          date(formatString: "DD. MMMM, YYYY", locale: "da")
          update(formatString: "DD. MMMM, YYYY", locale: "da")
          title
          tags
          category
          description
          draft
          frontpageImage
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
