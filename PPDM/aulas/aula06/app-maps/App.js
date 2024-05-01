import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {
  requestForegroundPermissionsAsync, // Solicita ao usuário a permissão para utilizar a localização
  getCurrentPositionAsync, // Quando autorizado nos retorna a posição do usuário
  watchPositionAsync, // Observa mudança na localização da posição
  LocationAccuracy,
  geocodeAsync,

} from 'expo-location';
import { styles } from "./src/styles/styles";


export default function App() {
  const [location, setLocation] = useState(null);
  const [searchAdress, setSearchAdress] = useState('');

  const mapRef = useRef(null);

  // Solicita ao usuário a permissão para acessar a localização
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    // Caso o resultado da variável 'granted' seja true, a posição atual é retornada para a variável 'currentPosition'
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      const { coords: { latitude, longitude } } = currentPosition;
      setLocation({ latitude, longitude });
      // Exibindo no console as informações da posição atual
      console.log(`LOCALIZAÇÃO ATUAL => `, currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  }, []);

  useEffect(() => {
    mapRef.current?.animateCamera({
      pitch: 90,
      center: { latitude: location.latitude, longitude: location.longitude }
    })
  }, [location]);

  const searchCoordinates = async (address) => {
    try {
      const result = await geocodeAsync(address);
      console.log('result', result);
      if (result && result.length > 0) {
        const { latitude, longitude } = result[0];
        // Atualização a localização no estado
        setLocation({ latitude, longitude });
        // console.log('Resuldado da pesquisa:' , latitude, longitude);
        mapRef.current?.animateCamera({
          pitch: 50,
          center: { latitude, longitude }
        })
      } else {
        console.log('Endereço não encontrado')
      }
    } catch (error) {
      console.error('Erro ao converter endereço', error);
    }
  };

  return (
    <View style={styles.container}>
      {
        // Renderiza o componente caso a variável esteja definida, ou seja, diferente de null. '&&' é um operador lógico utilizado em JavaScript para avaliação condicional.
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      }
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Digite o endereço"
            value={searchAdress}
            onChangeText={(text) => setSearchAdress(text)}
          />
          <TouchableOpacity style={styles.serchButton} onPress={() => searchCoordinates(searchAdress)}>
            <FontAwesome6 name='magnifying-glass' size={26} color='#BDC9DE'></FontAwesome6>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}