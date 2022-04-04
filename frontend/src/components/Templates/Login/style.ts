import styled from 'styled-components';

import { colors, mediaQueries } from 'styles/theme/theme';

export const LoginWrapperStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.black};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: url('/img/gradient-right-dark.svg') no-repeat center center;
    background-size: contain;
    z-index: 1;
  }
`;

export const StyleBrandWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: 25px;

  .app-text {
    margin-left: 10px;
  }

  ${mediaQueries.tablet} {
    left: 50px;
  }
`;

export const StyleContent = styled.div`
  z-index: 2;
`;

