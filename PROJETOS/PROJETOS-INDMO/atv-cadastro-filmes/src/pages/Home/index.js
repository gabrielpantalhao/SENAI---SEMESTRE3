import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function Home() {
    const navigation = useNavigation();
    const navegaCadastro = () => {
        navigation.navigate('Cadastro')
    }
    const navegaPesquisa = () => {
        navigation.navigate('Pesquisa')
    }
    const navegaExibeTodos = () => {
        navigation.navigate('ExibeTodos')
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text>Página Dedicada à escolha do usuário para Filmes</Text>
            <Button title='Página Cadastro' onPress={navegaCadastro}></Button>
            <Button title='Página Pesquisa' onPress={navegaPesquisa}></Button>
            <Button title='Página Exibe Todos' onPress={navegaExibeTodos}></Button>
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