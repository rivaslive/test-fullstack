import { useState } from 'react';

import PATHS from 'utils/paths';
import useModal from 'hooks/useModal';
import { useAuth } from 'context/auth';
import Title from 'components/Atoms/Title';
import { Grid } from 'components/Molecules/Grid';
import useMutationFetch from 'hooks/useMutationFetch';
import ModalConfirm from 'components/Molecules/Modals/ModalConfirm';
import CardRequestBook, {
  RequestBookItemProps,
} from 'components/Molecules/CardRequestBook';
import ModalViewRequestBook from 'components/Molecules/Modals/ModalViewRequestBook';

import { StyleWrapper } from './style';

interface BookProps {
  items: RequestBookItemProps[];
  refetchData: () => void;
}

type RequestMutation = { userId?: string };

const RequestBookList = ({ items, refetchData }: BookProps) => {
  const { isOpen, toggleModal } = useModal();
  const { user } = useAuth();
  const { isOpen: isOpenConfirm, toggleModal: toggleConfirm } = useModal();
  const [item, setItem] = useState<RequestBookItemProps | null>(null);
  const [idItem, setIdItem] = useState<string | undefined>();

  const [onReturnBook, { loading }] = useMutationFetch<any, RequestMutation>({
    path: PATHS.REQUEST_BOOKS,
    type: 'put',
  });

  const onDelete = async () => {
    if (idItem) {
      await onReturnBook(
        {
          userId: user?.id,
        },
        idItem
      );
      refetchData();
    }
  };

  const onClickCard = (item: RequestBookItemProps) => {
    if (item) {
      setItem(item);
      toggleModal();
    }
  };

  return (
    <>
      <StyleWrapper>
        {!items.length ? (
          <Title
            size={30}
            align="center"
            color="gradientText"
            style={{ marginTop: 50 }}
          >
            Not data
          </Title>
        ) : (
          <Grid.Row gutter={[0, { sm: 10 }]}>
            {items.map((item) => (
              <Grid.Col key={item.id} sm={24}>
                <CardRequestBook
                  id={item.id}
                  book={item.book}
                  user={item.user}
                  state={item.state}
                  onClick={onClickCard}
                  createdAt={item.createdAt}
                  returnDate={item.returnDate}
                  isStudent={user?.role === 'student'}
                  onReturned={() => {
                    setIdItem(item.id);
                    toggleConfirm();
                  }}
                />
              </Grid.Col>
            ))}
          </Grid.Row>
        )}
      </StyleWrapper>

      <ModalConfirm
        onOk={onDelete}
        loading={loading}
        okText="Return Book"
        isOpen={isOpenConfirm}
        toggleModal={toggleConfirm}
        description="This book has already been delivered and will increase its stock"
      />

      <ModalViewRequestBook
        item={item}
        isOpen={isOpen}
        onOk={toggleConfirm}
        toggleModal={toggleModal}
        isStudent={user?.role === 'student'}
      />

    </>
  );
};

export default RequestBookList;
