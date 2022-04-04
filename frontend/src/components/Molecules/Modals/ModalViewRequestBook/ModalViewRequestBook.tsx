import Text from 'components/Atoms/Text';
import Modal from 'components/Atoms/Modal';
import { Grid } from 'components/Molecules/Grid';
import { CardBook } from 'components/Molecules/CardBook';
import { RequestBookItemProps } from 'components/Molecules/CardRequestBook';

import { ModalContent, StyleButton } from './style';

interface ModalAddBookProps {
  item: RequestBookItemProps | null;
  isOpen: boolean;
  toggleModal: () => void;
  onOk?: () => void;
  loading?: boolean;
  isStudent?: boolean;
}

function ModalViewRequestBook({
  isOpen,
  toggleModal,
  onOk,
  loading,
  item,
  isStudent,
}: ModalAddBookProps) {
  return (
    <Modal isOpen={isOpen} onCancel={toggleModal}>
      <Text fontWeight="bold" size={20}>
        Request description
      </Text>

      <ModalContent>
        <Grid.Row gutter={[20, 20]}>
          <Grid.Col sm={24}>
            <Text>
              <b>Student:</b> {item?.user?.firstName} {item?.user?.lastName}
            </Text>
          </Grid.Col>
          <Grid.Col sm={24}>
            <Text>
              <b>Email:</b> {item?.user?.email}
            </Text>
          </Grid.Col>
          <Grid.Col sm={24}>
            <Text>
              <b>Date:</b> {item?.createdAt}
            </Text>
          </Grid.Col>

          {item?.book && (
            <Grid.Col sm={24}>
              <CardBook notActions {...item?.book} />
            </Grid.Col>
          )}

          {item?.state === 'requested' && (
            <>
              <Grid.Col sm={24} md={12}>
                <StyleButton
                  disabled={loading}
                  onClick={toggleModal}
                  bgColor="primaryOpacity"
                >
                  Cancel
                </StyleButton>
              </Grid.Col>
              {!isStudent && (
                <Grid.Col sm={24} md={12}>
                  <StyleButton loading={loading} onClick={onOk}>
                    Returned Book
                  </StyleButton>
                </Grid.Col>
              )}
            </>
          )}
        </Grid.Row>
      </ModalContent>
    </Modal>
  );
}

export default ModalViewRequestBook;
