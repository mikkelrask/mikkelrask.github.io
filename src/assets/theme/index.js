const GRAY9 = "#212529"
const GRAY8 = "#343a40"
const GRAY7 = "#495057"
const GRAY6 = "#868e96"
const GRAY5 = "#adb5bd"
const GRAY4 = "#ced4da"
// eslint-disable-next-line no-unused-vars
const GRAY3 = "#dee2e6"
const GRAY2 = "#e9ecef"
const GRAY1 = "#f1f3f5"
const GRAY0 = "#f8f9fa"

// Tokyo Night
const BG = "#1a1b26" // background
const BG1 = "#16161e" // darker background
const BG2 = "#2f3549" // slightly lighter background
const BG3 = "#3b4261" // selection/bg highlight
const BG4 = "#414868" // floating windows/borders
const FG = "#c0caf5" // foreground text
const ORANGE = "#ff9e64" // orange
const GREEN = "#9ece6a" // green
const AQUA = "#7dcfff" // cyan/aqua
const RED = "#f7768e" // red
// eslint-disable-next-line no-unused-vars
const BLUE = "#7aa2f7" // blue
const FG0 = "#c0caf5" // main text
// eslint-disable-next-line no-unused-vars
const FG1 = "#a9b1d6" // lighter text
const FG2 = "#9aa5ce" // even lighter

export const light = {
  name: "light",
  colors: {
    bodyBackground: "#ffffff",
    text: GRAY9,
    secondaryText: GRAY7,
    tertiaryText: GRAY6,
    mutedText: GRAY5,
    hoveredLinkText: GRAY0,
    border: GRAY4,
    activatedBorder: GRAY6,
    background: GRAY1,
    icon: GRAY6,
    divider: GRAY2,
    /*headerBackground: "rgba(255, 255, 255, 0.85)",*/
    headerShadow: "rgba(0, 0, 0, 0.1)",
    inlineCodeBackground: FG0,
    inlineCodeBackgroundDarker: RED,
    tagBackground: FG0,
    selectedTagBackground: GRAY7,
    hoveredTagBackground: FG2,
    hoveredSelectedTagBackground: GRAY8,
    nextPostButtonBackground: "rgba(0, 0, 0, 0.06)",
    hoveredNextPostButtonBackground: "rgba(0, 0, 0, 0.08)",
    seriesBackground: GRAY1,
    tagText: GRAY7,
    selectedTagText: GRAY0,
    spinner: GRAY7,
    scrollTrack: GRAY1,
    scrollHandle: GRAY4,
    blockQuoteBorder: GRAY4,
    blockQuoteBackground: GRAY1,
    textFieldBorder: GRAY4,
    textFieldActivatedBorder: GRAY5,
    tableBackground: GRAY1,
  },
}

export const dark = {
  name: "dark",
  colors: {
    bodyBackground: BG,
    text: FG,
    secondaryText: FG,
    tertiaryText: ORANGE,
    mutedText: FG2,
    linkText: ORANGE,
    hoveredLinkText: RED,
    border: ORANGE,
    activatedBorder: BG3,
    background: BG,
    icon: AQUA,
    divider: BG1,
    /*headerBackground: "rgba(40, 40, 40, 0.85)",*/
    headerShadow: "rgba(255, 255, 255, 0.08)",
    inlineCodeBackground: BG4,
    inlineCodeBackgroundDarker: BG4,
    tagBackground: AQUA,
    selectedTagBackground: ORANGE,
    hoveredTagBackground: RED,
    hoveredSelectedTagBackground: ORANGE,
    nextPostButtonBackground: "rgba(255, 255, 255, 0.05)",
    hoveredNextPostButtonBackground: "rgba(255, 255, 255, 0.08)",
    seriesBackground: BG2,
    tagText: BG,
    selectedTagText: BG,
    spinner: GREEN,
    scrollTrack: BG1,
    scrollHandle: BG3,
    blockQuoteBorder: RED,
    blockQuoteBackground: BG2,
    textFieldBorder: BG4,
    textFieldActivatedBorder: BG3,
    tableBackground: "#292e33",
  },
}
