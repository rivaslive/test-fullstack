import styled from 'styled-components';
import { colors, mediaQueries } from 'styles/theme/theme';

export const StyleBookCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 0 20px;
  border-radius: 12px;
  transition: all 0.3s;
  cursor: pointer;
  background: ${colors.darkThree};

  &:hover {
    transform: scale(1.02);
  }
`;

export const StyleActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  z-index: 4;

  .app-btn {
    font-size: 24px;
    margin-left: 10px;

    &:hover {
      background: ${colors.darkSix};
    }

    svg {
      font-size: 24px;
    }
  }

  ${mediaQueries.tablet} {
    position: relative;
    top: 0;
    right: 0;
  }
`;
