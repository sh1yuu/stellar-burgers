import { FC, memo, ReactNode } from 'react';
import { FeedDetailsContainerUI } from '../ui/feed-details-container/feed-details-containerUI';

type TFeedDetailsContainer = {
  title: string;
  children?: ReactNode;
};

export const FeedDetailsContainer: FC<TFeedDetailsContainer> = memo(
  ({ title, children }) => (
    <FeedDetailsContainerUI title={title}>{children}</FeedDetailsContainerUI>
  )
);
