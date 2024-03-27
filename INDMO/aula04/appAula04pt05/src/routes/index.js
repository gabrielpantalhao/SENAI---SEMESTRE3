import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackRoutes from './stackRoutes'
import Sobre from '../pages/Sobre'
import Contato from '../pages/Contato'
import Detalhes from '../pages/Detalhes';
import CustomDrawer from '../components/CustomDrawer'



const Drawer=createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen 
      name='HomeStack'
      component={StackRoutes}
      />
      <Drawer.Screen 
        name='Sobre'
        component={Sobre}
      />
      <Drawer.Screen 
        name='Contato'
        component={Contato}
      />
    </Drawer.Navigator>
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