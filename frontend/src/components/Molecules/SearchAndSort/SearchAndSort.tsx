import { BiSortDown } from 'react-icons/bi';

import useModal from 'hooks/useModal';
import ModalSort, {
  SortItemProps,
} from 'components/Molecules/Modals/ModalSort';
import { StyleFilter, StyleSearch, StyleWrapper } from './style';

interface SearchAndSortProps {
  placeholder?: string;
  sort?: string;
  sortItems?: SortItemProps[];
  onSearch?: (value?: string) => void;
  onSort?: (value?: string) => void;
}

function SearchAndSort({
  onSearch,
  onSort,
  sort,
  sortItems,
  placeholder = 'Title, author or gender',
}: SearchAndSortProps) {
  const { isOpen, toggleModal } = useModal();

  return (
    <StyleWrapper>
      <StyleSearch
        onSearch={onSearch}
        bgColor="darkSix"
        placeholder={placeholder}
      />
      <StyleFilter bgColor="transparent" onClick={toggleModal}>
        <BiSortDown />
      </StyleFilter>

      <ModalSort
        sort={sort}
        onOk={onSort}
        isOpen={isOpen}
        sortItems={sortItems}
        toggleModal={toggleModal}
      />
    </StyleWrapper>
  );
}

export default SearchAndSort;
