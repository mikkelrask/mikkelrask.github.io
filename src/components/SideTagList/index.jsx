import React from "react"
import _ from "lodash"
import styled from "styled-components"
import { Link } from "gatsby"

const RelativeWrapper = styled.div`
  position: relative;
`

const Wrapper = styled.aside`
  position: absolute;
  left: 112%;
  top: 0px;
  width: 250px;
  height: auto;
  font-size: 16px;

  @media (max-width: 1079px) {
    display: none;
  }
`

const Title = styled.div`
  margin-top: 25px;
  font-weight: bold;
  color: ${props => props.theme.colors.secondaryText};
`

const Tag = styled.li`
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.tagBackground};
  color: ${props => props.theme.colors.tagText};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.hoveredTagBackground};
    color: ${props => props.theme.colors.selectedTagText};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`

const SideTagList = ({ tags, postCount }) => {
  return (
    <RelativeWrapper>
      <Wrapper>
        <Title>Tags</Title>
        <ul>
          <Tag>
            <Link to="/tags">alle ({postCount})</Link>
          </Tag>
          {_.map(tags, tag => (
            <Tag>
              <Link to={`/tags?q=${tag.fieldValue}`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </Tag>
          ))}
        </ul>
      </Wrapper>
    </RelativeWrapper>
  )
}

export default SideTagList
