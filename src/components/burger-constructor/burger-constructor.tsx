import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  orderBurger,
  resetConstructor,
  selectorBurgerIngredients,
  selectorBurgerLoading,
  selectorBurgerOrder
} from '../../services/burgerConstructor-slice';
import { useDispatch, useSelector } from '../../services/store';
import { selectorData } from '../../services/user-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectorData);

  const constructorItems = useSelector(selectorBurgerIngredients);

  const orderRequest = useSelector(selectorBurgerLoading);

  const orderModalData = useSelector(selectorBurgerOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const ingredientsId = [
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(ingredientsId));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
