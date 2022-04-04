import styled from 'styled-components';
import Button from 'components/Atoms/Button';
import { colors } from 'styles/theme/theme';

export const ModalContent = styled.div`
  margin-top: 30px;
  width: 450px;
  max-width: 100%;
`;

export const StyleButton = styled(Button)`
  width: 100%;
`;

export const StyleGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StyleRadius = styled.label`
  display: flex;
  position: relative;
  width: 150px;
  margin: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  min-height: 75px;
  padding: 20px 7px 7px;
  border-radius: 12px;
  background: ${colors.darkSix};

  input {
    display: block;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;
