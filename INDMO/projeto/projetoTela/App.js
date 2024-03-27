import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, SafeAreaView, Platform, Pressable, Alert, TextInput } from 'react-native';

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
    backgroundColor: 'black',
    alignItems: 'center',
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
