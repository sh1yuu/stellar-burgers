import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import {
  removeIngredientFromConstructor,
  reorderIngredientInBurgerConstructor
} from '../../services/burgerConstructor-slice';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        reorderIngredientInBurgerConstructor({ from: index, to: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        reorderIngredientInBurgerConstructor({ from: index, to: index - 1 })
      );
    };

    const handleClose = () => {
      dispatch(removeIngredientFromConstructor(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
