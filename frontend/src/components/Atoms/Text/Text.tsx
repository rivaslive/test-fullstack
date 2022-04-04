import { forwardRef, ReactNode } from 'react';

import {
  AlignType,
  ColorVariant,
  FontType,
  StyleType,
  TransformType,
  WeightType,
} from 'styles/theme/theme';

// styles
import { TextStyle } from './styles';

export interface TextProps {
  color?: ColorVariant;
  font?: FontType;
  transform?: TransformType;
  className?: string;
  title?: string;
  size?: number;
  lineHeight?: number;
  fontStyle?: StyleType;
  fontWeight?: WeightType;
  align?: AlignType;
  html?: string;
  children?: ReactNode;
  mobileSettings?: {
    font?: FontType;
    size?: number;
    align?: AlignType;
    lineHeight?: number;
  };

  [key: string]: unknown;
}

const Text = forwardRef<HTMLDivElement, TextProps>(
  (
    {
      children,
      html,
      className,
      mobileSettings,
      fontWeight = 'normal',
      fontStyle = 'normal',
      color = 'white',
      size = 16,
      transform = 'none',
      lineHeight = size + 2,
      align = 'left',
      font = 'Inter',
      ...restProps
    },
    ref
  ) => (
    <TextStyle
      $font={font}
      $size={size}
      $align={align}
      $color={color}
      $transform={transform}
      $fontStyle={fontStyle}
      $lineHeight={lineHeight}
      $fontWeight={fontWeight}
      $mobileSettings={mobileSettings}
      className={`app-text ${className ?? ''}`}
      ref={ref}
      {...restProps}
    >
      {html ? (
        <span
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      ) : (
        children
      )}
    </TextStyle>
  )
);

export default Text;
