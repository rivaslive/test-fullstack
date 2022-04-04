import styled from 'styled-components';
import { mediaQueries } from 'styles/theme/theme';
import Button from 'components/Atoms/Button';

export const HeadPageStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
  flex-direction: column;

  .app-btn {
    margin-top: 20px;
    width: 100%;
  }

  ${mediaQueries.tablet} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    .app-btn {
      margin-top: 0;
      width: initial;
    }
  }
`;

export const HeadPageContent = styled.div``;

export const ActionsStyle = styled.div`
  width: 100%;

  ${mediaQueries.tablet} {
    width: initial;
  }
`;

export const ButtonStyle = styled(Button)`
  &.app-btn {
    margin-left: 0;

    ${mediaQueries.tablet} {
      margin-left: 10px;
    }
  }
`;
