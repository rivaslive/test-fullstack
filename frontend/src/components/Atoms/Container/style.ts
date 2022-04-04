import styled from 'styled-components';
import { mediaQueries } from 'styles/theme/theme';

export const StyleContainer = styled.div<{
  $withTopPadding: boolean;
  $isInternal: boolean;
}>`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  padding: ${({ $withTopPadding }) =>
    $withTopPadding ? '50px 15px' : '0 15px'};

  ${mediaQueries.tablet} {
    max-width: 750px;
  }

  ${mediaQueries.tablet} {
    max-width: 1170px;
  }
`;
