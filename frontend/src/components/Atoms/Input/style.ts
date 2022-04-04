import styled, { css } from 'styled-components';

import { getBorderColorSolid } from 'utils/colors';
import { colors } from 'styles/theme/theme';
import Button from '../Button';

interface InputProps {
  $color: string;
  $valueColor?: string;
  $borderColor?: string;
  $bgColor?: string;
  $isTextArea?: boolean;
  $isRequired?: boolean;
}

const inputVariantCSS = css<InputProps>`
  width: 100%;
  box-shadow: none;
  padding: 14px 16px;
  height: auto;
  background: ${({ $bgColor }) => $bgColor};
  color: ${({ $valueColor }) => $valueColor};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 12px;

  &::placeholder {
    color: ${({ $valueColor }) => $valueColor};
    opacity: 0.6;
  }

  &:focus,
  &:hover {
    border-color: ${({ $color, $borderColor }) =>
      !$borderColor && getBorderColorSolid($color)};
  }
`;

const cssRequiredInput = css<InputProps>`
  &::before {
    display: inline-block;
    content: '* ';
    color: ${colors.error};
  }
`;

const labelVariantCSS = css<InputProps>`
  display: flex;
  position: relative;
  line-height: 20px;
  margin-bottom: 8px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  ${({ $isRequired }) => $isRequired && cssRequiredInput};
`;

export const StyleContainer = styled.div`
  position: relative;
`;

export const StyleLabel = styled.span<InputProps>`
  ${labelVariantCSS};
  transition: top 200ms, font-size 200ms;
`;

export const StyleInput = styled.input<InputProps>`
  &.app-input {
    ${inputVariantCSS};
  }
`;

export const StyleBtnSearch = styled(Button)`
  &.app-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0 8px;
    font-size: 20px;
  }
`;
