import React, { useState, useEffect } from "react"
import useScroll from "hooks/useScroll"
import getElementOffset from "utils/getElmentOffset"

const STICK_OFFSET = 100

const Toc = ({ items, articleOffset }) => {
  const { y } = useScroll()

  const [revealAt, setRevealAt] = useState(4000)
  const [headers, setHeaders] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const bioElm = document.getElementById("bio")
    if (bioElm) {
      setRevealAt(
        getElementOffset(bioElm).top - bioElm.getBoundingClientRect().height - 400
      )
    }
  }, [])

  useEffect(() => {
    setHeaders(
      [
        ...document.querySelectorAll("#article-content h2, #article-content h3"),
      ].map(element => getElementOffset(element).top)
    )
  }, [items])

  useEffect(() => {
    headers.forEach((header, i) => {
      if (header - 300 < y) {
        setActive(i)
      }
    })
  }, [y, headers])

  const handleClickTitle = index => {
    const element = document.querySelectorAll("#article-content h2, #article-content h3")[index]
    if (element) {
      const top = getElementOffset(element).top;
      window.scrollTo({ top: top - 100, behavior: "smooth" })
    }
  }

  const isSticky = y > articleOffset - STICK_OFFSET;

  const reveal = y < revealAt;
  
  return (
    <div 
      className={`toc-wrapper`} 
      style={{ 
        opacity: reveal ? 1 : 0, 
        transition: '0.35s all ease',
        pointerEvents: reveal ? 'auto' : 'none'
      }}
    >
      <div className={`toc-inner ${isSticky ? 'sticky' : ''}`}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`paragraph-title ${item.tagName === "H3" ? 'subtitle' : ''} ${i === active ? 'active' : ''}`}
            onClick={() => handleClickTitle(i)}
          >
            {item.innerText}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Toc
