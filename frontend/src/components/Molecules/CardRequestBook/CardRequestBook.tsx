/* eslint-disable react/no-unused-prop-types */
import { BiBadgeCheck } from 'react-icons/bi';

import formatDate from 'utils/format';
import Text from 'components/Atoms/Text';
import Button from 'components/Atoms/Button';
import { Grid } from 'components/Molecules/Grid';
import { BookItemProps } from 'components/Molecules/CardBook';
import { StyleActions, StyleBookCard } from './style';

export interface RequestBookItemProps {
  id: string;
  createdAt: string;
  book: BookItemProps;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  returnDate: string;
  state: 'requested' | 'returned' | 'inactive';
}

interface CardRequestBookProps extends RequestBookItemProps {
  onReturned: (id: string) => void;
  onClick: (item: RequestBookItemProps) => void;
  isStudent?: boolean;
}

const CardRequestBook = (props: CardRequestBookProps) => {
  const { book, user, state, onReturned, onClick, returnDate, isStudent } =
    props;
  return (
    <StyleBookCard onClick={() => onClick(props)}>
      <Grid.Row gutter={[0, { sm: 20, lg: 0 }]}>
        <Grid.Col lg={10}>
          <Text fontWeight="bold">{user.firstName}</Text>
          <Text color="darkNine">{user.email}</Text>
        </Grid.Col>
        <Grid.Col lg={10}>
          <Text fontWeight="bold">Book/Author/Year</Text>
          <Text color="darkNine">
            {book.title} / {book.author} / {book.yearPublished}
          </Text>
        </Grid.Col>

        {state === 'requested' && !isStudent && (
          <Grid.Col lg={4}>
            <StyleActions>
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  e?.preventDefault();
                  onReturned(props.id);
                }}
                title="Check received"
                bgColor="transparent"
                labelColor="success"
              >
                <BiBadgeCheck />
              </Button>
            </StyleActions>
          </Grid.Col>
        )}

        {state === 'returned' && (
          <Grid.Col lg={4}>
            <Text fontWeight="bold">Returned At</Text>
            <Text color="darkNine">{formatDate(returnDate)}</Text>
          </Grid.Col>
        )}
      </Grid.Row>
    </StyleBookCard>
  );
};

export default CardRequestBook;
