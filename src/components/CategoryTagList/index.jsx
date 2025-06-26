import React from "react"
import _ from "lodash"
import styled from "styled-components"

const Wrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
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

  ${props =>
    props.active &&
    `
    background-color: ${props.theme.colors.selectedTagBackground};
    color: ${props.theme.colors.selectedTagText};
  `}
`

const CategoryTagList = ({ tagList, selectedTag, onSelectTag }) => {
  return (
    <Wrapper>
      <ul>
        {_.map(tagList, tag => (
          <Tag
            key={tag.fieldValue}
            active={tag.fieldValue === selectedTag}
            onClick={() => onSelectTag(tag.fieldValue)}
          >
            {tag.fieldValue} ({tag.totalCount})
          </Tag>
        ))}
      </ul>
    </Wrapper>
  )
}

export default CategoryTagList
