import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Title from "components/Title"
import Divider from "components/Divider"
import TagList from "components/TagList"

const StyledCategoryLink = styled(Link)`
  color: ${props => props.theme.colors.linkText};
  &:hover {
    color: ${props => props.theme.colors.hoveredLinkText};
  }
`
const PostListWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const PostWrapper = styled.div`
  position: relative;
  top: 0;
  transition: all 0.5s;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`

const Date = styled.p`
  margin-bottom: 16px;
  font-size: 14.4px;
  color: ${props => props.theme.colors.tertiaryText};
`

const Excerpt = styled.p`
  margin-bottom: 32px;
  line-height: 1.7;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
  word-break: none;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const PostList = ({ postList }) => {
  const [postCount, setPostCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [postCount, postList])

  useEffect(() => {
    setPostCount(10)
  }, [postList])

  return (
    <PostListWrapper>
      {postList.slice(0, postCount).map((post, i) => {
        const { title, tags, description, frontpageImage, image } =
          post.frontmatter
        const { excerpt } = post
        const { slug } = post.fields

        const postExcerpt = description || excerpt

        const gatsbyImage = getImage(image)

        return (
          <>
            <PostWrapper>
              <Title size="bg">
                <Link to={slug}>{title}</Link>
              </Title>
              <Date>
                {" "}
                {post.frontmatter.date}{" "}
                {post.frontmatter.update &&
                  `(Opdateret: ${post.frontmatter.update})`}
                {post.frontmatter.category && (
                  <>
                    {" | "}
                    {Array.isArray(post.frontmatter.category)
                      ? post.frontmatter.category.map((category, index) => (
                          <React.Fragment key={category}>
                            <StyledCategoryLink to={`/categories?q=${category}`}>
                              {category}
                            </StyledCategoryLink>
                            {index < post.frontmatter.category.length - 1 && ", "}
                          </React.Fragment>
                        ))
                      : <StyledCategoryLink to={`/categories?q=${post.frontmatter.category}`}>
                          {post.frontmatter.category}
                        </StyledCategoryLink>
                    }
                  </>
                )}
                {post.fields.readingTime && ` | Læsetid: ${Math.round(post.fields.readingTime.minutes)} min.`}
              </Date>
              {frontpageImage && gatsbyImage && (
                <Link to={slug}>
                  <GatsbyImage
                    key={slug}
                    image={gatsbyImage}
                    alt={title}
                    style={{ marginBottom: "16px" }}
                  />
                </Link>
              )}
              <Excerpt>{postExcerpt}</Excerpt>
              <TagList tagList={tags} />
            </PostWrapper>

            {postCount - 1 !== i && postList.length - 1 !== i && (
              <Divider mt="48px" mb="32px" />
            )}
          </>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList
