import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'HackNFM';
    src: 
      url('../../fonts/HackNFM-Regular.woff') format('woff'),
      url('../../fonts/HackNFM-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'FantasqueSansMNF';
    src: 
      url('../../fonts/FantasqueSansMNFM-Regular.woff') format('woff'),
      url('../../fonts/FantasqueSansMNFM-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'HackNFM', sans-serif;
    background: ${props => props.theme.colors.bodyBackground};
  };
  h1, h2, h3, h4, h5, h6 {
    font-family: 'FantasqueSansMNF', sans-serif;
  };
`;

export default GlobalStyles;