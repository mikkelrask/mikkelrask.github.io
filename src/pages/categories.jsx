import React, { useState, useEffect } from "react"
import _ from "lodash"
import styled from "styled-components"
import SEO from "components/SEO"
import filter from "lodash/filter"

import { graphql, navigate } from "gatsby"

import queryString from "query-string"

import Layout from "components/Layout"
import Title from "components/Title"
import CategoryList from "components/CategoryList"
import PostList from "components/PostList"
import VerticleSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const CategoryListWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const CategoriesPage = ({ data }) => {
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
      totalCount
    })),
    ["totalCount"]
  ).reverse()

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
      filter(posts, post => {
        const postCategories = post.frontmatter.category
        if (!postCategories) return false
        const categoryArray = Array.isArray(postCategories) ? postCategories : [postCategories]
        return categoryArray.indexOf(selected) !== -1
      })
    )
  }, [selected])

  useEffect(() => {
    const q = queryString.parse(query)["q"]
    setSelected(q)
  }, [query])

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />

      <CategoryListWrapper>
        {selected ? (
          <Title size="sm">
            There are {filteredPosts.length} post
            {filteredPosts.length > 1 && "s"} in {selected}.
          </Title>
        ) : (
          <Title size="sm">
            There are {categories.length} categor{categories.length === 1 ? "y" : "ies"}.
          </Title>
        )}

        <CategoryList
          count
          categoryList={categories}
          selected={selected}
          onClick={category => {
            if (category === selected) {
              navigate("/categories")
            } else setSelected(category)
          }}
        />
      </CategoryListWrapper>

      <VerticleSpace size={32} />

      <PostList postList={filteredPosts} />
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          category
          description
        }
      }
    }
  }
`