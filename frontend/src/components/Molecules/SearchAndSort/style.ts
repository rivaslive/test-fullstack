import styled from 'styled-components';
import Input from 'components/Atoms/Input';
import Button from 'components/Atoms/Button';
import {mediaQueries} from 'styles/theme/theme';

export const StyleWrapper = styled.div`
  margin: 40px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleSearch = styled(Input.Search)`
  &.app-input-search {
    width: 250px;
    max-width: 100%;

    ${mediaQueries.tablet} {
      width: 300px;
    }
  }
`;

export const StyleFilter = styled(Button)`
  &.app-btn {
    padding: 0 7px;
    margin-left: 10px;
    font-size: 22px;
  }
`;
