import { useState } from 'react';
import Form, { Field } from 'rc-field-form';
import { useNavigate } from 'react-router-dom';
import { InternalNamePath } from 'rc-field-form/es/interface';

import { ROUTES } from 'routes/paths';
import { useAuth } from 'context/auth';

import {
  StyleButton,
  StyleError,
  StyleInput,
  StyleLink,
} from './style';

export interface SignInValues {
  email: string;
  password?: string;
}

const defaultErrors = {
  email: '',
  password: '',
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { error, loading, login } = useAuth();
  const [errors, setErrors] = useState<SignInValues>(defaultErrors);
  const [isLibrarian, setIsLibrarian] = useState<boolean>(false);

  const onFinishFailed = ({
    errorFields,
  }: {
    errorFields: { errors: string[]; name: InternalNamePath }[];
  }) => {
    errorFields?.forEach(({ errors, name }) => {
      if (errors.length && name.length) {
        setErrors((prev) => ({
          ...prev,
          [name[0]]: errors[0],
        }));
      }
    });
  };

  const onValuesChange = () => {
    setErrors(defaultErrors);
  };

  const toggleIsLibrarian = () => {
    setIsLibrarian((prev) => !prev);
  };

  const onFinish = async (values: SignInValues) => {
    const { data, error } = await login(values);
    if (data) {
      navigate(ROUTES.HOME);
    }
    if (error === 'Please send your password') {
      setIsLibrarian(true);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      <Field name="email" rules={[{ required: true }, { type: 'email' }]}>
        <StyleInput name="email" placeholder="Email" error={errors?.email} />
      </Field>

      {isLibrarian && (
        <Field name="password" rules={[{ required: true }]}>
          <StyleInput
            name="password"
            type="password"
            placeholder="Password"
            error={errors?.password}
          />
        </Field>
      )}

      {error && <StyleError color="error">{error}</StyleError>}

      <Field>
        <StyleButton loading={loading} type="submit">
          SingIn
        </StyleButton>
      </Field>

      <Field>
        <StyleLink
          onClick={toggleIsLibrarian}
          bgColor="transparent"
          type="button"
        >
          Are you {!isLibrarian ? 'librarian' : 'student'}?
        </StyleLink>
      </Field>
    </Form>
  );
};

export default Login;
