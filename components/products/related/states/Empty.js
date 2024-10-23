import React from 'react';
import { View,  StyleSheet, Image } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

const EmptyCategoryScreen = () => {
  const theme = useTheme();

  return (
      <View style={styles.content}>
      <Image source={require('@/assets/images/error.png')} style={{ width: 160, height: 160, marginBottom: 10 }} />
        <Text category='s1' appearance='hint'>
          No Products Found
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop:'auto'
  },
  text: {
    // fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default EmptyCategoryScreen;