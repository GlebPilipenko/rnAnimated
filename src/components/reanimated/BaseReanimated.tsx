import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {View} from 'react-native';

export const BaseReanimated = () => {
  const scale = useSharedValue(2);
  const progress = useSharedValue(1);
  const rotation = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [{scale: scale.value}, {rotateZ: `${rotation.value}deg`}],
    };
  }, [scale, progress]);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
    rotation.value = withRepeat(withTiming(Math.random() * 300), -1, true);
  }, [scale, progress, rotation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          {width: 100, height: 100, backgroundColor: 'green'},
          reanimatedStyle,
        ]}
      />
    </View>
  );
};
