import { Link } from 'react-router-dom';
import { BsFillBookmarkFill } from 'react-icons/bs';

import { ROUTES } from 'routes/paths';
import Text from 'components/Atoms/Text';
import Title from 'components/Atoms/Title';
import Button from 'components/Atoms/Button';

import {
  LoginWrapperStyle,
  StyleBrandWrapper,
  StyleContent,
} from 'components/Templates/Login/style';

const NotFoundPage = () => {
  return (
    <LoginWrapperStyle>
      <StyleBrandWrapper>
        <BsFillBookmarkFill />
        <Text size={24} color="white" fontWeight="700">
          Library
        </Text>
      </StyleBrandWrapper>

      <StyleContent>
        <Title size={64} color="white" align="center">
          404 Not Found
        </Title>
        <Link
          to={ROUTES.HOME}
          style={{ display: 'block', textAlign: 'center' }}
        >
          <Button>Go to home</Button>
        </Link>
      </StyleContent>
    </LoginWrapperStyle>
  );
};

export default NotFoundPage;
