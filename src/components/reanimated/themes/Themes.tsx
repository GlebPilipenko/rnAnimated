import React, {useState} from 'react';
import {Dimensions, StyleSheet, Switch} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const SIZE = Dimensions.get('window').width * 0.7;
const COLORS = {
  dark: {
    background: '#1e1e1e',
    circle: '#252525',
    text: '#f8f8f8',
  },
  light: {
    background: '#f8f8f8',
    circle: '#fff',
    text: '#1e1e1e',
  },
};
const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0, 0, 0, 0.1)',
};

enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

type ThemeType = Theme.Light | Theme.Dark;

export const Themes = () => {
  const [theme, setTheme] = useState<ThemeType>(Theme.Light);

  const progress = useDerivedValue(() => {
    return theme === Theme.Dark ? withTiming(1) : withTiming(0);
  }, [theme]);

  const reanimatedBgStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.background, COLORS.dark.background],
    );

    return {backgroundColor};
  });

  const reanimatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.circle, COLORS.dark.circle],
    );

    return {backgroundColor};
  });

  const reanimatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.text, COLORS.dark.text],
    );

    return {color};
  });

  return (
    <Animated.View style={[styles.container, reanimatedBgStyle]}>
      <Animated.View style={[styles.circle, reanimatedCircleStyle]}>
        <Switch
          value={theme === Theme.Dark}
          thumbColor="violet"
          trackColor={SWITCH_TRACK_COLOR}
          onValueChange={toggled =>
            setTheme(toggled ? Theme.Dark : Theme.Light)
          }
        />
      </Animated.View>
      <Animated.Text style={[styles.content, reanimatedTextStyle]}>
        {theme}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 30,
    fontWeight: '600',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE * 0.5,
    marginVertical: 30,
  },
});
