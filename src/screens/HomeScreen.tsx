import React from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Pressable style={styles.button} onPress={() => navigation.navigate('Tasks')} >
      <Text style={styles.text}>Tasks</Text>
    </Pressable>
    <View style={styles.buttonSpacer} />
    <Pressable style={styles.button} onPress={() => navigation.navigate('List')} >
      <Text style={styles.text}>List</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacer: {
    height: 10, 
  },
  button: {
    width: windowWidth/2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default HomeScreen;
