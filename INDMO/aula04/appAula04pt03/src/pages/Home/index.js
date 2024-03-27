import {SafeAreaView,Text, StyleSheet, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'


export default function Home(){
    
    const navigation = useNavigation();
    function navegaSobre(){
        navigation.navigate('Sobre',{nome:'Gabriel Augusto', email:'pantalhaog@gmail.com'});
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Tela Home</Text>
            <Button title='Abrir Página "SOBRE"' onPress={ navegaSobre }></Button>
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