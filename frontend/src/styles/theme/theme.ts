export const breakpoints = {
  mobile: 425,
  tablet: 768,
  bigTablet: 1024,
  desktop: 1200,
  bigDesktop: 1350,
};

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
  primary: '#0070F3',
  primary2: '#5ba6ff',
  primaryOpacity: '#001835',
  secondary: '#7928ca',
  secondaryOpacity: '#441571',
  pink: '#FF4ECD',
  pinkOpacity: '#31142a',
  success: '#17c964',
  warning: '#f5a623',
  error: '#f21361',
  errorOpacity: '#3c0216',
  darkNine: '#999999',
  bgInput: '#111111',
  darkThree: '#333333',
  darkSix: '#666666',
  gradient: 'linear-gradient(112deg, #AAFFEC -63.59%, #ff4ecd -20.3%, #0070F3 70.46%)',
  gradientText: 'linear-gradient(45deg, #7928ca -20%, #FF4ECD 100%);',
};

export type ColorVariant = keyof typeof colors;

export const mediaQueries = {
  mobile: `@media screen and (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media screen and (min-width: ${breakpoints.tablet}px)`,
  bigTablet: `@media screen and (min-width: ${breakpoints.bigTablet}px)`,
  desktop: `@media screen and (min-width: ${breakpoints.desktop}px)`,
  bigDesktop: `@media screen and (min-width: ${breakpoints.bigDesktop}px)`,
};

export const fallbackFonts = 'Sans-Serif';

export const fontNames = {
  Inter: `"Inter", ${fallbackFonts}`,
};

export type FontType = keyof typeof fontNames;
export type AlignType = 'left' | 'center' | 'right' | 'justify';
export type StyleType = 'normal' | 'italic';
export type TransformType = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type WeightType = 'normal' | 'bold' | '900' | '800' | '700' | '600' | '500' | '400' | '300' | '200' | '100';
