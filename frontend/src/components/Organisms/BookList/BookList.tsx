import { useMemo, useState } from 'react';
import { useAuth } from 'context/auth';

import PATHS from 'utils/paths';
import useModal from 'hooks/useModal';
import { Grid } from 'components/Molecules/Grid';
import useMutationFetch from 'hooks/useMutationFetch';
import ModalConfirm from 'components/Molecules/Modals/ModalConfirm';
import CardBook, { BookItemProps } from 'components/Molecules/CardBook';
import { StyleWrapper } from './style';
import Title from '../../Atoms/Title';

interface BookProps {
  items: BookItemProps[];
  onEdit: (values: BookItemProps) => void;
  refetchData: () => void;
}

const BookList = ({ items, onEdit, refetchData }: BookProps) => {
  const { user, refetchReqBooks, requestBooks } = useAuth();
  const { isOpen, toggleModal } = useModal();
  const [idItem, setIdItem] = useState<string | undefined>();
  const isAdmin = user?.role === 'librarian';

  const [onDeleteBook, { loading: loadingDelete }] = useMutationFetch({
    path: PATHS.BOOKS,
    type: 'delete',
  });

  const [onRequestBook, { loading: loadingRequestBook }] = useMutationFetch({
    path: PATHS.REQUEST_BOOKS,
    type: 'post',
  });

  const onDelete = async () => {
    if (idItem) {
      await onDeleteBook({}, idItem);
      refetchData();
    }
  };

  const onRequestInternalBook = async () => {
    if (idItem) {
      await onRequestBook({ book: idItem, student: user?.id });
      refetchData();
      refetchReqBooks();
    }
  };

  const resolveAddItem = useMemo(() => {
    let output = {};
    requestBooks?.forEach((item) => {
      output = { ...output, [`${item.book.id}`]: true };
    });
    return output;
  }, [requestBooks]);
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
          <Grid.Row gutter={[{ sm: 0, md: 30 }, { sm: 30 }]}>
            {items.map((item) => (
              <Grid.Col key={item.id} sm={24} md={12}>
                <CardBook
                  id={item.id}
                  isAdmin={isAdmin}
                  image={item.image}
                  title={item.title}
                  author={item.author}
                  gender={item.gender}
                  stockBuy={item.stockBuy}
                  onEdit={() => onEdit(item)}
                  yearPublished={item.yearPublished}
                  stockAvailable={item.stockAvailable}
                  loading={loadingRequestBook || loadingDelete}
                  notActions={resolveAddItem.hasOwnProperty(item.id as string)}
                  onDelete={() => {
                    setIdItem(item?.id);
                    toggleModal();
                  }}
                  onRequestBook={() => {
                    setIdItem(item?.id);
                    toggleModal();
                  }}
                />
              </Grid.Col>
            ))}
          </Grid.Row>
        )}
      </StyleWrapper>

      <ModalConfirm
        isOpen={isOpen}
        toggleModal={toggleModal}
        onOk={isAdmin ? onDelete : onRequestInternalBook}
      />
    </>
  );
};
export default BookList;
