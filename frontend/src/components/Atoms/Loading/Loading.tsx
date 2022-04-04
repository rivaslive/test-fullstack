import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// styles
import { StyleLoading } from './style';

interface LoadingProps {
  className?: string;
}

const Loading = (props: LoadingProps) => (
  <StyleLoading {...props}>
    <AiOutlineLoading3Quarters />
  </StyleLoading>
);

export default Loading;
