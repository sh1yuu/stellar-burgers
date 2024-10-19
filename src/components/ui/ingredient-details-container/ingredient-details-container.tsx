import { FC, memo, ReactNode } from 'react';
import styles from './ingredient-details-container.module.css';

type TIngredientDetailsContainerUI = {
  title: string;
  children?: ReactNode;
};

export const IngredientDetailsContainerUI: FC<TIngredientDetailsContainerUI> =
  memo(({ title, children }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  ));
