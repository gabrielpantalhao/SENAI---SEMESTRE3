import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions, SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Notificacoes(){
    const navigation = useNavigation();
    const route = useRoute();
    const [allNotifications, setAllNotifications] = useState(route.params?.itens);
        return(
            <SafeAreaView>
                <View style={styles.container}>
                    <Text>Tela Notificações</Text>
                </View>
            </SafeAreaView>
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