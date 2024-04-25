import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



export default function App() {

    const navigation = useNavigation();
    const route = useRoute();

  const [expoToken, setExpoToken] = useState('');

  const [notificationRecived, setNotificaitonRecived] = useState(null);

  const [allNotifications, setAllNotifications] = useState({data:[]});

  const notificationRecivedRef = useRef();

  const notificationResponseRef = useRef();

  const visualizarNotif = () =>{
    navigation.navigate('Notificacoes', {itens: allNotifications})
  }


  // UseEffect chama função que verifica se o usuario possui permissap para receber notificação
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoToken(token));

    notificationRecivedRef.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida: ', notification);
    });

    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log('Notificação clicada: ', notification);
    });
  }, []);


  async function handleNotificationLocal() {
    schedulePushNotification();
  };

  return (
    <View style={styles.container}>
      <Text>Trabalhando com notificações no Expo!</Text>
      <Button
        title="Enviar notificação local"
        onPress={async () => {
          await handleNotificationLocal();
        }}
      />

      <Button 
        title='Visualizar notificações'
        onPress={() => {
            visualizarNotif();
        }}
      />
      <Text>{expoToken}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notificação local",
      body: `Este é um teste de notifição local acionado imediatamente após o clique do botão`,

      //title: "Notificação local"
      //body: 'Este é um teste de notificação local com o temporizador,
      //exibida após o tempo determinado',
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Você não possui permissao para receber notificações!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e3edf413-a69a-4fab-bda0-bf2409450d8c' })).data;
  console.log(token);
  return token;

  useEffect(() => {
    if (notificationRecived != null) {
      console.log(notificationRecived);
      const { date, request: { content, identifier, trigger } } = notificationRecived
      console.log(notificationRecived);
      console.log(content);



      dados = { date: date, bodyMessege: content.body, titleMessege: content.title }


      setAllNotifications(PrevState => ({
        ...PrevState,
        data: [...PrevState.data, dados]
      }));
    }
  }, [notificationRecived]);

  useEffect(() => {
    if(allNotifications != null){
      console.log(`All: `, allNotifications);
    }
  }, [allNotifications])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});