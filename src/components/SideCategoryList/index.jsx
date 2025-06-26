import React from "react"
import _ from "lodash"
import styled, { useTheme } from "styled-components"
import { Link } from "gatsby"

const RelativeWrapper = styled.div`
  position: relative;
`

const Wrapper = styled.aside`
  position: absolute;
  left: 112%;
  top: 0px;
  width: 300px;
  height: auto;
  font-size: 16px;

  @media (max-width: 1079px) {
    display: none;
  }
`

const Title = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  font-weight: bold;
  color: ${props => props.theme.colors.secondaryText};
`

const Category = styled.li`
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${props => props.bgColor};
  color: ${props => props.theme.colors.FG};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.selectedTagBackground};
    color: ${props => props.theme.colors.selectedTagText};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`

const SideCategoryList = ({ categories }) => {
  const theme = useTheme()
  const colors = [
    theme.colors.tertiaryText,
    theme.colors.icon,
    theme.colors.spinner,
    theme.colors.hoveredLinkText,
    theme.colors.text,
  ]
  return (
    <RelativeWrapper>
      <Wrapper>
        <Title>Kategorier</Title>
        <ul>
          {_.map(categories, (category, index) => (
            <Category
              key={category.fieldValue}
              bgColor={colors[index % colors.length]}
            >
              <Link to={`/categories?q=${category.fieldValue}`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </Category>
          ))}
        </ul>
      </Wrapper>
    </RelativeWrapper>
  )
}

export default SideCategoryList
