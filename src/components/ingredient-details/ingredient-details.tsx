import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { selectorIngredients } from '../../services/ingredients-slice';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();

  const ingredientData =
    useSelector(selectorIngredients).find((i) => i._id === id) || null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
