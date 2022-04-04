import { ReactNode } from 'react';

import { BiPlusCircle, BiRevision } from 'react-icons/bi';
import { useAuth } from 'context/auth';
import Text from 'components/Atoms/Text';

import Title from 'components/Atoms/Title';
import {ActionsStyle, ButtonStyle, HeadPageContent, HeadPageStyle} from './style';

interface HeadPageProps {
  title: string;
  description?: string;
  extra?: ReactNode;
  notAdd?: boolean;
  onAdd?: () => void | Promise<void>;
  onRefresh?: () => void | Promise<void>;
}

const HeadPage = ({
  title,
  description,
  onAdd,
  extra,
  onRefresh,
  notAdd = false,
}: HeadPageProps) => {
  const { user } = useAuth();

  return (
    <HeadPageStyle>
      <HeadPageContent>
        <Title color="gradientText">{title}</Title>
        {description && <Text>{description}</Text>}
      </HeadPageContent>

      {user?.role === 'librarian' && (
        <ActionsStyle>
          <ButtonStyle bgColor="primaryOpacity" onClick={onRefresh}>
            <BiRevision /> Refresh
          </ButtonStyle>

          {extra}

          {!notAdd && (
            <ButtonStyle onClick={onAdd}>
              <BiPlusCircle /> Add
            </ButtonStyle>
          )}
        </ActionsStyle>
      )}
    </HeadPageStyle>
  );
};

export default HeadPage;
