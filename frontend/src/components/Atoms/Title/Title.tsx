import { CSSProperties, ReactNode } from 'react';

import {
  AlignType,
  ColorVariant,
  FontType,
  StyleType,
  TransformType,
  WeightType,
} from 'styles/theme/theme';

// styles
import { TitleStyle } from './styles';

export interface ITitleProps {
  color?: ColorVariant;
  className?: string;
  style?: CSSProperties;
  transform?: TransformType;
  children?: ReactNode;
  font?: FontType;
  fontWeight?: WeightType;
  fontStyle?: StyleType;
  size?: number;
  lineHeight?: number;
  asChild?: string;
  align?: AlignType;
  mobileSettings?: {
    font?: FontType;
    size?: number;
    lineHeight?: number;
    fontWeight?: WeightType;
    align?: AlignType;
  };
}

const Title = ({
  children,
  mobileSettings,
  className,
  transform = 'none',
  asChild = 'h2',
  color = 'white',
  fontWeight = '900',
  font = 'Inter',
  size = 60,
  lineHeight = 66,
  fontStyle = 'normal',
  align = 'left',
  ...restProps
}: ITitleProps) => (
  <TitleStyle
    as={asChild as never}
    $font={font}
    $size={size}
    $align={align}
    $color={color}
    $transform={transform}
    $fontStyle={fontStyle}
    $lineHeight={lineHeight}
    $fontWeight={fontWeight}
    $mobileSettings={mobileSettings}
    className={`app-title ${className ?? ''}`}
    {...restProps}
  >
    {children}
  </TitleStyle>
);

export default Title;
