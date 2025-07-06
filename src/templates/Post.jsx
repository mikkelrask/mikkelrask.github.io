import React from "react"
import SEO from "components/SEO"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Article from "components/Article"

import { siteUrl } from "../../blog-config"

const Post = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next, seriesList } = data
  const { title, date, update, tags, image, description } = post.frontmatter
  const imageUrl = image.childImageSharp.gatsbyImageData.images.fallback.src
  const { excerpt } = post
  const { readingTime, slug } = post.fields

  // Use description from frontmatter if available, fallback to excerpt
  const seoDescription = description || excerpt

  let filteredSeries = []
  const firstSeries = pageContext.series
  if (firstSeries && seriesList && seriesList.edges) {
    // Filter series posts that belong to the same series as the current post
    const relevantSeriesPosts = seriesList.edges.filter(edge => {
      const postSeries = edge.node.frontmatter.series
      if (!postSeries) return false
      const seriesArray = Array.isArray(postSeries) ? postSeries : [postSeries]
      return seriesArray.includes(firstSeries)
    })

    filteredSeries = relevantSeriesPosts.map(seriesPost => {
      if (seriesPost.node.id === post.id) {
        return {
          ...seriesPost.node,
          currentPost: true,
        }
      } else {
        return {
          ...seriesPost.node,
          currentPost: false,
        }
      }
    })
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={seoDescription}
        url={`${siteUrl}${slug}`}
        image={imageUrl}
      />
      <Article>
        <Article.Header
          title={title}
          date={date}
          update={update}
          tags={tags}
          minToRead={Math.round(readingTime.minutes)}
        />
        {filteredSeries.length > 0 && (
          <Article.Series header={firstSeries} series={filteredSeries} />
        )}
        <Article.Body html={post.html} />
        <Article.Footer previous={previous} next={next} />
      </Article>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200, truncate: true)
      html
      frontmatter {
        title
        date(formatString: "DD. MMMM, YYYY", locale: "da")
        update(formatString: "DD. MMMM, YYYY", locale: "da")
        tags
        category
        series
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1200)
          }
        }
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
    seriesList: allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            series
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
