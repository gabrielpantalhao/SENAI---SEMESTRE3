import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Inicio from "../pages/Inicio";
import Cursos from "../pages/Cursos";
import Contatos from "../pages/Contato";

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'darkgray',
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={Inicio}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="odnoklassniki" color={color} size={size}></FontAwesome>
                    }
                }}
            />

            <Tab.Screen
                name="Cursos"
                component={Cursos}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="graduation-cap" color={color} size={size}></FontAwesome>
                    }
                }}
            />

            <Tab.Screen
                name="Contatos"
                component={Contatos}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="mobile" color={color} size={size}></FontAwesome>
                    }
                }}
            />
        </Tab.Navigator>
    )
}