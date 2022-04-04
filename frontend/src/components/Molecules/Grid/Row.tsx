import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useMemo,
} from 'react';
import { StyleRow } from './style';

export interface GutterType {
  sm: number;
  md: number;
  lg: number;
}

interface RowProps {
  children?: ReactNode;
  gutter?:
    | [number, number]
    | [Partial<GutterType> | number, Partial<GutterType> | number]; // [horizontal, vertical]
  className?: string;
}

const Row = ({ children, className, gutter = [0, 0] }: RowProps) => {
  const horizontalGutter = useMemo<Partial<GutterType>>(() => {
    return {
      sm: typeof gutter[0] === 'number' ? gutter[0] : gutter[0].sm,
      md:
        typeof gutter[0] === 'number'
          ? gutter[0]
          : gutter[0].md ?? gutter[0].sm,
      lg:
        typeof gutter[0] === 'number'
          ? gutter[0]
          : gutter[0].lg ?? gutter[0].md ?? gutter[0].sm,
    };
  }, [gutter]);

  const verticalGutter = useMemo<Partial<GutterType>>(() => {
    return {
      sm: typeof gutter[1] === 'number' ? gutter[1] : gutter[1].sm,
      md:
        typeof gutter[1] === 'number'
          ? gutter[1]
          : gutter[1].md ?? gutter[1].sm,
      lg:
        typeof gutter[1] === 'number'
          ? gutter[1]
          : gutter[1].lg ?? gutter[1].md ?? gutter[1].sm,
    };
  }, [gutter]);

  return (
    <StyleRow className={className}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as JSX.Element, {
            $gutter: {
              horizontal: {
                sm: horizontalGutter.sm ?? 0,
                md: horizontalGutter.md ?? 0,
                lg: horizontalGutter.lg ?? 0,
              },
              vertical: {
                sm: verticalGutter.sm ?? 0,
                md: verticalGutter.md ?? 0,
                lg: verticalGutter.lg ?? 0,
              },
            },
          });
        }
        return null;
      })}
    </StyleRow>
  );
};

export default Row;
