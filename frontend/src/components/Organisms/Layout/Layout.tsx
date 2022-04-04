import { ReactNode } from 'react';

import Navbar from 'components/Organisms/Navbar';
import { StyleBody, StyleContent, StyleWrapper } from './style';

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <StyleWrapper>
      <StyleBody>
        <Navbar />
        <StyleContent>{children}</StyleContent>
      </StyleBody>
    </StyleWrapper>
  );
};

export default Layout;
