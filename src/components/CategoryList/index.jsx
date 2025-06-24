import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const CategoryListWrapper = styled.div`
  margin-bottom: 16px;
  word-break: none;
`

const CategoryLink = styled.div`
  display: inline-block;
  padding: 9.6px 11.2px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 50px;
  background-color: ${props =>
    props.selected
      ? props.theme.colors.selectedTagBackground
      : props.theme.colors.tagBackground};
  color: ${props =>
    props.selected
      ? props.theme.colors.selectedTagText
      : props.theme.colors.tagText};
  text-decoration: none;
  font-size: 14.4px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props =>
      props.selected
        ? props.theme.colors.hoveredSelectedTagBackground
        : props.theme.colors.hoveredTagBackground};
  }
`

const spaceToDash = text => {
  return text.replace(/\s+/g, "-")
}

const CategoryList = ({ categoryList, count, selected }) => {
  if (!categoryList) return null

  if (!count) {
    return (
      <CategoryListWrapper>
        {categoryList.map((category, i) => (
          <Link key={JSON.stringify({ category, i })} to={`/categories?q=${category}`}>
            <CategoryLink>{spaceToDash(category)}</CategoryLink>
          </Link>
        ))}
      </CategoryListWrapper>
    )
  }

  return (
    <CategoryListWrapper>
      {categoryList.map((category, i) => (
        <Link
          key={JSON.stringify({ category, i })}
          to={
            selected === category.fieldValue ? "/categories" : `/categories?q=${category.fieldValue}`
          }
        >
          <CategoryLink selected={category.fieldValue === selected}>
            {spaceToDash(category.fieldValue)} ({category.totalCount})
          </CategoryLink>
        </Link>
      ))}
    </CategoryListWrapper>
  )
}

export default CategoryList