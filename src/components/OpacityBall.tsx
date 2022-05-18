import React, {Fragment, useState} from 'react';

import {Animated, Text, TouchableOpacity, View} from 'react-native';

export const OpacityBall = () => {
  const animate = useState(new Animated.Value(0))[0];

  const moveBall = () => {
    Animated.timing(animate, {
      toValue: 1,
      delay: 1000,
      duration: 3500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      for (let i = 0; i < 5000; i++) {}
    }, 1000);
  };

  return (
    <Fragment>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            {
              width: 75,
              height: 75,
              opacity: animate,
              borderRadius: 100 / 2,
              backgroundColor: 'red',
            },
          ]}
        />

        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={moveBall}>
          <Text style={{color: 'red'}}>Click Me!</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};
