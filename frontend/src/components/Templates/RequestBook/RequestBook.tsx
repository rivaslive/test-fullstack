import { useMemo, useState } from 'react';

import PATHS from 'utils/paths';
import { useAuth } from 'context/auth';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import BookTabs, { TabType } from 'components/Molecules/BookTabs';
import RequestBookList from 'components/Organisms/RequestBookList';
import type { RequestBookItemProps } from 'components/Molecules/CardRequestBook';
import ModalAddRequestBook from 'components/Molecules/Modals/ModalAddRequestBook';

const RequestBookTemplate = () => {
  const { user } = useAuth();
  const { toggleModal, isOpen } = useModal();
  const [status, setStatus] = useState<TabType>('requested');
  const filters = useMemo(() => {
    if (user?.role === 'student') {
      return [
        {
          key: 'student',
          value: user.id,
        },
      ];
    }
    return [];
  }, [user?.id, user?.role]);

  const { data, loading, getData } = useQueryFetch<RequestBookItemProps[]>({
    path: PATHS.REQUEST_BOOKS,
    filters,
  });

  const onOkModal = () => {
    getData().then();
  };

  const toggle = () => {
    setStatus('requested');
    toggleModal();
  };

  const requestBooksData = useMemo(() => {
    if (!data?.length) return [];
    return data.filter((item) => item.state === status);
  }, [data, status]);

  return (
    <>
      <HeadPage
        onAdd={toggle}
        onRefresh={getData}
        title="Requested books"
        description="Choose your request book for return."
      />

      <BookTabs activeKey={status} onChange={setStatus} />

      {!loading ? (
        <RequestBookList refetchData={getData} items={requestBooksData} />
      ) : (
        <Loading />
      )}

      <ModalAddRequestBook
        onOk={onOkModal}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default RequestBookTemplate;
