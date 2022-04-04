import { useState } from 'react';
import Form, { Field } from 'rc-field-form';
import { InternalNamePath } from 'rc-field-form/es/interface';

import PATHS from 'utils/paths';
import Text from 'components/Atoms/Text';
import Input from 'components/Atoms/Input';
import Modal from 'components/Atoms/Modal';
import { Grid } from 'components/Molecules/Grid';
import useMutationFetch from 'hooks/useMutationFetch';

import { ModalContent, StyleButton } from './style';
import Select from '../../../Atoms/Select/Select';

interface ModalAddBookProps {
  isOpen: boolean;
  toggleModal: () => void;
  onOk?: () => void;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const defaultErrors: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
};

function ModalAddUser({ isOpen, toggleModal, onOk }: ModalAddBookProps) {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<FormValues>(defaultErrors);
  const [onCreateRequestBook, { loading }] = useMutationFetch<any, FormValues>({
    path: PATHS.USERS,
    type: 'post',
  });

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

  const onFinish = async (values: FormValues) => {
    const res = await onCreateRequestBook(values);
    if (res) {
      toggleModal();
      onOk && onOk();
    } else {
      setErrors((prevState) => ({
        ...prevState,
        role: 'Error creating the new user',
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onCancel={toggleModal}>
      <Text fontWeight="bold" size={20}>
        Add User
      </Text>

      <ModalContent>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <Grid.Row gutter={[20, 20]}>
            <Grid.Col sm={24} md={12}>
              <Field name="firstName" rules={[{ required: true }]}>
                <Input
                  label="First Name"
                  placeholder="First Name"
                  error={errors?.firstName}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field name="lastName" rules={[{ required: true }]}>
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  error={errors?.lastName}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field
                name="email"
                rules={[
                  { required: true },
                  { type: 'email', message: 'Insert a valid email' },
                ]}
              >
                <Input
                  label="Email"
                  placeholder="example@mail.com"
                  error={errors?.email}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field name="role">
                <Select defaultValue="student" label="Role" error={errors?.role}>
                  <Select.Option value="student">Student</Select.Option>
                  <Select.Option value="librarian">Librarian</Select.Option>
                </Select>
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field>
                <StyleButton
                  bgColor="error"
                  type="button"
                  disabled={loading}
                  onClick={toggleModal}
                >
                  Cancel
                </StyleButton>
              </Field>
            </Grid.Col>
            <Grid.Col sm={24} md={12}>
              <Field>
                <StyleButton loading={loading} type="submit">
                  Create
                </StyleButton>
              </Field>
            </Grid.Col>
          </Grid.Row>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddUser;
