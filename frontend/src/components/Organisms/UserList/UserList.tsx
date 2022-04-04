import Title from 'components/Atoms/Title';
import { Grid } from 'components/Molecules/Grid';
import CardUser, { UserItemProps } from 'components/Molecules/CardUser';
import { StyleWrapper } from './style';

interface BookProps {
  items: UserItemProps[];
}

const UserList = ({ items }: BookProps) => {
  return (
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
        <Grid.Row gutter={[0, 15]}>
          {items.map((item) => (
            <Grid.Col key={item.id} sm={24}>
              <CardUser
                id={item.id}
                email={item.email}
                firstName={item.firstName}
                lastName={item.lastName}
                role={item.role}
              />
            </Grid.Col>
          ))}
        </Grid.Row>
      )}
    </StyleWrapper>
  );
};

export default UserList;
