import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

import api from './src/services/api/api';


export default function App() {
  const [cliente, setCliente] = useState([]);
  const [idCli, setIdCli] = useState(0);
  const [showAlert, setShowAlert] = useState(false)

  const getCliente = async (id) => {
    try {
      if (id > 0) {
        const response  = await api.get(`/clientes/${id}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              if ((error.request._response).includes('Failed')) {
                console.log('Erro ao conectar com a API');
              }
            } else {
              console.log('Error', error.message);
            }
          });

        if (response != undefined) {
          if (response.data.length === 0) {
            setCliente([])
            setShowAlert(true)
          } else {
            setCliente(response.data)
          }
        }
      } else {
        setCliente([])
      }
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.textInput}
        placeholder='ID Cliente'
        value={idCli}
        onChangeText={setIdCli}
      ></TextInput>
      <TouchableOpacity
        onPress={() => getCliente(idCli)}
        style={styles.botao}
      >

        <Text style={{ color: 'white' }}>Pressione para pesquisar</Text>

      </TouchableOpacity>

      <Text>ID</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.id.toString()}></TextInput>
      <Text>Nome</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.nome}></TextInput>
      <Text>Idade</Text>
      <TextInput style={styles.textInput} value={cliente[0]?.idade.toString()}></TextInput>

      {showAlert &&
        (Alert.alert('Informação', 'Registro não foi localizado na base de dados',
          [
            { text: 'Ok', onPress: () => setShowAlert(false) }
          ]))
      }

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
    gap: 1
  },

  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  textInput: {
    textAlign: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5
  }
});