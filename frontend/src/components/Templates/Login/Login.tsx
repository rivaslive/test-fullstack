import { BsFillBookmarkFill } from 'react-icons/bs';

import Text from 'components/Atoms/Text';
import Title from 'components/Atoms/Title';
import Login from 'components/Organisms/Login';

import { StyleBrandWrapper, LoginWrapperStyle, StyleContent } from './style';

const LoginTemplate = () => {
  return (
    <LoginWrapperStyle>
      <StyleBrandWrapper>
        <BsFillBookmarkFill />
        <Text size={24} color="white" fontWeight="700">
          Library
        </Text>
      </StyleBrandWrapper>

      <StyleContent>
        <Title color="white" align="center">
          Login
        </Title>
        <Text color="white" align="center">
          Insert your email for request book
        </Text>

        {/* login form */}
        <Login />
        {/* end login form */}
      </StyleContent>
    </LoginWrapperStyle>
  );
};

export default LoginTemplate;
