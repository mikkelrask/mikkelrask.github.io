
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `23.2px`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: `680px`,
        padding: `23.2px 17.4px`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          href="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </a>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
