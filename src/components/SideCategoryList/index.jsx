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
  width: 200px;
  height: 100px;
  font-size: 16px;

  @media (max-width: 1079px) {
    display: none;
  }
`

const Title = styled.div`
  margin-bottom: 25px;
  font-weight: bold;
  color: ${props => props.theme.colors.secondaryText};
`

const Category = styled.li`
  margin-bottom: 16px;
  color: ${props => props.theme.colors.tertiaryText};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.text};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`

const SideCategoryList = ({ categories, postCount }) => {
  return (
    <RelativeWrapper>
      <Wrapper>
        <Title>KATEGORIER</Title>
        <ul>
          {_.map(categories, category => (
            <Category key={category.fieldValue}>
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
