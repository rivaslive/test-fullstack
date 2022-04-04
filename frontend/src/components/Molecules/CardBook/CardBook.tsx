import Text from 'components/Atoms/Text';
import Button from 'components/Atoms/Button';
import {
  StyleBookContent,
  StyleBookImage,
  StyleBookCard,
  StyleBookBody,
  StyleNav,
  StyleImageWrapper,
  StyleImage,
  StyleInfo,
} from './style';

export interface BookItemProps {
  id?: string;
  title: string;
  author: string;
  yearPublished: string;
  gender: string;
  image: string;
  stockBuy: string;
  stockAvailable: string;
  notActions?: boolean;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onRequestBook?: () => void;
  loading?: boolean;
}

export const CardBook = ({
  title,
  author,
  yearPublished,
  stockBuy,
  stockAvailable,
  gender,
  image,
  isAdmin,
  onEdit,
  onDelete,
  notActions,
  loading,
  onRequestBook,
}: BookItemProps) => {
  return (
    <StyleBookCard>
      <StyleBookBody>
        {/* image */}
        <StyleBookImage>
          <StyleImageWrapper>
            <StyleImage loading="lazy" src={image} alt="" />
          </StyleImageWrapper>
        </StyleBookImage>
        {/* end image */}

        <StyleBookContent>
          <StyleNav>
            <Text fontWeight="600" size={20} lineHeight={30} title={title}>
              {title}
            </Text>
            <Text size={16} lineHeight={26} color="darkNine" title={author}>
              <b>Author:</b> {author}
            </Text>
            <Text size={16} lineHeight={26} color="darkNine">
              <b>Gender:</b> {gender}
            </Text>
            <Text size={16} lineHeight={26} color="darkNine">
              <b>Year:</b> {yearPublished}
            </Text>

            <StyleInfo>
              <Text size={16} lineHeight={26} color="white">
                <b>Total:</b> {stockBuy}
              </Text>

              <Text className="ml-1" size={16} lineHeight={26} color="white">
                <b>Available:</b> {stockAvailable}
              </Text>
            </StyleInfo>

            {!notActions && (
              <StyleInfo>
                {isAdmin ? (
                  <>
                    <Button
                      onClick={onEdit}
                      className="ml-1"
                      bgColor="primaryOpacity"
                      labelColor="primary"
                      disabled={loading}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={onDelete}
                      loading={loading}
                      className="ml-1"
                      bgColor="errorOpacity"
                      labelColor="error"
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button loading={loading} onClick={onRequestBook}>
                    Get now
                  </Button>
                )}
              </StyleInfo>
            )}
          </StyleNav>
        </StyleBookContent>
      </StyleBookBody>
    </StyleBookCard>
  );
};

export default CardBook;
