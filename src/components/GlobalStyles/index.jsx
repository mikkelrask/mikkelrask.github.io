import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'HackNFM';
    src: 
      url('../../fonts/HackNFM-Regular.woff2') format('woff2');
      url('../../fonts/HackNFM-Regular.woff') format('woff'),
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
   @font-face {                                                                                    
     font-family: 'HackNFM';
     src:
       url('../../fonts/HackNFM-Bold.woff2') format('woff2'),
       url('../../fonts/HackNFM-Bold.woff') format('woff');
     font-weight: bold;
     font-style: normal;
     font-display: swap;
   }
   
   @font-face {
      font-family: 'FantasqueSansMNF';
      src: 
        url('../../fonts/FantasqueSansMNFM-Bold.woff2') format('woff2'),
        url('../../fonts/FantasqueSansMNFM-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }


  body {
    font-family: 'FantasqueSansMNF', sans-serif;
    background: ${props => props.theme.colors.bodyBackground};
  };
  h1, h2, h3, h4, h5, h6 {
    font-family: 'FantasqueSansMNF', sans-serif;
  };

  pre {
    position: relative;
    margin: 1em 0;
    padding: 1em;
    border-radius: 4px;
    overflow: auto;
  };

  pre .copy-button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    display: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.875em;
    z-index: 10;
  };

  pre:hover .copy-button {
    display: block;
  };

  .copy-button::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 4px 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  };

  .copy-button:hover::after {
    opacity: 1;
  };

  iframe {
    aspect-ratio: 16 / 9;
    width: 100%;
    height: 100%;
 };
`

export default GlobalStyles
