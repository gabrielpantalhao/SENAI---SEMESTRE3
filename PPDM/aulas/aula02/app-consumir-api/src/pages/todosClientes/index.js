import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, SafeAreaView, FlatList } from 'react-native';
import api from '../../services/api/api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function TodosClientes() {
    const navigation = useNavigation();
    const route = useRoute();

    let [flatListClientes, setFlatlistClientes] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [status, setStatus] = useState(false);

    const navegaEditar = (pId, pNome, pIdade) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, idade: pIdade })
    };

    const exibeAlert = () => {
        setShowAlert(true);
    };

    const listarClientes = async () => {
        try {

            const response = await api.get('/clientes')
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.log('Erro de conexão com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            if (response != undefined) {
                if (response.data.length > 0) {
                    let temp = [];
                    for (let i = 0; i < response.data.length; i++) {
                        temp.push(response.data[i]);
                        setFlatlistClientes(temp)
                    }
                    temp = [];
                } else {
                    setAlertMessage('Nenhum registro foi localizado!')
                    exibeAlert();
                    return;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deletarClientes = async (id) => {
        try {

            const response = await api.delete(`/clientes/${id}`)
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.log('Erro de conexão com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            if (response != undefined) {
                if (response.data[0].affectedRows > 0) {
                    setRefresh(prevState => !prevState);
                    setAlertMessage('Registro excluido com sucesso!')
                    exibeAlert();

                } else {
                    setAlertMessage('Nenhum registro foi localizado!')
                    exibeAlert();
                    return;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (route.params?.status) {
    //         setStatus(route.params.status)
    //     }
    // }, [route.params?.status])

    // useEffect(() => {
    //     listarClientes();
    // }, [status])

    useFocusEffect(
        React.useCallback(() => {
            listarClientes();
        }, [refresh])
    );

    let listViewItem = (item) => {
        return (
            <View style={styles.modeloCard}>
                <Text style={styles.textHeader}>ID</Text>
                <Text style={styles.textValue}> {item.id} </Text>

                <Text style={styles.textHeader}>Nome</Text>
                <Text style={styles.textValue}> {item.nome} </Text>

                <Text style={styles.textHeader}>Idade</Text>
                <Text style={styles.textValue}> {item.idade} </Text>

                <View style={[styles.containerButton, styles.align]}>

                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Atenção',
                                'Deseja realmente excluir esse registro?',
                                [
                                    {
                                        text: 'Sim',
                                        onPress: () => { deletarClientes(item.id) }
                                    },
                                    {
                                        text: 'Cancelar',
                                        onPress: () => { return },
                                    }

                                ]
                            )
                        }}>
                        <FontAwesome5 name='trash-alt' color='red' size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navegaEditar(item.id, item.nome, item.idade);
                        }}>
                        <FontAwesome5 name='edit' color='darkgreen' size={24} />
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListClientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listViewItem(item)}
                />
            </View>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
                    ]
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        flex: 1,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },

    modeloCard: {
        backgroundColor: '#c4f092',
        marginBottom: 30,
        padding: 15,
        borderRadius: 10,
        elevation: 8,
    },
    textHeader: {
        color: '#111',
        fontSize: 12,
        fontWeight: 'bold',
    },
    textValue: {
        color: 'black',
        fontSize: 18,
    },
});