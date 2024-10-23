import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { title } from 'process';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients-slice';
import { clearOrder } from '../../services/order-slice';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/user-slice';
import { FeedDetailsContainer } from '../feed-details-container/ingredient-details-container';
import { IngredientDetailsContainer } from '../ingredient-details-container/ingredient-details-container';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFeedClose = () => {
    navigate('/feed');
    dispatch(clearOrder());
  };

  const handleIngredientsClose = () => {
    navigate('/');
    dispatch(clearOrder());
  };

  const handleOrderClose = () => {
    navigate('/profile/orders');
    dispatch(clearOrder());
  };

  const orderId = location.pathname.split('/').at(-1);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <FeedDetailsContainer title={`#0${orderId}`}>
              <OrderInfo />
            </FeedDetailsContainer>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <IngredientDetailsContainer title='Детали ингредиента'>
              <IngredientDetails />
            </IngredientDetailsContainer>
          }
        />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#0${orderId}`} onClose={handleFeedClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={handleIngredientsClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={`#0${orderId}`} onClose={handleOrderClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
