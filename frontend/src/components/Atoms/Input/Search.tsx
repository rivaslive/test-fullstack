import { CSSProperties, useEffect } from 'react';
import Form, { Field } from 'rc-field-form';
import { AiOutlineSearch } from 'react-icons/ai';

// styles
import { colors, ColorVariant } from 'styles/theme/theme';
import { StyleBtnSearch, StyleContainer, StyleInput } from './style';

export interface SearchProps {
  bgColor?: ColorVariant;
  valueColor?: ColorVariant;
  borderColor?: ColorVariant;
  value?: string;
  onSearch?: (value?: string) => void;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
}

export const Search = ({
  value,
  onSearch,
  placeholder,
  style,
  className,
  borderColor = 'transparent',
  bgColor = 'bgInput',
  valueColor = 'white',
}: SearchProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: { search?: string }) => {
    onSearch && onSearch(values.search);
  };

  useEffect(() => {
    form.setFieldsValue({ search: value });
  }, [form, value]);

  return (
    <StyleContainer>
      <Form form={form} onFinish={onFinish}>
        <Field name="search">
          <StyleInput
            $color={colors[valueColor]}
            $valueColor={colors[valueColor]}
            placeholder={placeholder}
            style={style}
            $bgColor={colors[bgColor]}
            $borderColor={colors[borderColor]}
            className={`app-input app-input-search ${className}`}
          />
        </Field>
        <StyleBtnSearch type="submit" bgColor="white" labelColor="black">
          <AiOutlineSearch />
        </StyleBtnSearch>
      </Form>
    </StyleContainer>
  );
};
