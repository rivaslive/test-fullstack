import tinycolor from 'tinycolor2';

export const getLabelColor = (color: string) => {
  return tinycolor(color).setAlpha(0.7).toRgbString();
};

export const getBorderColor = (color: string) => {
  return tinycolor(color).lighten(30).toHexString();
};

export const getBorderColorSolid = (color: string, amount = 30) => {
  return tinycolor(color).darken(amount).toHexString();
};

export const getOpacityColor = (color: string, opacity = 1) => {
  return tinycolor(color).setAlpha(opacity).toRgbString();
};
