import { useState } from 'react';
import Form, { Field } from 'rc-field-form';
import { InternalNamePath } from 'rc-field-form/es/interface';

import PATHS from 'utils/paths';
import { useAuth } from 'context/auth';
import Text from 'components/Atoms/Text';
import Modal from 'components/Atoms/Modal';
import useQueryFetch from 'hooks/useQueryFetch';
import { Grid } from 'components/Molecules/Grid';
import Select from 'components/Atoms/Select/Select';
import useMutationFetch from 'hooks/useMutationFetch';

import { ModalContent, StyleButton, StyleFlex } from './style';

interface ModalAddBookProps {
  isOpen: boolean;
  toggleModal: () => void;
  onOk?: () => void;
}

interface RequestUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface RequestBook {
  id: string;
  title: string;
  author: string;
  stockAvailable: number;
  yearPublished: string;
}

export interface FormValues {
  user?: string;
  book: string;
  student?: string;
}

const defaultErrors: FormValues = {
  user: '',
  student: '',
  book: '',
};

function ModalAddRequestBook({ isOpen, toggleModal, onOk }: ModalAddBookProps) {
  const { user } = useAuth();
  const [onCreateRequestBook, { loading }] = useMutationFetch<any, FormValues>({
    path: PATHS.REQUEST_BOOKS,
    type: 'post',
  });
  const { data: dataUsers, loading: loadingUsers } = useQueryFetch<
    RequestUser[]
  >({
    path: PATHS.USERS,
  });
  const { data: dataBooks, loading: loadingBooks } = useQueryFetch<
    RequestBook[]
  >({
    path: PATHS.BOOKS,
  });

  const [form] = Form.useForm();
  const [errors, setErrors] = useState<FormValues>(defaultErrors);

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
    const res = await onCreateRequestBook({ ...values, user: user?.id });
    if (res && onOk) {
      onOk();
      toggleModal();
    } else {
      setErrors((prevState) => ({
        ...prevState,
        book: 'Error creating request book',
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onCancel={toggleModal}>
      <Text fontWeight="bold" size={20}>
        Add Book
      </Text>

      <ModalContent>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <Grid.Row gutter={[20, 20]}>
            <Grid.Col sm={24}>
              <Field name="student" rules={[{ required: true }]}>
                <Select
                  loading={loadingBooks}
                  label="Student"
                  error={errors?.student}
                >
                  {dataUsers?.map((user) => (
                    <Select.Option key={user.id} value={user.id}>
                      <StyleFlex>
                        <Text fontWeight="bold">
                          {user.firstName} {user.lastName}
                        </Text>
                        <Text>{user.email}</Text>
                      </StyleFlex>
                    </Select.Option>
                  ))}
                </Select>
              </Field>
            </Grid.Col>

            <Grid.Col sm={24}>
              <Field name="book" rules={[{ required: true }]}>
                <Select
                  label="Book"
                  loading={loadingUsers}
                  error={errors?.book}
                >
                  {dataBooks?.map((book) => {
                    if (book.stockAvailable > 0) {
                      return (
                        <Select.Option key={book.id} value={book.id}>
                          <StyleFlex>
                            <Text fontWeight="bold">{book.title}</Text>
                            <Text>
                              {book.author} {book.yearPublished}
                            </Text>
                          </StyleFlex>
                        </Select.Option>
                      );
                    }
                    return null;
                  })}
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
                  Save
                </StyleButton>
              </Field>
            </Grid.Col>
          </Grid.Row>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddRequestBook;
