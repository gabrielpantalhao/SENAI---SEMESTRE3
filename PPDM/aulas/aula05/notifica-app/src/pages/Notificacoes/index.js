import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// Configuração do handler de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notificacoes() {
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    verNotificacoes();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setAllNotifications(prevState => [...prevState, notification]);
    });
    return () => subscription.remove();
  }, []);

  // Função para ver notificações
  async function verNotificacoes() {
    const notifications = await Notifications.getPresentedNotificationsAsync();
    setAllNotifications(notifications); // Certifique-se de que 'notifications' é sempre um array
    console.log('Notificações atuais:', notifications);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>🔔 Notificações Recebidas 🔔</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={verNotificacoes}
          >
            <Text style={styles.textButton}>Ver Notificações</Text>
          </TouchableOpacity>
          <View style={styles.notificationBox}>
            {/* {allNotifications.map((notification, index) => (
              <Text key={index}>{notification.request.content.title} - {notification.request.content.body}</Text>
            ))} */}
            {allNotifications.length > 0 ? (
              allNotifications.map((notification, index) => (
                <View key={index}>
                  <Text style={styles.titleNotification}>{notification.request.content.title}</Text>
                  <Text style={styles.bodyNotification}>{notification.request.content.body}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.notNotification}>Não há notificações</Text>
            )}
          </View>
          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 23, // Tamanho do título aumentado
    letterSpacing: 2, // Espaçamento entre as letras reduzido
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF', // Texto branco
    marginBottom: 30, // Margem inferior aumentada
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#1E90FF', // Azul para o botão
    height: 60,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Margem inferior reduzida para dar mais espaço
  },
  textButton: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  notificationBox: {
    backgroundColor: '#778899', // Cinza ardósia para a caixa de notificação
    padding: 10,
    borderRadius: 8,
    width: '90%',
  },
  notNotification: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    color: '#FFF', // Texto branco
  },
  titleNotification: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFD700', // Cor dourada para o título da notificação
  },
  bodyNotification: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFF', // Texto branco
  },
});
