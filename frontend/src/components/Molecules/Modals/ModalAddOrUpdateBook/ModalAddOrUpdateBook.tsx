import { useEffect, useState } from 'react';
import Form, { Field } from 'rc-field-form';
import { InternalNamePath } from 'rc-field-form/es/interface';

import PATHS from 'utils/paths';
import Text from 'components/Atoms/Text';
import Input from 'components/Atoms/Input';
import Modal from 'components/Atoms/Modal';
import useMutationFetch from 'hooks/useMutationFetch';
import { Grid } from 'components/Molecules/Grid';

import { ModalContent, StyleButton } from './style';

export interface NewBookValues {
  id?: string;
  title: string;
  image: string;
  author: string;
  yearPublished: string;
  gender: string;
  stockBuy: string;
  stockAvailable: string;
}

interface ModalAddBookProps {
  isOpen: boolean;
  toggleModal: () => void;
  onOk?: () => void;
  isUpdate?: boolean;
  defaultValues?: NewBookValues;
}

const defaultErrors: NewBookValues = {
  title: '',
  image: '',
  author: '',
  yearPublished: '',
  gender: '',
  stockBuy: '',
  stockAvailable: '',
};

function ModalAddOrUpdateBook({
  isOpen,
  toggleModal,
  onOk,
  defaultValues,
  isUpdate,
}: ModalAddBookProps) {
  const [onCreateBook, { loading }] = useMutationFetch<any, NewBookValues>({
    path: PATHS.BOOKS,
  });

  const [onUpdateBook, { loading: loadingUpdated }] = useMutationFetch<
    any,
    NewBookValues
  >({
    path: PATHS.BOOKS,
    type: 'put',
  });

  const [form] = Form.useForm();
  const [errors, setErrors] = useState<NewBookValues>(defaultErrors);

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

  useEffect(() => {
    if (isOpen && form) {
      form.setFieldsValue(defaultValues ?? {});
    }
  }, [defaultValues, isOpen, form]);

  const onFinish = async (values: NewBookValues) => {
    let res;
    if (isUpdate) {
      res = await onUpdateBook(values, defaultValues?.id);
    } else {
      res = await onCreateBook(values);
    }
    if (res && onOk) {
      onOk();
    }
    toggleModal();
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
              <Field name="title" rules={[{ required: true }]}>
                <Input
                  name="title"
                  label="Title"
                  placeholder="Insert book name"
                  bgColor="darkSix"
                  error={errors?.title}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field name="image" rules={[{ required: true }]}>
                <Input
                  name="image"
                  label="Image"
                  placeholder="Insert image url"
                  bgColor="darkSix"
                  error={errors?.image}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field name="author" rules={[{ required: true }]}>
                <Input
                  name="author"
                  label="Author"
                  placeholder="Insert author name"
                  bgColor="darkSix"
                  error={errors?.author}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field name="yearPublished" rules={[{ required: true }]}>
                <Input
                  name="yearPublished"
                  label="Year Published"
                  placeholder="YYYY"
                  bgColor="darkSix"
                  error={errors?.yearPublished}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={12}>
              <Field name="gender" rules={[{ required: true }]}>
                <Input
                  name="gender"
                  label="Gender"
                  placeholder="Insert book gender"
                  bgColor="darkSix"
                  error={errors?.gender}
                />
              </Field>
            </Grid.Col>

            <Grid.Col sm={24} md={isUpdate ? 12 : 24}>
              <Field name="stockBuy" rules={[{ required: true }]}>
                <Input
                  name="stockBuy"
                  label="Total Items"
                  placeholder="Insert total items"
                  bgColor="darkSix"
                  error={errors?.stockBuy}
                />
              </Field>
            </Grid.Col>

            {isUpdate && (
              <Grid.Col sm={24} md={12}>
                <Field name="stockAvailable" rules={[{ required: true }]}>
                  <Input
                    name="stockAvailable"
                    label="Items Available"
                    placeholder="Insert items available"
                    bgColor="darkSix"
                    error={errors?.stockAvailable}
                  />
                </Field>
              </Grid.Col>
            )}

            <Grid.Col sm={24} md={12}>
              <Field>
                <StyleButton
                  bgColor="error"
                  type="button"
                  disabled={loading || loadingUpdated}
                  onClick={toggleModal}
                >
                  Cancel
                </StyleButton>
              </Field>
            </Grid.Col>
            <Grid.Col sm={24} md={12}>
              <Field>
                <StyleButton loading={loading || loadingUpdated} type="submit">
                  {isUpdate ? 'Edit' : 'Save'}
                </StyleButton>
              </Field>
            </Grid.Col>
          </Grid.Row>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddOrUpdateBook;
