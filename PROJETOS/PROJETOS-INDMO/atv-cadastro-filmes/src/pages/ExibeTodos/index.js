import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function ExibeTodos() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text>Página Exibe ExibeTodos</Text>
                </View>
                <View>
                    <TouchableOpacity
                        
                    ></TouchableOpacity>
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