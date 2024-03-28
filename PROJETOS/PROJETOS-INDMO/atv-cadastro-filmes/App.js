import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/pages/Home';
import Cadastro from './src/pages/Cadastro';
import Pesquisa from './src/pages/Pesquisa';
import ExibeTodos from './src/pages/ExibeTodos';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
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

