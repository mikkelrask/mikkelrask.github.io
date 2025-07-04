import React from "react"
import styled from "styled-components"

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding-top: 80px;
  max-width: 680px;
`

const Body = React.forwardRef(({ children }, ref) => {
  return <BodyWrapper ref={ref}>{children}</BodyWrapper>
})

export default Body
