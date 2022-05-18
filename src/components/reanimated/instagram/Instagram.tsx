import React, {useRef} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const Instagram = () => {
  const doubleRef = useRef();

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const reanimatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const reanimatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const onSingleTap = () => {
    opacity.value = withSpring(1, undefined, (finished?: boolean) => {
      if (finished) {
        opacity.value = withDelay(300, withTiming(0));
      }
    });
  };

  const onDoubleTap = () => {
    scale.value = withSpring(1, undefined, (finished?: boolean) => {
      if (finished) {
        scale.value = withDelay(300, withTiming(0));
      }
    });
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleRef} onActivated={onSingleTap}>
        <TapGestureHandler
          ref={doubleRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground
              style={styles.bg}
              source={require('../../../assets/bg.jpeg')}>
              <AnimatedImage
                source={require('../../../assets/heart.png')}
                style={[styles.image, reanimatedImageStyle]}
              />
              <Animated.Text style={[styles.text, reanimatedTextStyle]}>
                ReactNative...
              </Animated.Text>
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    tintColor: 'tomato',
    resizeMode: 'center',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'tomato',
    textAlign: 'center',
  },
});
