import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useLocation } from "@reach/router"

import useOffsetTop from "hooks/useOffsetTop"

import Toc from "./Toc"
import StyledMarkdown from "./StyledMarkdown"

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 112px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  // Apply flexbox to headings to align text and icon
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: flex;
    align-items: center;
    position: relative; /* For positioning the copied message */
  }

  .heading-link-icon {
    margin-left: 0.5em;
    font-size: 0.8em;
    cursor: default;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  h1:hover .heading-link-icon,
  h2:hover .heading-link-icon,
  h3:hover .heading-link-icon,
  h4:hover .heading-link-icon,
  h5:hover .heading-link-icon,
  h6:hover .heading-link-icon {
    opacity: 1;
  }

  .copied-message {
    position: absolute;
    left: 50%; /* Center horizontally relative to parent */
    bottom: 100%; /* Position above the icon */
    transform: translateX(-50%); /* Adjust to center relative to icon */
    background-color: #3b4261; /* Darker background from Tokyo Night */
    color: #7aa2f7; /* Tokyo Night blue */
    padding: 0.2em 0.5em;
    border-radius: 4px;
    font-size: 0.75em;
    
    opacity: 0;
    transition:
      opacity 0.3s ease-in-out,
      bottom 0.3s ease-in-out; /* Transition bottom as well */
    pointer-events: none;
    z-index: 10; /* Ensure it's above other content */
  }

  .copied-message.show {
    opacity: 1;
    bottom: calc(100% + 0.5em); /* Move slightly further up */
  }

  .copied-message.show {
    opacity: 1;
  }
`

const Body = ({ html }) => {
  const [toc, setToc] = useState([])
  const [ref, offsetTop] = useOffsetTop()
  const location = useLocation()
  const [copiedHeadingId, setCopiedHeadingId] = useState(null)

  useEffect(() => {
    const articleBody = document.getElementById("article-body")
    if (!articleBody) return

    const headings = articleBody.querySelectorAll("h1, h2, h3, h4, h5, h6")

    headings.forEach(heading => {
      let id = heading.id
      if (!id) {
        // Fallback: If no ID, generate one from text content
        id = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-*|-*$/g, "")
        heading.id = id // Assign the generated ID
      }

      // Check if icon already exists to prevent duplicates on re-renders
      if (heading.querySelector(".heading-link-icon")) {
        return
      }

      // Create a wrapper for the heading content
      const headingContent = document.createElement("span")
      headingContent.innerHTML = heading.innerHTML
      headingContent.className = "heading-content"

      const linkIcon = document.createElement("span")
      linkIcon.className = "heading-link-icon"
      linkIcon.innerHTML = "🔗" // Link symbol
      linkIcon.style.cursor = "default"
      linkIcon.style.position = "relative" // Make it a positioning context for the tooltip

      const copiedMessage = document.createElement("span")
      copiedMessage.className = "copied-message"
      copiedMessage.textContent = "Yoink "

      linkIcon.onclick = () => {
        const url = `${location.origin}${location.pathname}#${heading.id}`
        navigator.clipboard
          .writeText(url)
          .then(() => {
            setCopiedHeadingId(heading.id)
            setTimeout(() => {
              setCopiedHeadingId(null)
            }, 1500) // Hide after 1.5 seconds
          })
          .catch(err => {
          })
      }

      // Clear existing content and append new elements
      heading.innerHTML = ""
      heading.appendChild(headingContent)
      linkIcon.appendChild(copiedMessage) // Append message inside the icon
      heading.appendChild(linkIcon)

      // Add a class to the heading for relative positioning
      heading.classList.add("heading-wrapper")
    })

    // Existing TOC logic - now runs after headings are modified
    setToc(
      Array.from(articleBody.querySelectorAll("h2, h3")).map(heading => ({
        tagName: heading.tagName,
        innerText: heading.querySelector(".heading-content").textContent,
      })),
    )
  }, [html, location, copiedHeadingId])

  // This useEffect is now only for showing/hiding the copied message
  useEffect(() => {
    const articleBody = document.getElementById("article-body")
    if (!articleBody) return

    const headings = articleBody.querySelectorAll("h1, h2, h3, h4, h5, h6")
    headings.forEach(heading => {
      const message = heading.querySelector(".copied-message")
      if (message) {
        if (heading.id === copiedHeadingId) {
          message.classList.add("show")
        } else {
          message.classList.remove("show")
        }
      }
    })
  }, [copiedHeadingId])

  return (
    <Wrapper>
      <Toc items={toc} articleOffset={offsetTop} />

      <StyledMarkdown
        id="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
        ref={ref}
      />
    </Wrapper>
  )
}

export default Body
