import { createGlobalStyle } from 'styled-components';
import get from 'styles/getStyle';
import antdOverwrite from './antdOverwrite';

export default createGlobalStyle`
  body {
    color: ${get('color-text-regular')};
  }

  p {
    margin: 0;
  }

  ${antdOverwrite}

  #root {
    > .ant-spin {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${get('color-grayscale-black')};

      .ant-spin-text {
        margin-left: ${get('space-12')};
      }
    }
  }
`;
