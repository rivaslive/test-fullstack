import styled from 'styled-components';
import { colors, mediaQueries } from 'styles/theme/theme';

export const StyleBookCard = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 12px;
  position: relative;
  text-align: left;
  overflow: visible;
  background: ${colors.bgInput};
  border-radius: 35px;
`;

export const StyleBookBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  ${mediaQueries.tablet} {
    flex-direction: row;
  }
`;

export const StyleBookImage = styled.div`
  flex-grow: 0;
  width: 100%;
  display: inherit;

  ${mediaQueries.tablet} {
    max-width: 33.3333%;
    flex-basis: 33.3333%;
  }
`;

export const StyleImageWrapper = styled.div`
  transform: none;
  overflow: hidden;
  border-radius: 32px;
  display: flex;
  min-height: 200px;
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, rgb(1, 1, 135) 0%, rgb(24, 0, 14) 100%);

  ${mediaQueries.tablet} {
    width: 200px;
  }
`;

export const StyleImage = styled.img`
  object-fit: contain;
  max-width: 100%;
  min-width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const StyleBookContent = styled.div`
  flex-grow: 0;
  display: inherit;
  padding: 24px 24px 0;

  ${mediaQueries.tablet} {
    padding: 0 24px;
    max-width: 66.6667%;
    flex-basis: 66.6667%;
  }
`;

export const StyleNav = styled.nav`
  float: left;
  box-sizing: border-box;
  width: 100%;

  ${mediaQueries.tablet} {
    .app-text {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const StyleInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: 8px;

  .ml-1 {
    margin-left: 10px;
  }
`;
