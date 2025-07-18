import React, { useState, useCallback } from "react"
import styled from "styled-components"
import SEO from "components/SEO"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import PostList from "components/PostList"
import TextField from "components/TextField"
import Title from "components/Title"
import VerticalSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const SearchWrapper = styled.div`
  margin-top: 20px;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const Search = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  const [query, setQuery] = useState("")

  const filteredPosts = useCallback(
    posts.filter(post => {
      const { frontmatter, rawMarkdownBody } = post
      const { title, description } = frontmatter
      const lowerQuery = query.toLocaleLowerCase()

      // Search in markdown body
      if (rawMarkdownBody.toLocaleLowerCase().includes(lowerQuery)) return true

      // Search in title
      if (title.toLocaleLowerCase().includes(lowerQuery)) return true

      // Search in description if it exists
      if (description && description.toLocaleLowerCase().includes(lowerQuery))
        return true

      return false
    }),
    [query],
  )

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <SearchWrapper>
        <Title size="sm">
          Der er {filteredPosts.length} indlæg{filteredPosts.length > 1 && ""}.
        </Title>
        <TextField
          onChange={e => setQuery(e.target.value)}
          placeholder="Search"
        />
      </SearchWrapper>
      <VerticalSpace size={70} />
      <PostList postList={filteredPosts} />
    </Layout>
  )
}

export default Search

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD. MMMM, YYYY", locale: "da")
          title
          tags
          description
          draft
        }
        rawMarkdownBody
      }
    }
  }
`
