import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Camera} from 'expo-camera'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let camera: Camera

export default function App() {

  const [startCamera, setStartCamera] = React.useState(false)

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          style={{
            flex: 1,
            width: "100%"
          }}
          ref={(r) => {
            camera = r
          }}
        ></Camera>
      ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >Take Picture
          </Text>
        </TouchableOpacity>
      </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
