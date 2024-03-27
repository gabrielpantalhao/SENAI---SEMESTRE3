import {SafeAreaView,Text, StyleSheet, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'


export default function Sobre(){
    
    // const navigation = useNavigation();
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Tela Sobre</Text>
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