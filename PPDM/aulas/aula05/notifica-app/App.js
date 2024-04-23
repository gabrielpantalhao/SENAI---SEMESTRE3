import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



export default function App() {

const [expoToken, setExpoToken] =useState('');
// UseEffect chama função que verifica se o usuario possui permissap para receber notificação
useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoToken(token));
}, []);


async function handleNotificationLocal(){
  schedulePushNotification();
};

return (
  <View style={styles.container}>
  <Text>Trabalhando com notificações no Expo!</Text>
  <Button
  title="Enviar notificação local"
  onPress={async ()=>{
    await handleNotificationLocal();
  }}
  />
  <Text>{expoToken}</Text>
  <StatusBar style="auto" />
  </View>
);



}

async function schedulePushNotification(){
  await Notifications.scheduleNotificationAsync({
    content:{
      title: "Notificação local",
      body: `Este é um teste de notifição local acionado imediatamente após o clique do botão`,

      //title: "Notificação local"
      //body: 'Este é um teste de notificação local com o temporizador,
      //exibida após o tempo determinado',
    },

    trigger: null,
  });
}

async function registerForPushNotificationsAsync(){
  let token;

  const {status: existingStatus} = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if(existingStatus !== 'granted'){
    const {status} = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if(finalStatus !== 'granted'){
    alert('Você não possui permissao para receber notificações!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e3edf413-a69a-4fab-bda0-bf2409450d8c'})).data;
  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});