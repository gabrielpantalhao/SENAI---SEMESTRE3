// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { Button, Text, TouchableOpacity, View, ImageBackground, Alert } from "react-native";
import * as Medialibrary from 'expo-media-library';
import { styles } from './src/styles';
import { FontAwesome6 } from '@expo/vector-icons';

export default function App() {

  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(false);
  const [capturedImage, setCapturedCamera] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const IniciarCamera = async () => {
    if (permission.granted) {
      setStartCamera(true);
    } else {
      Alert.alert('Acesso negado');
    }
  }

  const takePicture = async () => {

  }

  useEffect(() => {

  }, [capturedImage]);

  const savePhoto = async () => {

  }

  const handleFashMode = () => {

  }

  const toggleCameraFacing = () => {

  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Você precisa conceder permissão para utilizar a câmera</Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.containerStartCamera}>
          <CameraView facing={facing} flash={flashMode} style={{ flex: 1 }} ref={cameraRef}>
            <View style={styles.containerPrincipalCameraView}>
              <View style={styles.containerSecundarioCameraView}>
                <TouchableOpacity onPress={handleFashMode} style={styles.buttonFlash}>
                  {flashMode === 'off' ?
                    <FontAwesome6 name='bolt' size={24} color='#fff' /> :
                    <FontAwesome6 name='bolt' size={24} color='#DBC800' />
                  }
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleCameraFacing} style={styles.buttonAlternarCamera}>
                  <FontAwesome6 name='camera-rotate' size={24} color='#fff' />
                </TouchableOpacity>
              </View>

              {/*Take Picture*/}
              <View style={styles.containerPrincipalTakePicture}>
                <View style={styles.containerTakePicture}>
                  <TouchableOpacity onPress={takePicture} style={styles.buttonTakeCapture} />
                </View>
              </View>
            </View>
          </CameraView>

        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={IniciarCamera} style={styles.buttonIniciarCamera}>
            <Text style={styles.textButtonIniciarCamera}>
              Iniciar Câmera
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
