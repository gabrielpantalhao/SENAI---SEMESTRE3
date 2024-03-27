import {SafeAreaView,Text, StyleSheet, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'


export default function Home(){
    
    const navigation = useNavigation();
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Tela Home</Text>
            <Button title='Abrir Página "SOBRES"' onPress={() => navigation.navigate('Sobre') }></Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });