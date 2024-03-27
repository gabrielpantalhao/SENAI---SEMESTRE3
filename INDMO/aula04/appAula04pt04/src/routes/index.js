import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackRoutes from './stackRoutes'
import Sobre from '../pages/Sobre'
import Contato from '../pages/Contato'
import Detalhes from '../pages/Detalhes';


const Tab = createBottomTabNavigator();

export default function Routes() {
  return (


    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'lightblue'
        }
      }}
    >

      <Tab.Screen
        name='HomeStack'
        component={StackRoutes}
        options={{
          tabBarLabel: 'Início',
          headerTintColor: '#ffff',
          headerStyle: {
            backgroundColor: 'lightblue'
          },
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

      <Tab.Screen
        name='Detalhes'
        component={Detalhes}
        options={{
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name='info-circle' color={color} size={size}></FontAwesome>
          }
        }}
      />

    </Tab.Navigator>

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