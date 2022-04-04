import { ReactNode } from 'react';
import { StyleWrapper } from './style';

const FadeIn = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <StyleWrapper className={`animate__animated animate__fadeIn ${className}`}>
      {children}
    </StyleWrapper>
  );
};

export default FadeIn;
