import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style = {styles.container}>
      <Text style = {styles.titulo}>"Olá mundo!</Text>
      <Text style = {styles.titulo}>"A conduta define o homem." KINGSMAN</Text>
      <Button title='Pressione Aqui' onPress={() => {Alert.alert('Você pressionou para exibir um Alert!')}}></Button>
      <StatusBar style="auto" />
    </View>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#CEFF33',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    color:'white',
  }
  
})