import styled from 'styled-components';
import { colors } from 'styles/theme/theme';
import Container from 'components/Atoms/Container';

export const StyleWrapper = styled.div`
  width: 100%;
  display: block;
  background-color: ${colors.black};

  &:after {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    background: url('/img/gradient-right-dark.svg') no-repeat center center;
    background-size: contain;
    z-index: 1;
  }
`;


export const StyleBody = styled(Container)`
  height: 100%;
  min-height: 100vh;
  padding-top: 0;
  background-color: ${colors.black};
  z-index: 5;
`;

export const StyleContent = styled.div`
  position: relative;
  padding-top: 40px;
  z-index: 5;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 90px;
  }
`;
