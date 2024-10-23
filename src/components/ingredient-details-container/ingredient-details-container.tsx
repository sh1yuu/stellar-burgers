import { FC, memo, ReactNode } from 'react';
import { IngredientDetailsContainerUI } from '../ui/ingredient-details-container/ingredient-details-container';

type TIngredientDetailsContainer = {
  title: string;
  children?: ReactNode;
};

export const IngredientDetailsContainer: FC<TIngredientDetailsContainer> = memo(
  ({ title, children }) => (
    <IngredientDetailsContainerUI title={title}>
      {children}
    </IngredientDetailsContainerUI>
  )
);
