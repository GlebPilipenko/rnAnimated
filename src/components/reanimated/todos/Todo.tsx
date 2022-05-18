import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import React from "react";

interface PropsType
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  id: number;
  title: string;
  onRemoveTask: (taskId: number) => void;
}

const LIST_ITEM_HEIGHT = 50;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const Todo = ({
  id,
  title,
  onRemoveTask,
  simultaneousHandlers,
}: PropsType) => {
  const translateX = useSharedValue(0);
  const binOpacity = useSharedValue(1);
  const marginVertical = useSharedValue(10);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;

      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        binOpacity.value = withTiming(0, undefined, finished => {
          if (finished) {
            runOnJS(onRemoveTask)(id);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const reanimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const reanimatedItemContainerStyles = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: binOpacity.value,
  }));

  const reanimatedImageStyles = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );

    return {opacity};
  });

  return (
    <Animated.View
      style={[styles.taskContainer, reanimatedItemContainerStyles]}>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Animated.View style={[styles.textContainer, reanimatedStyles]}>
          <Text>{title}</Text>
        </Animated.View>
      </PanGestureHandler>
      <AnimatedImage
        source={require('../../../assets/bin.png')}
        style={[styles.binContainer, reanimatedImageStyles]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  textContainer: {
    justifyContent: 'center',
    minWidth: '85%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: '#fff',
    paddingLeft: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  binContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    position: 'absolute',
    right: '10%',
    borderRadius: 15,
    zIndex: -1,
  },
});
