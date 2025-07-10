import React from "react"
import styled from "styled-components"

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding: 80px 20px 0 20px;
  width: 100%;
  max-width: 680px;
  box-sizing: border-box;
`

const Body = React.forwardRef(({ children }, ref) => {
  return <BodyWrapper ref={ref}>{children}</BodyWrapper>
})

export default Body
