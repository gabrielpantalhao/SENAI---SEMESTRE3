import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, SafeAreaView, Platform, Pressable, Alert, TextInput } from 'react-native';
import Saudacao from './components/Saudacao';

const logo = require('./assets/favicon.png')

export default function App() {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <ScrollView>
        <View style={styles.container}>

          <View>
            <Text style={styles.labelInput}>Campo 1</Text>
            <TextInput placeholder='Campo 1' style={styles.input}></TextInput>

            <Text style={styles.labelInput}>Campo 2</Text>
            <TextInput placeholder='Campo 2' style={styles.input}></TextInput>
          </View>

          <View style={styles.separador}></View>

          <View style={styles.alinharHorizontal}>
            <Button title='Botão 1' color='midnightblue' onPress={() => Alert.alert('Eu sou o Botão 1!')}></Button>

            <Button title='Botão 2' color='red' onPress={() => Alert.alert('Eu sou um título 2', 'Eu sou o Botão 2!')}></Button>

            <Button title='Botão 3' color='black' onPress={() => Alert.alert('Eu sou um título 3', 'Eu sou o Botão 3!',
              [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Botão Cancelar pressionado!')
                },
                {
                  text: 'Ok',
                  onPress: () => console.log('Botão Ok pressionado!')
                }
                
              ]
            )}></Button>
          </View>





          <View style={styles.separador}></View>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'red' : 'gray'
              },
              styles.button,
            ]}
            onPress={() => Alert.alert('Botão Pressionado')}>
            <Text>Button</Text>
          </Pressable>
          <View style={styles.separador}></View>

          <Saudacao name={'Gabriel Pantalhão'}></Saudacao>

          <View style={styles.separador}></View>

          <Image source={logo}></Image>

          <View style={styles.separador}></View>

          <Image source={{ uri: 'https://picsum.photos/3421' }} style={{ width: '100%', height: 355, borderRadius: 200, borderColor: 'black', borderWidth: 3 }}></Image>

          <View style={styles.separador}></View>

          <Text style={{ textAlign: 'justify' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?".
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."
          </Text>

          <View style={styles.separador}></View>

          <View style={[styles.lightgreenBox, styles.borderMargin, styles.boxShadow]}>
            <Text>Lightgreen Box</Text>
          </View>

          <View style={styles.separador}></View>

          <View style={[styles.lightblueBox, styles.borderMargin, styles.boxShadow]}>
            <Text>Lightblue Box</Text>
          </View>

          <View style={styles.separador}></View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 31 : 0,
  },

  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },

  lightgreenBox: {
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 100,
  },

  lightblueBox: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 100,
  },

  borderMargin: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },

  boxShadow: {
    elevation: 5,
  },

  separador: {
    width: '100%',
    backgroundColor: 'gray',
    height: 1,
    margin: 10,
  },

  alinharHorizontal: {
    //flex: 1,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },

  input:{
    width: '70%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  labelInput:{
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,

  }
});