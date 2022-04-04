import styled from 'styled-components';

import Text from 'components/Atoms/Text';
import Input from 'components/Atoms/Input';
import Button from 'components/Atoms/Button';

export const StyleInput = styled(Input)`
  width: 100%;
  margin-top: 20px;
`;

export const StyleError = styled(Text)`
  &.app-text {
    width: 100%;
    margin-top: 10px;
  }
`;

export const StyleButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

export const StyleLink = styled(Button)`
  &.app-btn {
    padding: 0;
    display: block;
    width: 100%;
    margin-top: 10px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    text-align: left;
  }
`;
