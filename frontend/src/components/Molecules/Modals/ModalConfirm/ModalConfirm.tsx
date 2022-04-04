import Text from 'components/Atoms/Text';
import Modal from 'components/Atoms/Modal';
import { Grid } from 'components/Molecules/Grid';

import { ModalContent, StyleButton } from './style';

interface ModalAddBookProps {
  title?: string;
  okText?: string;
  cancelText?: string;
  description?: string;
  isOpen: boolean;
  toggleModal: () => void;
  onOk?: () => void;
  loading?: boolean;
}

function ModalConfirm({
  isOpen,
  toggleModal,
  onOk,
  loading,
  description,
  okText = 'Confirm',
  cancelText = 'Cancel',
  title = 'Are you sure to continue?',
}: ModalAddBookProps) {
  return (
    <Modal isOpen={isOpen} onCancel={toggleModal}>
      <Text fontWeight="bold" size={20}>
        Confirm Action
      </Text>

      <ModalContent>
        <Text fontWeight="bold">{title}</Text>
        {description && <Text>{description}</Text>}

        <Grid.Row
          gutter={[
            { sm: 0, md: 30 },
            { sm: 10, md: 0 },
          ]}
        >
          <Grid.Col sm={24} md={12}>
            <StyleButton
              disabled={loading}
              onClick={toggleModal}
              bgColor="primaryOpacity"
            >
              {cancelText}
            </StyleButton>
          </Grid.Col>
          <Grid.Col sm={24} md={12}>
            <StyleButton loading={loading} bgColor="error" onClick={onOk}>
              {okText}
            </StyleButton>
          </Grid.Col>
        </Grid.Row>
      </ModalContent>
    </Modal>
  );
}

export default ModalConfirm;
