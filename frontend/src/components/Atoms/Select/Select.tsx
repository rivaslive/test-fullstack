import 'styles/rc-select.css';
import { useEffect, useState } from 'react';
import SelectRC, { Option, SelectProps } from 'rc-select';

import { colors, ColorVariant } from 'styles/theme/theme';
import { StyleContainer, StyleLabel } from 'components/Atoms/Input/style';

interface InternalSelectProps extends SelectProps {
  label?: string;
  error?: string;
  labelColor?: ColorVariant;
}

const Select = ({
  className,
  label,
  error,
  placeholder = 'Select an option',
  labelColor = 'darkNine',
  ...props
}: InternalSelectProps) => {
  const [internalError, setInternalError] = useState<boolean>(false);

  useEffect(() => {
    setInternalError(!!error);
  }, [error]);

  return (
    <StyleContainer>
      {label && <StyleLabel $color={colors[labelColor]}>{label}</StyleLabel>}
      <SelectRC
        placeholder={placeholder}
        className={`app-select ${className}`}
        {...props}
      />
      {internalError && (
        <StyleLabel style={{ fontWeight: 600 }} $color={colors.error}>
          {error}
        </StyleLabel>
      )}
    </StyleContainer>
  );
};

Select.Option = Option;

export default Select;
