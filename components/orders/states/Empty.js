import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Button } from 'react-native-paper';

const { height: deviceHeight } = Dimensions.get('window');

const EmptyOrderScreen = () => {

  return (
    <View style={[styles.container, { height: deviceHeight - 150 }]}>
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/error.png')} 
          style={{ width: 160, height: 160, marginBottom: 10 }} 
        />
        <Text category='s1' appearance='hint'>
          No Orders Found
        </Text>
        <Button mode="contained" onPress={() => console.log('Shop Now pressed!')} style={styles.shopButton}>
          Shop Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  shopButton: {
    marginTop: 20,
  }
});

export default EmptyOrderScreen;
