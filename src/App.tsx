import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import { Visualization } from './Visualization';
import { BoxPlotViz } from './BoxPlotViz';

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #FFFFFF;
    --primary-blue: #006EB5;
    --blue-medium: #4F95DD;
    --blue-bg: #94C4F5;
    --blue-100: #B5D5F5;
    --navy: #082753;
    --black-100: #FAFAFA;
    --black-200: #f5f9fe;
    --black-300: #EDEFF0;
    --black-400: #E9ECF6;
    --black-450: #DDD;
    --black-500: #A9B1B7;
    --black-550: #666666;
    --black-600: #212121;
    --black-700: #000000;
    --blue-very-light: #F2F7FF;
    --yellow: #FBC412;
    --yellow-bg: #FFE17E;
    --red: #D12800;
    --red-bg: #FFBCB7;
    --shadow:0px 10px 30px -10px rgb(9 105 250 / 15%);
    --shadow-bottom: 0 10px 13px -3px rgb(9 105 250 / 5%);
    --shadow-top: 0 -10px 13px -3px rgb(9 105 250 / 15%);
    --shadow-right: 10px 0px 13px -3px rgb(9 105 250 / 5%);
    --shadow-left: -10px 0px 13px -3px rgb(9 105 250 / 15%);
  }
  
  html { 
    font-size: 62.5%; 
  }

  .react-dropdown-select-option{
    color:var(--black) !important;
    background-color:var(--primary-color-light) !important;
  }
  .react-dropdown-select-option-label, .react-dropdown-select-option-remove{
    font-weight: 400;
    background-color:var(--primary-color-light);
    padding: 0.5rem;
  }

  body {
    font-family: "proxima-nova", "Helvetica Neue", "sans-serif";
    color: var(--black-600);
    background-color: var(--white);
    margin: 0;
    padding: 1rem 0;
    font-size: 1.6rem;
    font-weight: normal;
    line-height: 2.56rem;
  }

  a {
    text-decoration: none;
    color: var(--primary-blue);
  }

  h1 {
    color: var(--primary-blue);
    font-size: 3.2rem;
    font-weight: 700;
    
    @media (max-width: 760px) {
      font-size: 2.4rem;
    }
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
  
  button.primary {
    border-radius: 0.2rem !important;
    font-size: 1.4rem !important;
    font-weight: normal !important;
    color: var(--white) !important;
    background-color: var(--primary-blue) !important;
    border: 1px solid var(--primary-blue) !important;
    cursor: pointer !important;
    padding: 0.4rem 1rem !important;
    &:hover {
      border: 1px solid var(--blue-medium) !important;
      background-color: var(--blue-medium) !important;
    }
    &:active{
      border: 1px solid var(--blue-medium) !important;
      background-color: var(--blue-medium) !important;
    }
  }

  button.secondary {
    border-radius: 0.2rem !important;
    font-size: 1.4rem !important;
    font-weight: normal !important;
    color: var(--black-600) !important;
    border: 1px solid var(--black-450) !important;
    cursor: pointer !important;
    padding: 0.4rem 1rem !important;
    background-color: var(--white) !important;
    &:hover {
      border: 1px solid var(--primary-blue) !important;
      color: var(--primary-blue) !important;
    }
    &:active{
      border: 1px solid var(--primary-blue) !important;
      color: var(--primary-blue) !important;
    }
  }

  a:hover {
    font-weight: bold;
  }

  .bold{
    font-weight: 700;
  }
  
  .italics{
    font-style: italic;
  }

  .ant-modal-close {
    display: none !important;
  }

  .ant-modal-header{
    display: none;
  }

  .select-box {
    width: 100%;
    border: 2px solid #000;
    height: 5.2rem;
  }

  .ant-select-selector{
    height: 4.8rem !important;
    border: 0 !important;
  }

  .ant-select-selection-search-input {
    height: 4.8rem !important;
  }

  .select-box .ant-select-selection-placeholder {
    padding-top: 1rem !important;
    font-size: 1.6rem;
    text-transform: uppercase;
    color: black;
  }

  .select-box::after {
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transition: translateY(-50%);
    -webkit-transition: all 200ms ease-in-out;
    -moz-transition: all 200ms ease-in-out;
    -ms-transition: all 200ms ease-in-out;
    -o-transition: all 200ms ease-in-out;
    transition: all 200ms ease-in-out;
    background: url(https://design.undp.org/static/media/chevron-down.16c97a3f.svg) no-repeat center center;
    content: "";
    float: right;
    height: 13px;
    position: absolute;
    pointer-events: none;
    right: 14px;
    top: 50%;
    width: 20px;
  }

  .select-box .ant-select-selection-item {
    padding-top: 1rem !important;
    font-size: 1.6rem;
    font-weight: 600;
    text-transform: uppercase;
    color: black;
  }

  .ant-select-arrow {
    opacity: 0;
  }

  .ant-select-item-option {
    font-size: 1.6rem;
    border-top: 1px solid #d4d6d8;
    line-height: 4.4rem;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Visualization />
  </>
);

export const BoxPlotApp = () => (
  <>
    <GlobalStyle />
    <BoxPlotViz />
  </>
);

export default App;
