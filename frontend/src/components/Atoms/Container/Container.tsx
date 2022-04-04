import { CSSProperties, ReactNode } from 'react';

// styles
import { StyleContainer } from './style';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  withTopPadding?: boolean;
  isInternal?: boolean;
  style?: CSSProperties;
  id?: string;
}

function Container({
  children,
  id,
  style,
  className,
  isInternal = false,
  withTopPadding = true,
}: ContainerProps) {
  return (
    <StyleContainer
      $isInternal={isInternal}
      $withTopPadding={withTopPadding}
      id={id}
      className={className}
      style={style}
    >
      {children}
    </StyleContainer>
  );
}

export default Container;
