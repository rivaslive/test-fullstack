import styled from 'styled-components';

import FadeIn from 'components/Atoms/FadeIn';
import Button from 'components/Atoms/Button';
import Container from 'components/Atoms/Container';

import { colors, mediaQueries } from 'styles/theme/theme';

export const StyleNav = styled(Container)`
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  backdrop-filter: saturate(180%) blur(10px);

  a {
    text-decoration: none;
  }

  .app-count {
    background: ${colors.secondary};
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
  }

  button.app-btn {
    padding: 0 10px;
  }

  .link-active {
    .app-btn {
      color: ${colors.white};
      background: ${colors.pinkOpacity};
    }
  }
`;

export const StyleBrandWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: 25px;

  .app-text {
    margin-left: 10px;
  }

  &.mb-3 {
    margin-bottom: 30px;
  }

  ${mediaQueries.tablet} {
    margin-bottom: 0;
  }
`;

export const StyleFlex = styled.div`
  display: none;
  align-items: center;

  ${mediaQueries.tablet} {
    display: flex;
  }
`;

export const StyleLink = styled(Button)`
  &.app-btn {
    ${mediaQueries.tablet} {
      padding: 0;
      margin-right: 20px;
    }
  }
`;

export const StyleBurgerMobile = styled(Button)`
  &.app-btn {
    display: block;
    padding: 0;
    font-size: 27px;

    ${mediaQueries.tablet} {
      display: none;
    }
  }
`;

export const StyleMenuWrapper = styled(FadeIn)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
`;

export const StyleMenuBody = styled(Container)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export const StyleMenuClose = styled(Button)`
  &.app-btn {
    position: absolute;
    top: 30px;
    right: 20px;
    padding: 5px;
    font-size: 25px;
    background-color: transparent;
    border-color: transparent;
  }
`;
