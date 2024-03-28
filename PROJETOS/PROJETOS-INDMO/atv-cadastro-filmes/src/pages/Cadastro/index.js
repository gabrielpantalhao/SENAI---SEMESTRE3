import { SafeAreaView, Text, StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function Cadastro() {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text>Página Cadastro</Text>
                </View>

                <View>
                    <Text>Filme</Text>
                    <TextInput placeholder='Crepúsculo...'></TextInput>
                </View>

                <View>
                    <Text>Gênero</Text>
                    <TextInput placeholder='Drama, Ação, Romance...'></TextInput>
                </View>
                <View>

                <View>
                    <Text>Classificação</Text>
                    <TextInput placeholder='10, 12, 14...'></TextInput>
                </View>

                    <Text>Data de lançamento</Text>
                    <TextInput placeholder='Exemplo 31/12/2023'></TextInput>
                </View>

            </View>


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