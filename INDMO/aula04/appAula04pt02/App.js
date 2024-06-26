import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import Home from './src/pages/Home'
import Sobre from './src/pages/Sobre';
import Contato from './src/pages/Contato'
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
            title:'Tela Inicial',
            headerTintColor: '#ffff',

            headerStyle:{
              backgroundColor:'green'
            },
            // headerShown:false
          }}
        />

        <Stack.Screen
          name='Sobre'
          component={Sobre}
        />

        <Stack.Screen
          name='Contato'
          component={Contato}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


