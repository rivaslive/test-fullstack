import { useMemo, useState } from 'react';

import PATHS from 'utils/paths';
import useModal from 'hooks/useModal';
import useQueryFetch from 'hooks/useQueryFetch';
import Loading from 'components/Atoms/Loading';
import HeadPage from 'components/Molecules/HeadPage';
import UserList from 'components/Organisms/UserList';
import { UserItemProps } from 'components/Molecules/CardUser';
import ModalAddUser from 'components/Molecules/Modals/ModalAddUser';
import SearchAndSort from 'components/Molecules/SearchAndSort/SearchAndSort';

const sortItems = [
  {
    value: 'id:DESC',
    label: 'Latest first',
  },
  {
    value: 'id:ASC',
    label: 'Aged first',
  },
]

const UserTemplate = () => {
  const { toggleModal, isOpen } = useModal();
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const filters = useMemo(() => {
    return [
      {
        key: 'role',
        value: 'all',
      },
    ];
  }, []);

  const { data, loading, getData } = useQueryFetch<UserItemProps[]>({
    path: PATHS.USERS,
    filters,
  });

  const onOkModal = () => {
    getData().then();
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
    toggleModal();
  };

  return (
    <>
      <HeadPage onAdd={toggle} onRefresh={getData} title="List of Users" />

      <SearchAndSort
        placeholder="Search for name or email"
        onSearch={onSearch}
        sort={sort}
        sortItems={sortItems}
        onSort={onSort}
      />

      {!loading ? (
        <UserList
          items={
            data?.map((item) => ({
              ...item,
              name: `${item.firstName} ${item.lastName}`,
            })) ?? []
          }
        />
      ) : (
        <Loading />
      )}

      <ModalAddUser
        isOpen={isOpen}
        onOk={onOkModal}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default UserTemplate;
