import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Page} from './Page';

const PAGES_TITLE = ['React', 'JS', 'R/Native', 'Vue'];

export const Pages = () => {
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      onScroll={onScroll}
      scrollEventThrottle={16}>
      {PAGES_TITLE.map((pageTitle, index) => {
        return (
          <Page
            index={index}
            title={pageTitle}
            key={index.toString()}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
