import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCliente () {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const exibeAlert = () => {
        setShowAlert(true);
    }

    const salvarCliente = async () => {

        try {
            if(nome =='' || nome==null){
                setAlertMessage('Preencha corretamente os campos')
                exibeAlert()
                return;
            }

            if(isNaN(idade)){
                setAlertMessage('O valor Digitado para idade está incorreto!')
                exibeAlert()
                return;
            }

            if (idade == "" || idade == null || idade < 1) {
                setAlertMessage('Informe uma idade maior que zero')
                exibeAlert()
                return;
            }
        
            const response = await api.post('/clientes', {nome:nome, idade: Number(idade) })
                .catch(function (error) {
                    if (error.response){
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }else if (error.request){
                        if((error.request._response).includes('Failed')){
                            console.log('Erro de conexão com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
            });

        if (response != undefined) {
            if(response.data[0].affectedRows == 1){
                setNome('');
                setIdade(0);
                setAlertMessage('Cliente cadastrado com sucesso!');
                exibeAlert();
                return
            }else {
                console.log('Registro não foi inserido, verifique e tente novamente')
            }
        }

        }catch (error) {
            console.log(error)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardTitle}>
                <Text style={styles.title}>Preencha os campos abaixo:</Text>
            </View>

            <Text>Nome do cliente</Text>
            <TextInput 
                style={styles.caixaDeTexto}
                value={nome}
                onChangeText={setNome}
            />

            <Text>Idade do cliente</Text>
            <TextInput 
                style={styles.caixaDeTexto}
                value={idade.toString()}
                onChangeText={setIdade}
            />

            <TouchableOpacity
                onPress={()=> {
                    salvarCliente ();
                }}
                style={styles.alignVH}>
                <Text>Salvar</Text>
            </TouchableOpacity>
            
            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        {text:'OK', onPress: () => setShowAlert(false)}
                    ],
                    {cancelable:false}
                )
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    caixaDeTexto: {
        borderWidth: 1,
        // borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        width: '80%'
    },
    cardTitle: {
        paddingBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});