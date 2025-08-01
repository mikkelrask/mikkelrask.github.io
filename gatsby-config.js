const blogConfig = require("./blog-config")
const { title, description, author, siteUrl } = blogConfig

module.exports = {
  pathPrefix: "/gatsby-starter-hoodie",
  siteMetadata: {
    title,
    description,
    author,
    siteUrl: siteUrl,
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: "./src/reducers/createStore",
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
          ignoreFunction: true,
        },
        cleanupOnClient: true,
        windowKey: "__PRELOADED_STATE__",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-remark-reading-time",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: title,
        description: description,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ced4da`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/contents/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 680,
              loading: "lazy",
              wrapperStyle: "margin-bottom: 10px;",
              quality: 100,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: true,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: "gatsby-remark-static-images",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          components: "src/components",
          pages: "src/pages",
          utils: "src/utils",
          assets: "src/assets",
          hooks: "src/hooks",
          reducers: "src/reducers",
          templates: "src/templates",
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                // Use frontmatter description if available, fallback to excerpt
                const description =
                  edge.node.frontmatter.description || edge.node.excerpt

                return Object.assign({}, edge.node.frontmatter, {
                  description: description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    frontmatter: {
                      draft: { ne: true }
                    }
                  }
                  sort: {frontmatter: {date: DESC}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date(formatString: "DD. MMMM, YYYY", locale: "da")
                        description
                        draft
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `${title} RSS Feed`,
            match: "^/blog/",
          },
        ],
      },
    },
  ],
}
