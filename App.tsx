import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Camera} from 'expo-camera'
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let camera: Camera

export default function App() {

  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [flashMode, setFlashMode] = React.useState('off')
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const CameraPreview = ({photo}: any) => {
    console.log('sdsfds', photo)
    return (
      <View
        style = {{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source = {{uri: photo && photo.uri}}
          style = {{
            flex: 1
          }}
        >
          <View
            style = {{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style = {{
                flex: 1,
                flexDirection: 'column',
                padding: 15,
                justifyContent: 'flex-end'
              }}
            >
              <View
                style = {{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity
                  onPress = {__retakePicture}
                  style = {{
                    width: 130,
                    height: 40,
                    alignItems: 'center',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style = {{
                      color: '#fff',
                      fontSize: 25
                    }}
                  >Re-take</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress = {__savePhoto}
                  style = {{
                    width: 130,
                    height: 40,
                    alignItems: 'center',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style = {{
                      color: '#fff',
                      fontSize: 25
                    }}
                  >Save Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __savePhoto = () => {

  }

  const __handleFlash = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }

  const __flipCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style = {{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
              <CameraPreview photo = {capturedImage} savePhoto = {__savePhoto} retakePicture = {__retakePicture} />
          ) : (
            <Camera
              style={{
                flex: 1,
                width: "100%"
              }}
              flashMode = {flashMode}
              type = {cameraType}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style = {{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                  <TouchableOpacity
                    onPress = {__handleFlash}
                    style = {{
                      position: 'absolute',
                      left: '5%',
                      top: '10%',
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: '50%',
                      height: 25,
                      width: 100
                    }}
                  >
                    <Text
                      style = {{
                        fontSize: 25,
                        color: 'red'
                      }}
                    >FLASH</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress = {__flipCamera}
                    style = {{
                      marginTop: 20,
                      borderRadius: '50%',
                      height: 25,
                      width: 75
                    }}
                  >
                    <Text
                      style = {{
                        fontSize: 20,
                        color: 'yellow'
                      }}
                    >
                      {cameraType === 'front' ? 'FLIP' : '?'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style = {{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style = {{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress = {__takePicture}
                      style = {{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              
            </Camera>
          )}
          </View>
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

