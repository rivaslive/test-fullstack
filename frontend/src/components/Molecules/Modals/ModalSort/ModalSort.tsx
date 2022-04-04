import { ChangeEvent, useEffect } from 'react';
import Form, { Field } from 'rc-field-form';

import Text from 'components/Atoms/Text';
import Modal from 'components/Atoms/Modal';
import { Grid } from 'components/Molecules/Grid';

import { ModalContent, StyleButton, StyleGroup, StyleRadius } from './style';

export interface SortItemProps {
  label: string;
  value: string;
}

interface ModalAddBookProps {
  isOpen: boolean;
  toggleModal: () => void;
  sort?: string;
  sortItems?: SortItemProps[];
  onOk?: (sort: string) => void;
}

export const defaultSortData = [
  {
    value: 'title:ASC',
    label: 'Title Ascendant',
  },
  {
    value: 'title:DESC',
    label: 'Title Descendant',
  },
  {
    value: 'id:DESC',
    label: 'Latest first',
  },
  {
    value: 'id:ASC',
    label: 'Aged first',
  },
];
const RadioSort = ({
  value,
  onChange,
  sortData,
}: {
  onChange?: (val?: string) => void;
  value?: string;
  sortData?: SortItemProps[];
}) => {
  const onInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };

  return (
    <StyleGroup>
      {sortData?.map(({ value: val, label }) => (
        <StyleRadius>
          <input
            onChange={onInternalChange}
            type="radio"
            name="sort"
            value={val}
            checked={val === value}
          />
          {label}
        </StyleRadius>
      ))}
    </StyleGroup>
  );
};

function ModalSort({
  isOpen,
  toggleModal,
  onOk,
  sort,
  sortItems = defaultSortData,
}: ModalAddBookProps) {
  const [form] = Form.useForm();

  const onFinish = (values: { sort: string }) => {
    onOk && onOk(values.sort);
    toggleModal();
  };

  useEffect(() => {
    form?.setFieldsValue({
      sort,
    });
  }, [form, sort]);

  return (
    <Modal isOpen={isOpen} onCancel={toggleModal}>
      <Text fontWeight="bold" size={20}>
        Sort
      </Text>

      <ModalContent>
        <Text fontWeight="bold">How do you want order elements?</Text>

        <Form onFinish={onFinish} form={form}>
          <Field name="sort" rules={[{ required: true }]}>
            <RadioSort sortData={sortItems} />
          </Field>
        </Form>

        <Grid.Row
          gutter={[
            { sm: 0, md: 30 },
            { sm: 10, md: 0 },
          ]}
        >
          <Grid.Col sm={24} md={12}>
            <StyleButton onClick={toggleModal} bgColor="errorOpacity">
              Cancel
            </StyleButton>
          </Grid.Col>
          <Grid.Col sm={24} md={12}>
            <StyleButton onClick={form?.submit}>Apply</StyleButton>
          </Grid.Col>
        </Grid.Row>
      </ModalContent>
    </Modal>
  );
}

export default ModalSort;
