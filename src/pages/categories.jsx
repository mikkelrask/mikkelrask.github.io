import React, { useState, useEffect } from "react"
import _ from "lodash"
import styled from "styled-components"
import SEO from "components/SEO"
import filter from "lodash/filter"

import { graphql, navigate } from "gatsby"

import queryString from "query-string"

import Layout from "components/Layout"
import Title from "components/Title"
import PostList from "components/PostList"
import SideCategoryList from "components/SideCategoryList"
import CategoryTagList from "components/CategoryTagList"

import VerticalSpace from "components/VerticalSpace"

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
      totalCount,
    })),
    ["totalCount"],
  ).reverse()

  // Manually create tags from posts, handling both string and array formats
  const allTags = posts
    .filter(post => post.frontmatter.tags)
    .flatMap(post => {
      const tag = post.frontmatter.tags
      return Array.isArray(tag) ? tag : [tag]
    })

  const tagGroups = _.countBy(allTags)
  const tags = _.sortBy(
    Object.entries(tagGroups).map(([fieldValue, totalCount]) => ({
      fieldValue,
      totalCount,
    })),
    ["totalCount"],
  ).reverse()

  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedTag, setSelectedTag] = useState()
  const [filteredPosts, setFilteredPosts] = useState([])

  let query = null
  if (typeof document !== "undefined") {
    query = document.location.search
  }

  useEffect(() => {
    const { q: categoryQuery, tag: tagQuery } = queryString.parse(query)
    setSelectedCategory(categoryQuery)
    setSelectedTag(tagQuery)
  }, [query])

  useEffect(() => {
    let tempFilteredPosts = posts

    if (selectedCategory) {
      tempFilteredPosts = filter(tempFilteredPosts, post => {
        const postCategories = post.frontmatter.category
        if (!postCategories) return false
        const categoryArray = Array.isArray(postCategories)
          ? postCategories
          : [postCategories]
        return categoryArray.includes(selectedCategory)
      })
    }

    if (selectedTag) {
      tempFilteredPosts = filter(tempFilteredPosts, post => {
        const postTags = post.frontmatter.tags
        if (!postTags) return false
        const tagArray = Array.isArray(postTags) ? postTags : [postTags]
        return tagArray.includes(selectedTag)
      })
    }

    setFilteredPosts(tempFilteredPosts)
  }, [selectedCategory, selectedTag, posts])

  // Filter tags based on selected category
  const filteredTags = selectedCategory
    ? _.sortBy(
        Object.entries(
          _.countBy(
            posts
              .filter(post => {
                const postCategories = post.frontmatter.category
                if (!postCategories) return false
                const categoryArray = Array.isArray(postCategories)
                  ? postCategories
                  : [postCategories]
                return categoryArray.includes(selectedCategory)
              })
              .flatMap(post => {
                const tag = post.frontmatter.tags
                return Array.isArray(tag) ? tag : [tag]
              }),
          ),
        ).map(([fieldValue, totalCount]) => ({
          fieldValue,
          totalCount,
        })),
        ["totalCount"],
      ).reverse()
    : tags

  return (
    <Layout
      sidebar={
        <SideCategoryList
          categories={categories}
          postCount={posts.length}
          selectedCategory={selectedCategory}
          onSelectCategory={category => {
            if (category === selectedCategory) {
              navigate(`/categories?tag=${selectedTag || ""}`)
            } else {
              navigate(`/categories?q=${category}&tag=${selectedTag || ""}`)
            }
          }}
        />
      }
    >
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <CategoryListWrapper>
        {selectedCategory ? (
          <Title size="sm">
            Der er {filteredPosts.length} indlæg i {selectedCategory}.
          </Title>
        ) : (
          <Title size="sm">
            Der er {categories.length} kategor
            {categories.length === 1 ? "i" : "ier"}.
          </Title>
        )}

        <CategoryTagList
          tagList={filteredTags}
          selectedTag={selectedTag}
          onSelectTag={tag => {
            if (tag === selectedTag) {
              navigate(`/categories?q=${selectedCategory || ""}`)
            } else {
              navigate(`/categories?q=${selectedCategory || ""}&tag=${tag}`)
            }
          }}
        />
      </CategoryListWrapper>

      <VerticalSpace size={32} />

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
          date(formatString: "DD. MMMM, YYYY", locale: "da")
          update(formatString: "DD. MMMM, YYYY", locale: "da")
          title
          category
          tags # Fetch tags as well
          description
        }
      }
    }
  }
`