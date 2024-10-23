import { FC, memo, ReactNode } from 'react';
import styles from './feed-details-container.module.css';

type TFeedDetailsContainerUI = {
  title: string;
  children?: ReactNode;
};

export const FeedDetailsContainerUI: FC<TFeedDetailsContainerUI> = memo(
  ({ title, children }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p className={`${styles.title} text text_type_digits-medium`}>
            {title}
          </p>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  )
);
