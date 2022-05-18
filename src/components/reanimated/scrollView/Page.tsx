import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type PropsType = {
  title: string;
  index: number;
  translateX: any;
};

const {height, width} = Dimensions.get('window');

export const Page = ({title, index, translateX}: PropsType) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const circleReanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, (width * 0.7) / 2, 0],
      Extrapolation.CLAMP,
    );

    return {
      borderRadius: borderRadius,
      transform: [{scale}],
    };
  });

  const textReanimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const fontSize = interpolate(
      translateX.value,
      inputRange,
      [-0.3, 1, -0.3],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      fontSize,
      transform: [{translateY}, {scale: fontSize}],
    };
  });

  return (
    <View
      style={[
        {backgroundColor: `rgba(0, 0, 256, 0.${(index + 1) * 2})`},
        {position: 'relative'},
        styles.pageContainer,
      ]}>
      <Animated.View style={[styles.square, circleReanimatedStyle]} />
      <Animated.View style={[{position: 'absolute'}, textReanimatedStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 60,
    fontWeight: '600',
  },
});
