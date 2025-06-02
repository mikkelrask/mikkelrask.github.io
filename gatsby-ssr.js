/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="plausible-script"
      defer
      data-domain="mikkelrask.github.io"
      src="https://analytics.tmsgv.xyz/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
    ></script>,
    <script
      key="plausible-function"
      dangerouslySetInnerHTML={{
        __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
      }}
    ></script>,
  ])
}
