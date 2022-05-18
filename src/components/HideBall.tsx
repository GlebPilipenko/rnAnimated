import React, {Fragment, useState} from 'react';

import {Animated, Text, TouchableOpacity, View} from 'react-native';

export const HideBall = () => {
  const animate = useState(new Animated.Value(0))[0];

  const moveBall = () => {
    Animated.timing(animate, {
      toValue: 1000,
      delay: 1000,
      duration: 3500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Fragment>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            {
              width: 75,
              height: 75,
              marginLeft: animate,
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
