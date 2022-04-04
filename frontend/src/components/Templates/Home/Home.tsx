import { useState } from 'react';

import PATHS from 'utils/paths';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import BookList from 'components/Organisms/BookList';
import type { BookItemProps } from 'components/Molecules/CardBook';
import ModalAddOrUpdateBook from 'components/Molecules/Modals/ModalAddOrUpdateBook';
import SearchAndSort from 'components/Molecules/SearchAndSort/SearchAndSort';

const HomeTemplate = () => {
  const { toggleModal, isOpen } = useModal();
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [editItem, setEditItem] = useState<BookItemProps | undefined>();
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data, loading, getData } = useQueryFetch<BookItemProps[]>({
    path: PATHS.BOOKS,
  });

  const onOkModal = () => {
    getData().then();
  };

  const onEditBook = (values: BookItemProps) => {
    setEditItem(values);
    toggleModal();
  };

  const onSort = (newSort?: string) => {
    setSort(newSort);
    getData({
      filter: [
        {
          key: 'search',
          value: search,
        },
        {
          key: 'sort',
          value: newSort,
        },
      ],
    }).then();
  };

  const onSearch = (search?: string) => {
    setSearch(search);
    const sortFilter = sort ? { key: 'sort', value: sort } : null;
    getData({
      filter: [
        {
          key: 'search',
          value: search,
        },
        ...(sortFilter ? [sortFilter] : []),
      ],
    }).then();
  };

  const toggle = () => {
    setEditItem(undefined);
    toggleModal();
  };

  return (
    <>
      <HeadPage
        onAdd={toggle}
        onRefresh={getData}
        title="List of Books"
        description="Choose your book for request."
      />

      <SearchAndSort onSearch={onSearch} sort={sort} onSort={onSort} />

      {!loading ? (
        <BookList
          refetchData={getData}
          onEdit={onEditBook}
          items={data ?? []}
        />
      ) : (
        <Loading />
      )}

      <ModalAddOrUpdateBook
        isOpen={isOpen}
        key={`editing-${!!editItem}`}
        onOk={onOkModal}
        isUpdate={!!editItem}
        defaultValues={editItem}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default HomeTemplate;
