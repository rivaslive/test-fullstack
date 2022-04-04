import Text from 'components/Atoms/Text';
import Button from 'components/Atoms/Button';
import { Grid } from 'components/Molecules/Grid';
import { StyleBookCard, StyleActions } from '../CardRequestBook/style';

export interface UserItemProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'librarian';
}

const CardUser = (props: UserItemProps) => {
  const { firstName, lastName, email, role } = props;
  return (
    <StyleBookCard>
      <Grid.Row gutter={[0, { sm: 20, lg: 0 }]}>
        <Grid.Col lg={7}>
          <Text fontWeight="bold">{firstName}</Text>
          <Text color="darkNine">First Name</Text>
        </Grid.Col>
        <Grid.Col lg={7}>
          <Text fontWeight="bold">{lastName}</Text>
          <Text color="darkNine">Last Name</Text>
        </Grid.Col>
        <Grid.Col lg={7}>
          <Text fontWeight="bold">{email}</Text>
          <Text color="darkNine">Email</Text>
        </Grid.Col>
        <Grid.Col lg={3}>
          <StyleActions>
            <Button
              bgColor={role === 'student' ? 'primaryOpacity' : 'pinkOpacity'}
              style={{ padding: '0 10px', fontSize: 12, borderRadius: 30 }}
            >
              {role}
            </Button>
          </StyleActions>
        </Grid.Col>
      </Grid.Row>
    </StyleBookCard>
  );
};

export default CardUser;
