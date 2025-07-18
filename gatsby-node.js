const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postTemplate = require.resolve(`./src/templates/Post.jsx`)
  const seriesTemplate = require.resolve(`./src/templates/Series.jsx`)

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: ASC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            series
            draft
          }
        }
      }
      tagsGroup: allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        limit: 2000
      ) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
      categoriesGroup: allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        limit: 2000
      ) {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    )
    return
  }

  const posts = result.data.postsRemark.nodes
  const series = _.reduce(
    posts,
    (acc, cur) => {
      const seriesField = cur.frontmatter.series
      if (seriesField) {
        const seriesArray = Array.isArray(seriesField)
          ? seriesField
          : [seriesField]
        const newSeries = seriesArray.filter(
          seriesName => !_.includes(acc, seriesName),
        )
        return [...acc, ...newSeries]
      }
      return acc
    },
    [],
  )

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          id: post.id,
          series: post.frontmatter.series
            ? Array.isArray(post.frontmatter.series)
              ? post.frontmatter.series[0]
              : post.frontmatter.series
            : null,
          allSeries: post.frontmatter.series
            ? Array.isArray(post.frontmatter.series)
              ? post.frontmatter.series
              : [post.frontmatter.series]
            : [],
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  if (series.length > 0) {
    series.forEach(singleSeries => {
      const path = `/series/${_.replace(singleSeries, /\s/g, "-")}`
      createPage({
        path,
        component: seriesTemplate,
        context: {
          series: singleSeries,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    const newSlug = `/${slug.split("/").reverse()[1]}/`

    createNodeField({
      node,
      name: `slug`,
      value: newSlug,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter!
  }
  type Frontmatter {
    title: String!
    description: String
    tags: [String!]!
    category: [String!]
    series: JSON
    draft: Boolean
    frontpageImage: Boolean
  }
  `
  createTypes(typeDefs)
}
