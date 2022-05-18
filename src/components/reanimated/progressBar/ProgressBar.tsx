import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

const STROKE_COLOR = '#A6E1FA';
const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';

const {width, height} = Dimensions.get('window');

const STROKE_WIDTH = 30;
const CIRCLE_LENGTH = 1000;
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressBar = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = () => {
    progress.value = withTiming(1, {duration: 1500});
  };

  return (
    <View style={styles.container}>
      <ReText text={progressText} style={styles.progressText} />
      <Svg>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={RADIUS}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={RADIUS}
          strokeLinecap="round"
          stroke={STROKE_COLOR}
          animatedProps={animatedProps}
          strokeWidth={STROKE_WIDTH / 2}
          strokeDasharray={CIRCLE_LENGTH}
        />
      </Svg>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  progressText: {
    width: 200,
    fontSize: 70,
    color: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    textAlign: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 80,
    width: 250,
    height: 50,
    backgroundColor: '#0e1223',
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});
