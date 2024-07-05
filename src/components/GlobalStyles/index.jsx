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
1   @font-face {                                                                                    
1     font-family: 'HackNFM';
2     src:
        url('../../HackNFM-Bold.woff2') format('woff2'),
3       url('../../HackNFM-Bold.woff') format('woff');
4     font-weight: bold;
5     font-style: normal;
6     font-display: swap;
  7 }
  8 
  9 @font-face {
 10     font-family: 'FantasqueSansMNF';
 11     src: 
          url('../../FantasqueSansMNFM-Bold.woff2') format('woff2'),
 12       url('../../FantasqueSansMNFM-Bold.woff') format('woff');
 13     font-weight: bold;
 14     font-style: normal;
 15     font-display: swap;
 16 }


  body {
    font-family: 'HackNFM', sans-serif;
    background: ${props => props.theme.colors.bodyBackground};
  };
  h1, h2, h3, h4, h5, h6 {
    font-family: 'FantasqueSansMNF', sans-serif;
  };
`;

export default GlobalStyles;