import React from "react"
import styled, { css } from "styled-components"

import useScroll from "hooks/useScroll"

const STICK_OFFSET = 100

const StickySidecarWrapper = styled.div`
  position: absolute;
  opacity: 1;
  left: calc(50% + 340px); // Positioned relative to the center of the viewport

  & > div {
    padding-right: 20px;
    padding-left: 16px;
    // Removed margin-left
    position: relative;
    width: 260px; // Corrected to 260px
    max-height: calc(100% - 185px);
    overflow: hidden;

    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.scrollTrack};
    }

    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.scrollHandle};
    }

    ${props =>
      props.$stick &&
      css`
        position: fixed;
        top: ${STICK_OFFSET}px;
      `}
  }
`

const StickySidecar = ({ children, offsetTop }) => {
  const { y } = useScroll()

  return (
    <StickySidecarWrapper $stick={y > offsetTop - STICK_OFFSET}>
      <div>{children}</div>
    </StickySidecarWrapper>
  )
}

export default StickySidecar
