import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { BsFillBookmarkFill, BsXCircleFill } from 'react-icons/bs';

import { ROUTES } from 'routes/paths';
import { useAuth } from 'context/auth';
import useModal from 'hooks/useModal';
import Text from 'components/Atoms/Text';

import {
  StyleBrandWrapper,
  StyleBurgerMobile,
  StyleFlex,
  StyleLink,
  StyleMenuBody,
  StyleMenuClose,
  StyleMenuWrapper,
  StyleNav,
} from './style';

interface MenuProps {
  toggle?: () => void;
  logout?: () => void;
  isLibrarian: boolean;
  countReq?: number | null;
}

const Menu = ({ toggle, logout, isLibrarian, countReq }: MenuProps) => (
  <>
    <NavLink
      to={ROUTES.HOME}
      onClick={toggle}
      className={({ isActive }) => (isActive ? 'link-active' : '')}
    >
      <StyleLink bgColor="transparent" labelColor="white">
        Books
      </StyleLink>
    </NavLink>

    <NavLink
      to={ROUTES.REQUEST}
      onClick={toggle}
      className={({ isActive }) => (isActive ? 'link-active' : '')}
    >
      <StyleLink bgColor="transparent" labelColor="white">
        Requests {typeof countReq === 'number' && <span className="app-count">{countReq}</span>}
      </StyleLink>
    </NavLink>

    {isLibrarian && (
      <NavLink
        to={ROUTES.USERS}
        onClick={toggle}
        className={({ isActive }) => (isActive ? 'link-active' : '')}
      >
        <StyleLink bgColor="transparent" labelColor="white">
          Users
        </StyleLink>
      </NavLink>
    )}

    <StyleLink
      onClick={logout}
      labelColor="error"
      bgColor="errorOpacity"
      style={{ paddingLeft: 10, paddingRight: 10 }}
    >
      Logout
    </StyleLink>
  </>
);

const Navbar = () => {
  const { isOpen, toggleModal } = useModal();
  const { logout, user, requestBooks } = useAuth();

  return (
    <StyleNav>
      <Link to={ROUTES.HOME}>
        <StyleBrandWrapper>
          <BsFillBookmarkFill />
          <Text size={24} color="white" fontWeight="700">
            Library
          </Text>
        </StyleBrandWrapper>
      </Link>

      <StyleFlex>
        <Menu
          logout={logout}
          isLibrarian={user?.role === 'librarian'}
          countReq={user?.role === 'student' ? requestBooks.length : null}
        />
      </StyleFlex>

      <StyleBurgerMobile bgColor="transparent" onClick={toggleModal}>
        <BiMenu />
      </StyleBurgerMobile>

      {isOpen && (
        <StyleMenuWrapper>
          <StyleMenuBody>
            <StyleMenuClose onClick={toggleModal}>
              <BsXCircleFill />
            </StyleMenuClose>

            <StyleBrandWrapper className="mb-3">
              <BsFillBookmarkFill />
              <Text size={24} color="white" fontWeight="700">
                Library
              </Text>
            </StyleBrandWrapper>

            <Menu
              logout={logout}
              toggle={toggleModal}
              isLibrarian={user?.role === 'librarian'}
              countReq={user?.role === 'student' ? requestBooks.length : null}
            />
          </StyleMenuBody>
        </StyleMenuWrapper>
      )}
    </StyleNav>
  );
};

export default Navbar;
