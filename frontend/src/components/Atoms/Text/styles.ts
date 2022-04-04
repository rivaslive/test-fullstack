import styled, { css } from 'styled-components';

import {
  AlignType,
  colors,
  ColorVariant,
  fontNames,
  FontType,
  mediaQueries,
  StyleType,
  TransformType,
  WeightType,
} from 'styles/theme/theme';

interface TextProps {
  $font: FontType;
  $size: number;
  $lineHeight: number;
  $fontStyle: StyleType;
  $fontWeight: WeightType;
  $transform: TransformType;
  $mobileSettings?: {
    font?: FontType;
    size?: number;
    align?: AlignType;
    lineHeight?: number;
  };
  $color: ColorVariant;
  $align: AlignType;
}

const cssMobileV = css<TextProps>`
  // Mobile
  // font family
  font-family: ${({ $mobileSettings, ...props }) =>
    fontNames[$mobileSettings?.font || props.$font]};
  // font size
  font-size: ${({ $mobileSettings, ...props }) =>
    $mobileSettings?.size || props.$size}px;
  // Line Height
  line-height: ${({ $mobileSettings, ...props }) =>
    $mobileSettings?.lineHeight || props.$lineHeight}px;
  // align
  text-align: ${({ $mobileSettings, ...props }) =>
    $mobileSettings?.align || props.$align};

  // desktop
  ${mediaQueries.tablet} {
    font-family: ${({ $font }) => fontNames[$font]};
    font-size: ${({ $size }) => $size}px;
    line-height: ${({ $lineHeight }) => $lineHeight}px;
    text-align: ${({ $align }) => $align};
  }
`;

const cssParagraph = css<TextProps>`
  font-family: ${({ $font }) => fontNames[$font]};
  font-size: ${({ $size }) => $size}px;
  line-height: ${({ $lineHeight }) => $lineHeight}px;
`;

export const TextStyle = styled.div<TextProps>`
  &.app-text {
    text-align: ${({ $align }) => $align};
    ${({ $mobileSettings }) => ($mobileSettings ? cssMobileV : cssParagraph)};
    color: ${({ $color }) => colors[$color]};
    font-style: ${({ $fontStyle }) => $fontStyle};
    font-weight: ${({ $fontWeight }) => $fontWeight};
    text-transform: ${({ $transform }) => $transform};
  }
`;
