import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import api from '../../services/api/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function EditarCliente () {
    const route = useRoute();   
    const navigation = useNavigation(); 
    
    const [txtId, setTxtId] = useState(route.params?.id);
    const [txtNome, setTxtNome] = useState(route.params?.nome);
    const [txtIdade, setTxtIdade] = useState(route.params?.idade);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const exibeAlert = () => {
        setShowAlert(true);
    }

    const EditarCliente = async () => {

        try {
            if(txtNome =='' || txtNome==null){
                setAlertMessage('Preencha corretamente os campos')
                exibeAlert()
                return;
            }

            if(isNaN(txtIdade)){
                setAlertMessage('O valor Digitado para idade está incorreto!')
                exibeAlert()
                return;
            }

            if (txtIdade == "" || txtIdade == null || txtIdade < 1) {
                setAlertMessage('Informe uma idade maior que zero')
                exibeAlert()
                return;
            }
        
            const response = await api.put(`/clientes/${txtId}`, {nome: txtNome, idade: Number(txtIdade) })
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
            if(response.data[0].changedRows == 1){
                setTxtId('');
                setTxtNome('');
                setTxtIdade('');
                setAlertMessage('Cliente alterado com sucesso!');
                exibeAlert();
                return
            }else {
                console.log('Registro não foi alterado, verifique e tente novamente')
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

            <Text>ID</Text>
            <TextInput 
                style={styles.caixaDeTexto}
                value={txtId.toString()}
                onChangeText={setTxtId}
                readOnly
            />

            <Text>Nome do cliente</Text>
            <TextInput 
                style={styles.caixaDeTexto}
                value={txtNome}
                onChangeText={setTxtNome}
            />

            <Text>Idade do cliente</Text>
            <TextInput 
                style={styles.caixaDeTexto}
                value={txtIdade.toString()}
                onChangeText={setTxtIdade}
            />

            <TouchableOpacity
                onPress={()=> {
                    EditarCliente ();
                }}
                style={styles.alignVH}>
                <Text>Salvar</Text>
            </TouchableOpacity>
            
            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        {
                            text:'OK', onPress: () => {setShowAlert(false),
                            navigation.navigate('TodosClientes', { status:true });

                            }
                        }
                    ],
                    // {cancelable:false}
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
        width: '80%',
        color: 'black',
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