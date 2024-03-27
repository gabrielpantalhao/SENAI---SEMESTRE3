import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, Alert } from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function Contatos() {
    
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.principal}>
                <View style={styles.container2}>
                    <Text style={styles.title}>Nome Completo</Text>
                    <TextInput style={styles.input} placeholder='Alcindo Silva'></TextInput>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.title}>E-mail</Text>
                    <TextInput style={styles.input} placeholder='email@exemplo.com'></TextInput>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.title}>Número</Text>
                    <TextInput style={styles.input} placeholder='(99)99999-9999'></TextInput>
                </View>
                <View>
                    <Button title='Enviar' onPress={() => Alert.alert('Obrigado!', 'Seus dados foram enviados para nossa central, em breve entraremos em contato.',
                        [
                            {
                                text: 'Finalizar',
                               onPress: () => navigation.goBack()
                                
                            }
                        ]
                        ,console.log('Informações recebidas com sucesso'))}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'darkred',
    },

    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: 'darkred',
        borderRadius: 2,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    principal: {
        bottom: 30
    }

});
