const GRAY9 = "#212529"
const GRAY8 = "#343a40"
const GRAY7 = "#495057"
const GRAY6 = "#868e96"
const GRAY5 = "#adb5bd"
const GRAY4 = "#ced4da"
const GRAY3 = "#dee2e6"
const GRAY2 = "#e9ecef"
const GRAY1 = "#f1f3f5"
const GRAY0 = "#f8f9fa"

// gruvbox
const BG = "#282828"
const BG1 = "#3C3835"
const BG2 = "#504943"
const BG3 = "#665c54"
const BG4 = "#7C6f64"
const FG = "#ebdbb2"
const ORANGE = "#fe8019"
const GREEN = "#98171a"
const AQUA = "#8ec07c"
const RED = "#fb4934"
const BLUE = "#83a598"
const FG0 = "#fbf1c7"
const FG1 = "#ebdbb2"
const FG2 = "#d5c4a1"

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
    headerBackground: "rgba(255, 255, 255, 0.85)",
    headerShadow: "rgba(0, 0, 0, 0.08)",
    inlineCodeBackground: GRAY2,
    inlineCodeBackgroundDarker: GRAY4,
    tagBackground: GRAY1,
    selectedTagBackground: GRAY7,
    hoveredTagBackground: GRAY3,
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
    hoveredLinkText: ORANGE,
    border: ORANGE,
    activatedBorder: BG3,
    background: BG,
    icon: AQUA,
    divider: BG1,
    headerBackground: "rgba(40, 40, 40, 0.85)",
    headerShadow: "rgba(255, 255, 255, 0.08)",
    inlineCodeBackground: BG3,
    inlineCodeBackgroundDarker: BG2,
    tagBackground: AQUA,
    selectedTagBackground: BLUE,
    hoveredTagBackground: ORANGE,
    hoveredSelectedTagBackground: RED,
    nextPostButtonBackground: "rgba(255, 255, 255, 0.05)",
    hoveredNextPostButtonBackground: "rgba(255, 255, 255, 0.08)",
    seriesBackground: BG2,
    tagText: BG,
    selectedTagText: BG,
    spinner: GREEN,
    scrollTrack: BG1,
    scrollHandle: BG3,
    blockQuoteBorder: ORANGE,
    blockQuoteBackground: BG3,
    textFieldBorder: BG4,
    textFieldActivatedBorder: BG3,
    tableBackground: "#292e33",
  },
}
