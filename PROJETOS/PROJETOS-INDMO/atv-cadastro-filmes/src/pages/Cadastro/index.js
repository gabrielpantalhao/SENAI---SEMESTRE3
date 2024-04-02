import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdicionaFilme } from '../../database/database';

export default function Cadastro() {
    const [nomeFilme, setNomeFilme] = useState('');
    const [generoFilme, setGeneroFilme] = useState('');
    const [classificacaoFilme, setClassificacaoFilme] = useState(null);
    const [dataFilme, setDataFilme] = useState('');
    const [mensagem, setMensagem] = useState('');

    const navigation = useNavigation();

    const handleAdicionarFilme = () => {
        if (!nomeFilme || !generoFilme || !classificacaoFilme || !dataFilme) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        AdicionaFilme(nomeFilme, generoFilme, parseInt(classificacaoFilme), dataFilme, () => {
            setMensagem('Filme adicionado com sucesso!');
            setNomeFilme('');
            setGeneroFilme('');
            setClassificacaoFilme(null);
            setDataFilme('');
        }, (error) => {
            setMensagem('Ocorreu um erro ao adicionar o filme. Por favor, tente novamente.');
            console.error('Erro ao adicionar filme:', error);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Página Cadastro</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Filme</Text>
                    <TextInput style={styles.input}
                        placeholder='Nome do filme...'
                        value={nomeFilme}
                        onChangeText={setNomeFilme}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gênero</Text>
                    <TextInput style={styles.input}
                        placeholder='Drama, Ação, Romance...'
                        value={generoFilme}
                        onChangeText={setGeneroFilme}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Classificação</Text>
                    <TextInput style={styles.input}
                        placeholder='10, 12, 14...'
                        value={classificacaoFilme}
                        onChangeText={setClassificacaoFilme}
                        keyboardType='numeric'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Data de lançamento</Text>
                    <TextInput style={styles.input}
                        placeholder='Exemplo 31/12/2023'
                        value={dataFilme}
                        onChangeText={setDataFilme}
                    />
                </View>

                {mensagem ? <Text style={styles.errorMessage}>{mensagem}</Text> : null}

                <TouchableOpacity style={styles.button}
                    onPress={handleAdicionarFilme}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});
