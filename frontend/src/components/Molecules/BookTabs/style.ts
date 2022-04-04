import styled from 'styled-components';
import Button from 'components/Atoms/Button';
import { colors } from 'styles/theme/theme';

export const TabStyle = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.darkSix};
`;

export const TabItemStyle = styled(Button)<{ $isActive: boolean }>`
  &.app-btn {
    margin: 0 5px;
    border-radius: 12px 12px 0 0;
    background: ${({ $isActive }) => $isActive ? colors.primary : colors.darkSix};
    border-color: ${({ $isActive }) => $isActive ? colors.primary : colors.darkSix};
  }
`;
