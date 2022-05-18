import React, {Fragment} from 'react';

import {Animated, Text, TouchableOpacity, View} from 'react-native';

export const MoveBall = () => {
  const animate = new Animated.ValueXY({x: 0, y: 0});

  const moveBall = () => {
    Animated.timing(animate, {
      toValue: {x: 100, y: 100},
      useNativeDriver: false,
      delay: 1000,
      duration: 3500,
    }).start();
  };

  return (
    <Fragment>
      <Animated.View style={animate.getLayout()}>
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          }}
        />
      </Animated.View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={moveBall}>
        <Text style={{color: 'red'}}>Click Me!</Text>
      </TouchableOpacity>
    </Fragment>
  );
};
