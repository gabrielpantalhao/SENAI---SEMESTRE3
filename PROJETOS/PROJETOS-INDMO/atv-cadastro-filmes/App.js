import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import Pesquisa from './src/pages/Pesquisa';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ExibeTodos from './src/pages/ExibeTodos';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

//CONEXÃO COM O BANCO DE DADOS
import { DatabaseConnection } from './src/database/database';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

// Abre ou cria o banco de dados SQLite
const db = new DatabaseConnection.getConnection; // 



export default function App() {
  const [id, setId] = useState(null);
  const [nomeFilme, setNomeFilme] = useState('');
  const [todosFilmes, setTodosFilmes] = useState([]);
  const [operacao, setOperacao] = useState('Adicionar');

  //Função dentro do useEffect que cria uma tabela caso não exista
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, descFilme TEXT NOT NULL)',
        [],
        () => console.log('Tabela de Filmes criada com sucesso!'),
        (_, error) => console.error(error)
      );
    }, null);
  }, [todosFilmes]);

  //Função utilizada para atualizar os registros

  const atualizaRegistros = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM filmes',
          [], (_, { rows }) =>
          setTodosFilmes(rows._array),
        );
      });
    } catch (error) {
      console.error('Erro ao buscar todos os Filmes:', error);
    }
  };

  //useEffect chama a função para atualizar os registros
  useEffect(() => {
    atualizaRegistros();
  }, []);




  //Função utilizada para excluir um registro
  const excluiFilme = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM filmes WHERE id=?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            atualizaRegistros();
            Alert.alert('Sucesso', 'Registro excluído com sucesso!');
          } else {
            Alert.alert('Erro', 'Registro não excluído, verifique e tente novamente!');
          }
        },
        (_, error) => {
          console.error('Erro ao excluir o filme', error);
          Alert.alert('Erro', 'Ocorreu um erro ao excluir o cliente!')
        }
      )
    })
  }

  const buttonPress = (nome) => {
    setNomeFilme(nome);
  }

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home',
          }}
        />

        <Stack.Screen
          name='Cadastro'
          component={Cadastro}

        />

        <Stack.Screen
          name='Pesquisa'
          component={Pesquisa}
        />

        <Stack.Screen
          name='ExibeTodos'
          component={ExibeTodos}

          options={{
            title: 'Todos os Registros'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

