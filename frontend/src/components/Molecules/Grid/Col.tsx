import { ColGutter, StyleCol } from './style';

interface RowProps {
  children: JSX.Element[] | JSX.Element;
  sm?: number;
  md?: number;
  lg?: number;
  className?: string;
  $gutter?: ColGutter;
}

const Col = ({
  children,
  className,
  sm = 24,
  md = sm ?? 24,
  lg = md ?? 24,
  $gutter = {
    horizontal: {
      sm: 0,
      md: 0,
      lg: 0,
    },
    vertical: {
      sm: 0,
      md: 0,
      lg: 0,
    }
  },
}: RowProps) => {

  return (
    <StyleCol
      $gutter={$gutter}
      className={className}
      $sm={sm}
      $md={md}
      $lg={lg}
    >
      {children}
    </StyleCol>
  );
};

export default Col;
