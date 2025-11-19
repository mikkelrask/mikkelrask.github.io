import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"

import { useSelector, useDispatch } from "react-redux"
import { setLight, setDark } from "reducers/theme"

import { light, dark } from "assets/theme"

import GlobalStyles from "components/GlobalStyles"
import StickySidecar from "components/StickySidecar"
import useOffsetTop from "hooks/useOffsetTop"

import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"

const Layout = ({ children, sidebar }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)
  const [ref, offsetTop] = useOffsetTop()

  let isSystemDarkMode = null
  if (typeof window !== "undefined") {
    isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  let localTheme = null
  if (typeof window !== "undefined" && window.localStorage) {
    localTheme = localStorage.getItem("theme")
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    dispatch(nextTheme === "dark" ? setDark : setLight)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", nextTheme)
    }
  }

  useEffect(() => {
    if (isSystemDarkMode && !localTheme)
      dispatch(isSystemDarkMode ? setDark : setLight)
    else if (localTheme) dispatch(localTheme === "dark" ? setDark : setLight)
  }, [])

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Body ref={ref}>{children}</Body>
        {sidebar && (
          <StickySidecar offsetTop={offsetTop}>{sidebar}</StickySidecar>
        )}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
