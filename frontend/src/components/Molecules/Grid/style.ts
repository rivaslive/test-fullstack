import styled from 'styled-components';
import { mediaQueries } from 'styles/theme/theme';
import calcWidthCol from '../../../utils/calcWidthCol';

interface ColProps {
  $sm: number;
  $md: number;
  $lg: number;
}

export interface ColGutter {
  horizontal: {
    sm: number;
    md: number;
    lg: number;
  };
  vertical: {
    sm: number;
    md: number;
    lg: number;
  };
}

type InternalColProps = ColProps & {
  $gutter: ColGutter;
};

export const StyleRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const StyleCol = styled.div<InternalColProps>`
  flex-shrink: 0;
  width: ${({ $sm }) => calcWidthCol($sm)}%;

  padding: ${({ $gutter: { horizontal, vertical } }) => {
    const v = vertical.sm / 2;
    const h = horizontal.sm / 2;

    return `${v}px ${h}px`;
  }};

  ${mediaQueries.tablet} {
    width: ${({ $md }) => calcWidthCol($md)}%;
    padding: ${({ $gutter: { horizontal, vertical } }) => {
      const v = vertical.md / 2;
      const h = horizontal.md / 2;

      return `${v}px ${h}px`;
    }};
  }

  ${mediaQueries.desktop} {
    width: ${({ $lg }) => calcWidthCol($lg)}%;
    padding: ${({ $gutter: { horizontal, vertical } }) => {
      const v = vertical.lg / 2;
      const h = horizontal.lg / 2;

      return `${v}px ${h}px`;
    }};
  }
`;
