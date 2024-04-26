import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
  const [notificationRecived, setNotificationReceived] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]);

  const notificationReceivedRef = useRef();
  const notificationResponseRef = useRef();

  const visualizarNotif = () => {
    navigation.navigate('Notificacoes', { notifications: allNotifications });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoToken(token));

    notificationReceivedRef.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notificação recebida: ', notification);
      setNotificationReceived(notification);
    });

    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener((notification) => {
      console.log('Notificação clicada: ', notification);
    });
  }, []);

  async function handleNotificationLocal() {
    await schedulePushNotification();
  }

  useEffect(() => {
    if (notificationRecived != null) {
      const { date, request: { content, identifier, trigger } } = notificationRecived;
      const newData = { date: date, bodyMessage: content.body, titleMessage: content.title };
      setAllNotifications((prevNotifications) => [...prevNotifications, newData]);
    }
  }, [notificationRecived]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo ao Expo de Notificações</Text>
        {/* <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{expoToken}</Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNotificationLocal}>
          <Text style={styles.buttonText}>Enviar Notificação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={visualizarNotif}>
          <Text style={styles.buttonText}>Ver Notificações</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notificação local",
      body: `Este é um teste de notificação local acionado imediatamente após o clique do botão`,
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
    alert('Você não possui permissão para receber notificações!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e3edf413-a69a-4fab-bda0-bf2409450d8c' })).data;
  console.log(token);
  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF', // Texto branco
    textAlign: 'center',
    marginBottom: 10,
  },
  // subtitleContainer: {
  //   backgroundColor: '#333', // Cinza escuro para o container do token
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  // },
  subtitle: {
    fontSize: 15,
    color: '#FFF', // Texto branco
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3', // Azul para os botões
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
});
