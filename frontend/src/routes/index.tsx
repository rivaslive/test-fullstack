import {useEffect} from 'react';
import {
  Routes as RoutesReact,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import LoginPage from 'pages/login';
import BooksPage from 'pages/home';
import NotFoundPage from 'pages/404';
import UsersPage from 'pages/users';
import RequestBooksPage from 'pages/requestBooks';
import {useAuth} from 'context/auth';

import {ROUTES} from './paths';

function RequireAuth({children}: { children: JSX.Element }) {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (!user && !loading) {
    return <Navigate to={ROUTES.HOME} state={{from: location}} replace/>;
  }

  if (user?.role !== 'librarian' && !loading) {
    return <Navigate to={ROUTES.LOGIN} state={{from: location}} replace/>;
  }

  return children;
}

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.NOT_FOUND, {replace: true});
  }, [navigate]);

  return null;
};

const Routes = () => {
  return (
    <RoutesReact>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
      <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
      <Route
        path={ROUTES.HOME}
        element={
          <RequireAuth>
            <BooksPage/>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.REQUEST}
        element={
          <RequireAuth>
            <RequestBooksPage/>
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.USERS}
        element={
          <RequireAuth>
            <UsersPage/>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Redirect/>}/>
    </RoutesReact>
  );
};

export default Routes;
