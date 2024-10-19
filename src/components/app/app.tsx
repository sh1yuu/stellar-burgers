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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { title } from 'process';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients-slice';
import { clearOrder } from '../../services/order-slice';
import { useDispatch } from '../../services/store';
import { IngredientDetailsContainer } from '../ingredient-details-container/ingredient-details-container';

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

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
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
              <Modal title={title} onClose={handleFeedClose}>
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
              <Modal title={title} onClose={handleOrderClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
