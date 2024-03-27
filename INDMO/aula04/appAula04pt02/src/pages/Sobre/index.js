import {SafeAreaView, Text, StyleSheet, Button, TextInput} from 'react-native'
import {useNavigation,useRoute} from '@react-navigation/native'



export default function Sobre(){
    
    const navigation = useNavigation();
    const route = useRoute();
    const navegaContato = () => {
        navigation.navigate('Contato')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text>Tela Sobre</Text>
            <TextInput value={route.params?.nome}></TextInput>
            <TextInput value={route.params?.email}></TextInput>

            <Button title='Abrir página Contato' onPress={navegaContato}></Button>
        </SafeAreaView>
    )
}


// export default function Sobre({route}){
    
//     // const navigation = useNavigation();
    
//     return(
//         <SafeAreaView style={styles.container}>
//             <Text>Tela Sobre</Text>
//             <TextInput value={route.params?.nome}></TextInput>
//             <TextInput value={route.params?.email}></TextInput>
//         </SafeAreaView>
//     )
// }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });