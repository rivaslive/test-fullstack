import { CSSProperties, forwardRef, ReactNode } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// styles
import { colors, ColorVariant } from 'styles/theme/theme';
import { StyleButton, StyleLoading } from './style';

interface ButtonProps {
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: ColorVariant;
  borderColor?: ColorVariant;
  labelColor?: ColorVariant;
  isCircle?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  title?: string;
  form?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

const Button = forwardRef(
  (
    {
      children,
      isCircle,
      className,
      loading,
      disabled,
      labelColor = 'white',
      bgColor = 'primary',
      borderColor = bgColor,
      ...restProps
    }: ButtonProps,
    ref: any
  ) => (
    <StyleButton
      ref={ref}
      disabled={loading || disabled}
      $bgColor={colors[bgColor]}
      $labelColor={colors[labelColor]}
      $borderColor={colors[borderColor]}
      className={`${className} app-btn`}
      {...restProps}
    >
      {loading && (
        <StyleLoading>
          <AiOutlineLoading3Quarters />
        </StyleLoading>
      )}
      {children}
    </StyleButton>
  )
);

export default Button;
