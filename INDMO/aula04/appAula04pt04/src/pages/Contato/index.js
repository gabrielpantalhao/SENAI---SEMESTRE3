import { SafeAreaView, Text, StyleSheet, Button, TextInput } from 'react-native'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'



export default function Contato() {

    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <Text>Tela Contato</Text>
            <Button title='voltar' onPress={() => navigation.goBack()}></Button>
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