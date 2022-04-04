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

interface TitleProps {
  $font: FontType;
  $size: number;
  $transform: TransformType;
  $lineHeight: number;
  $fontWeight: WeightType;
  $mobileSettings?: {
    font?: FontType;
    size?: number;
    lineHeight?: number;
    fontWeight?: WeightType;
    align?: AlignType;
  };
  $color: ColorVariant;
  $align: AlignType;
  $fontStyle: StyleType;
}

const cssMobileV = css<TitleProps>`
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
  // Font weight
  font-weight: ${({ $mobileSettings, ...props }) =>
    $mobileSettings?.fontWeight || props.$fontWeight};
  // align
  text-align: ${({ $mobileSettings, ...props }) =>
    $mobileSettings?.align || props.$align};

  // desktop
  ${mediaQueries.tablet} {
    font-family: ${({ $font }) => fontNames[$font]};
    font-size: ${({ $size }) => $size}px;
    line-height: ${({ $lineHeight }) => $lineHeight}px;
    font-weight: ${({ $fontWeight }) => $fontWeight};
    text-align: ${({ $align }) => $align};
  }
`;

const cssTitle = css<TitleProps>`
  font-family: ${({ $font }) => fontNames[$font]};
  font-size: ${({ $size }) => $size}px;
  line-height: ${({ $lineHeight }) => $lineHeight}px;
  font-weight: ${({ $fontWeight }) => $fontWeight};
`;

const cssTitleGradient = css<TitleProps>`
  color: white;
  background-image: ${({ $color }) => ($color ? colors[$color] : colors.black)};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;

export const TitleStyle = styled.h2<TitleProps>`
  &.app-title {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: normal;
    word-break: break-all;

    text-align: ${({ $align }) => $align};
    font-style: ${({ $fontStyle }) => $fontStyle};
    color: ${({ $color }) => ($color ? colors[$color] : colors.black)};
    text-transform: ${({ $transform }) => $transform};

    // mobile settings
    ${({ $mobileSettings }) => ($mobileSettings ? cssMobileV : cssTitle)};

    //color gradient
    ${({ $color = 'black' }) => {
      if (colors[$color].includes('linear-gradient')) {
        return cssTitleGradient;
      }
      return ''
    }}
`;
