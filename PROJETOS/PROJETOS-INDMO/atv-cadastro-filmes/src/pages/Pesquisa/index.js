import { SafeAreaView, Text, StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function Pesquisa() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text>Página Pesquisa</Text>
                </View>
                <View>
                    <TextInput placeholder='Nome ou ID'></TextInput>
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