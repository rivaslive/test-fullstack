import styled, { keyframes } from 'styled-components';
import { colors } from 'styles/theme/theme';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyleLoading = styled.div`
  margin: 20px auto;
  text-align: center;
  color: ${colors.primary};
  font-size: 30px;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;
