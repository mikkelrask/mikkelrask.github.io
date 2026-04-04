import React, { useState, useEffect } from "react"

import useOffsetTop from "../../../hooks/useOffsetTop"

import Toc from "./Toc"
import StyledMarkdown from "./StyledMarkdown"

const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" aria-label="Close">&times;</button>
      <img
        src={src}
        alt={alt}
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

const Body = ({ html, children }) => {
  const [toc, setToc] = useState([])
  const [ref, offsetTop] = useOffsetTop()
  const [location, setLocation] = useState({ origin: '', pathname: '' });
  const [copiedHeadingId, setCopiedHeadingId] = useState(null)
  const [hasHydrated, setHasHydrated] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    setHasHydrated(true)
    if (typeof window !== "undefined") {
      setLocation({
        origin: window.location.origin,
        pathname: window.location.pathname
      })
    }
  }, [])

  useEffect(() => {
    if (!hasHydrated) return;

    const articleBody = document.getElementById("article-content")
    if (!articleBody) return

    const headings = articleBody.querySelectorAll("h1, h2, h3, h4, h5, h6")

    headings.forEach(heading => {
      let id = heading.id
      if (!id) {
        id = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-*|-*$/g, "")
        heading.id = id
      }

      if (heading.querySelector(".heading-link-icon")) return

      const headingContent = document.createElement("span")
      headingContent.innerHTML = heading.innerHTML
      headingContent.className = "heading-content"

      const linkIcon = document.createElement("span")
      linkIcon.className = "heading-link-icon"
      linkIcon.innerHTML = "🔗"

      const copiedMessage = document.createElement("span")
      copiedMessage.className = "copied-message"
      copiedMessage.textContent = "Yoink "

      linkIcon.onclick = () => {
        const url = `${location.origin}${location.pathname}#${heading.id}`
        navigator.clipboard.writeText(url).then(() => {
          setCopiedHeadingId(heading.id)
          setTimeout(() => setCopiedHeadingId(null), 1500)
        })
      }

      heading.innerHTML = ""
      heading.appendChild(headingContent)
      linkIcon.appendChild(copiedMessage)
      heading.appendChild(linkIcon)
    })

    const codeBlocks = articleBody.querySelectorAll("pre")
    codeBlocks.forEach(block => {
      if (block.querySelector(".code-copy-button")) return

      const copyButton = document.createElement("button")
      copyButton.className = "code-copy-button"
      copyButton.textContent = "Stjæl"

      copyButton.onclick = () => {
        const textToCopy = block.querySelector("code")?.textContent || block.textContent
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyButton.textContent = "YOINK"
          setTimeout(() => copyButton.textContent = "Stjæl", 2000)
        })
      }

      block.appendChild(copyButton)
    })

    // --- Image Caption Logic & Lightbox ---
    const images = articleBody.querySelectorAll("img")
    images.forEach(img => {
      // Skip already processed or specifically excluded
      if (img.classList.contains("header-logo") || img.closest("figure")) return

      // Skip images that are inside an anchor tag (links to other sites)
      if (img.closest("a")) return

      // Add lightbox click handler
      img.style.cursor = "zoom-in"
      img.onclick = () => {
        setLightbox({ src: img.src, alt: img.alt })
      }

      const alt = img.getAttribute("alt")
      if (alt && alt.trim().length > 0 && !alt.includes("profile")) {
        const figure = document.createElement("figure")
        const figcaption = document.createElement("figcaption")
        figcaption.textContent = alt

        // If image is inside a P tag that only has the image, replace the P tag
        const parent = img.parentNode
        if (parent && parent.tagName === "P" && parent.childNodes.length === 1) {
          parent.parentNode.insertBefore(figure, parent)
          figure.appendChild(img)
          figure.appendChild(figcaption)
          parent.remove()
        } else {
          img.parentNode.insertBefore(figure, img)
          figure.appendChild(img)
          figure.appendChild(figcaption)
        }
      }
    })

    setToc(
      Array.from(articleBody.querySelectorAll("h2, h3")).map(heading => ({
        id: heading.id,
        tagName: heading.tagName,
        innerText: heading.querySelector(".heading-content")?.textContent || heading.textContent,
      })),
    )
  }, [html, children, location, copiedHeadingId, hasHydrated])

  useEffect(() => {
    const articleBody = document.getElementById("article-content")
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
    <div className="article-body-wrapper">
      <Toc items={toc} articleOffset={offsetTop} />

      <StyledMarkdown
        id="article-content"
        className="styled-markdown"
        dangerouslySetInnerHTML={html ? { __html: html } : undefined}
        itemProp="articleBody"
        ref={ref}
      >
        {children}
      </StyledMarkdown>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}

export default Body
