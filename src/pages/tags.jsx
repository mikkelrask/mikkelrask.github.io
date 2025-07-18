import React, { useState, useEffect } from "react"
import _ from "lodash"
import styled from "styled-components"
import SEO from "components/SEO"
import filter from "lodash/filter"

import { graphql, navigate } from "gatsby"

import queryString from "query-string"

import Layout from "components/Layout"
import Title from "components/Title"
import TagList from "components/TagList"
import PostList from "components/PostList"
import VerticleSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const TagListWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 680px) {
    padding: 0 15px;
  }
`

const TagsPage = ({ data }) => {
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse()
  const posts = data.allMarkdownRemark.nodes

  const [selected, setSelected] = useState()
  const [filteredPosts, setFilteredPosts] = useState([])

  let query = null
  if (typeof document !== "undefined") {
    query = document.location.search
  }

  useEffect(() => {
    if (!selected) {
      setFilteredPosts(posts)
      return
    }

    setFilteredPosts(
      filter(posts, post => post.frontmatter.tags.indexOf(selected) !== -1),
    )
  }, [selected])

  useEffect(() => {
    const q = queryString.parse(query)["q"]
    setSelected(q)
  }, [query])

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />

      <TagListWrapper>
        {selected ? (
          <Title size="sm">
            Der er {filteredPosts.length} indlæg, der matcher #{selected}.
          </Title>
        ) : (
          <Title size="sm">Der er {tags.length} nørd-tags - go nuts 🤓</Title>
        )}

        <TagList
          count
          tagList={tags}
          selected={selected}
          onClick={tag => {
            if (tag === selected) {
              navigate("/tags")
              alert("zz")
            } else setSelected(tag)
          }}
        />
      </TagListWrapper>

      <VerticleSpace size={32} />

      <PostList postList={filteredPosts} />
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
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
        }
      }
    }
  }
`
