import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Home from './src/pages/Home'
import Sobre from './src/pages/Sobre';
import Contato from './src/pages/Contato'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'white',
          tabBarStyle:{
            backgroundColor:'lightblue'
          }
        }}
      >

        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Tela Inicial',
            headerTintColor: '#ffff',

            headerStyle: {
              backgroundColor: 'lightblue'
            },
            // headerShown:false

            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name='home' color={color} size={size}></FontAwesome>
            }
          }}
        />

        <Tab.Screen
          name='Sobre'
          component={Sobre}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name='info' color={color} size={size}></FontAwesome>
            }
          }}
        />

        <Tab.Screen
          name='Contato'
          component={Contato}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name='phone' color={color} size={size}></FontAwesome>
            }
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
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