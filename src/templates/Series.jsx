import React from "react"
import { graphql } from "gatsby"

import styled from "styled-components"

import Layout from "components/Layout"
import SEO from "components/SEO"
import PostList from "components/PostList"
import Divider from "components/Divider"

import { description, siteUrl } from "../../blog-config"

const Header = styled.div`
  @media (max-width: 680px) {
    padding: 0px 15px;
  }
`

const Title = styled.h1`
  margin-bottom: 15px;
  line-height: 1.2;
  font-size: 44.8px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  word-break: none;
`

const Subtitle = styled.h3`
  display: inline-block;
  padding: 2px 3px;
  margin-top: 32px;
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.bodyBackground};
  letter-spacing: -1px;
`

const SeriesInform = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${props => props.theme.colors.text};

  & > span {
    margin: 0 3px;
  }
`

const Date = styled.span`
  color: ${props => props.theme.colors.tertiaryText};
  font-weight: lighter;
`

const Series = ({ pageContext, data }) => {
  const seriesName = pageContext.series
  const allPosts = data.posts.nodes

  // Filter posts that belong to this series
  const posts = allPosts.filter(post => {
    const postSeries = post.frontmatter.series
    if (!postSeries) return false
    const seriesArray = Array.isArray(postSeries) ? postSeries : [postSeries]
    return seriesArray.includes(seriesName)
  })

  return (
    <Layout>
      <SEO
        title={`SERIES: ${seriesName}`}
        description={description}
        url={siteUrl}
      />

      <Header>
        <Subtitle> SERIES </Subtitle>
        <Title> {seriesName} </Title>

        <SeriesInform>
          <span>{posts.length} Indlæg</span>
          <span>·</span>
          <Date>
            Sidst opdateret den {posts[posts.length - 1].frontmatter.date}
          </Date>
        </SeriesInform>

        <Divider />
      </Header>

      <PostList postList={posts} />
    </Layout>
  )
}

export default Series

export const pageQuery = graphql`
  query BlogSeriesBySeriesName {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD. MMMM, YYYY", locale: "da")
          update(formatString: "DD. MMMM, YYYY", locale: "da")
          title
          tags
          description
          series
        }
      }
    }
  }
`
