import React from "react"
import { flow, map, flatMap, groupBy, sortBy, filter, reverse } from "lodash/fp"
import styled from "styled-components"
import SEO from "components/SEO"

import { graphql } from "gatsby"

import Layout from "components/Layout"
import Title from "components/Title"
import SeriesList from "components/SeriesList"
import VerticleSpace from "components/VerticalSpace"
import NoContent from "components/NoContent"

import { title, description, siteUrl } from "../../blog-config"

const TagListWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const SeriesPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const series = flow(
    // Flatten posts by series (each post can belong to multiple series)
    flatMap(post => {
      const seriesField = post.frontmatter.series
      if (!seriesField) return []
      
      const seriesArray = Array.isArray(seriesField) ? seriesField : [seriesField]
      return seriesArray.map(seriesName => ({
        ...post.frontmatter,
        series: seriesName,
        slug: post.fields.slug
      }))
    }),
    groupBy("series"),
    map(series => ({
      name: series[0].series,
      posts: series,
      lastUpdated: series[0].date,
    })),
    sortBy(series => new Date(series.lastUpdated)),
    filter(series => series.name),
    reverse
  )(posts)

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />

      <TagListWrapper>
        {series.length > 0 && (
          <Title size="sm">Der er {series.length} blog-serier.</Title>
        )}
      </TagListWrapper>

      {series.length === 0 && <NoContent name="blog-serier" />}

      <VerticleSpace size={32} />

      <SeriesList seriesList={series} />
    </Layout>
  )
}

export default SeriesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
          series
        }
      }
    }
  }
`
