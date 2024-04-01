import React from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export default function Cadastro() {
    const [nomeFilme, setNomeFilme] = useState('');
    const [generoFilme, setGeneroFilme] = useState('');
    const [classificacaoFilme, setClassificacaoFilme] = useState(0);
    const [dataFilme, setDataFilme] = useState('');
    const navigation = useNavigation();

      //Função para inserir novo registro
    const adicionaFilme = () => {
        if (nomeFilme.trim() === '') {
          Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o filme');
          return;
        }
    
        if (operacao === 'Adicionar') {
          db.transaction(
            tx => {
              tx.executeSql(
                'INSERT INTO filmes (descFilme) VALUES (?)',
                [nomeFilme],
                (_, { rowsAffected }) => {
                  console.log(rowsAffected);
                  setNomeFilme('');
                  atualizaRegistros();
                },
                (_, error) => {
                  console.error('Erro ao adicionar filme:', error);
                  Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
                }
              );
            }
          );
        } else if (operacao === 'Editar') {
          db.transaction(
            tx => {
              tx.executeSql(
                'UPDATE filmes SET descFilme=? WHERE id=?',
                [nomeFilme, id],
                (_, { rowsAffected }) => {
                  if (rowsAffected === 1)
                    Alert.alert('Sucesso', 'Registro alterado com sucesso!');
                  else if (rowsAffected === 0)
                    Alert.alert('Atenção', 'O registro não foi localizado na Base de Dados!')
                  console.log(rowsAffected);
                  setNomeFilme('');
                  setGeneroFilme('');
                  setClassificacaoFilme('');
                  setDataFilme('');
                  atualizaRegistros();
                  setOperacao('Adicionar');
                },
                (_, error) => {
                  console.error('Erro ao adicionar filme:', error);
                  Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
                }
              );
            }
          );
        }
      }


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
                        onChangeText={setNomeFilme}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gênero</Text>
                    <TextInput style={styles.input}
                        placeholder='Drama, Ação, Romance...'
                        onChangeText={setGeneroFilme}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Classificação</Text>
                    <TextInput style={styles.input}
                        placeholder='10, 12, 14...'
                        onChangeText={setClassificacaoFilme}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Data de lançamento</Text>
                    <TextInput style={styles.input}
                        placeholder='Exemplo 31/12/2023'
                        onChangeText={setDataFilme}
                    />
                </View>

                <TouchableOpacity style={styles.button}
                    onPress={adicionaFilme}
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
    
});
