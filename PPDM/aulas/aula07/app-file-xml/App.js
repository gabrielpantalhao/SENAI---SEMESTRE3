import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import XmlParser from 'xml-js'; // Biblioteca para analisar XML


export default function App() {
  const [dados, setDados] = useState(null);

  const selecionarArquivo = async () => {
    try{

    } catch (error) {
      console.error('Erro ao selecionar o arquivo: ', error);
    }
  };
  
  return (
    <View style={styles.container}>
     <Button title='Selecionar Arquivo' onPress={selecionarArquivo} />
     {dados ? (
      <View>
        <Text>Dados do arquivo:</Text>
        {/*Aqui você pode exibir os dados do arquivo como desejar */}
        <Text>{JSON.stringify(dados)}</Text>
        </View>
     ) : (
      <Text> Nenhum arquivo selecionado</Text>
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
