import {
  ChangeEvent,
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from 'react';

// components
import { colors, ColorVariant } from 'styles/theme/theme';
import { Search } from './Search';

// styles
import { StyleContainer, StyleInput, StyleLabel } from './style';

export interface InputProps {
  name?: string;
  error?: string;
  value?: string;
  type?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  label?: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  isRequired?: boolean;
  labelColor?: ColorVariant;
  bgColor?: ColorVariant;
  borderColor?: ColorVariant;
  valueColor?: ColorVariant;
}

interface InputType
  extends ForwardRefExoticComponent<InputProps & RefAttributes<unknown>> {
  Search: typeof Search;
}

// @ts-ignore
const Input: InputType = forwardRef(
  (
    {
      value,
      defaultValue,
      placeholder,
      isRequired,
      type,
      onChange,
      error,
      label = '',
      borderColor = 'transparent',
      bgColor = 'bgInput',
      labelColor = 'darkNine',
      valueColor = 'white',
      className = '',
      ...restProps
    }: InputProps,
    ref: any
  ) => {
    const [internalError, setInternalError] = useState<boolean>(false);

    const resolveBorderColor = internalError ? 'error' : borderColor;

    const onInternalChange = (e?: ChangeEvent<HTMLInputElement>) => {
      setInternalError(false);
      onChange && onChange(e?.target?.value);
    };

    useEffect(() => {
      setInternalError(!!error);
    }, [error]);

    return (
      <StyleContainer className={className}>
        {label && (
          <StyleLabel $isRequired={isRequired} $color={colors[labelColor]}>
            {label}
          </StyleLabel>
        )}

        <StyleInput
          value={value}
          type={type}
          className="app-input"
          onChange={onInternalChange}
          $borderColor={colors[resolveBorderColor]}
          $bgColor={colors[bgColor]}
          $color={colors[labelColor]}
          $valueColor={colors[valueColor]}
          defaultValue={defaultValue}
          ref={ref}
          // props antd
          {...restProps}
          placeholder={placeholder}
        />
        {internalError && (
          <StyleLabel style={{ fontWeight: 600 }} $color={colors.error}>
            {error}
          </StyleLabel>
        )}
      </StyleContainer>
    );
  }
);

Input.Search = Search;

export default Input;
