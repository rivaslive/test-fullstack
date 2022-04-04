import styled, { css, keyframes } from 'styled-components';

import { mediaQueries } from 'styles/theme/theme';

interface ButtonProps {
  $bgColor: string;
  $borderColor: string;
  $labelColor: string;
}

const cssBase = css`
  height: auto;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  padding: 13px 18px;
  border-radius: 12px;
  cursor: pointer;
  border-style: solid;
  transition: all 0.2s ease-in;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }

  ${mediaQueries.tablet} {
    font-size: 14px;
    line-height: 28px;
    padding: 7px 20px;
  }
`;

const cssLinearBorder = css<ButtonProps>`
  border: solid 3px transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    ${({ $borderColor }) => $borderColor};
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px ${({ $bgColor }) => $bgColor} inset;
`;

export const StyleButton = styled.button<ButtonProps>`
  &.app-btn {
    ${cssBase};
    background: ${({ $bgColor }) => $bgColor};
    border-color: ${({ $borderColor }) => $borderColor};
    color: ${({ $labelColor }) => $labelColor};
    ${({ $borderColor }) => $borderColor.includes('linear') && cssLinearBorder};

    &:hover {
      opacity: 0.8;
    }
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyleLoading = styled.span`
  margin-right: 10px;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;
