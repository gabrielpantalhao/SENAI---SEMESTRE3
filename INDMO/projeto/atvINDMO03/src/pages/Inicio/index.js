import { SafeAreaView, Text, TextInput, Button, StyleSheet, Image, View } from 'react-native'

const logo = require('../../../assets/senai-logo.png')

export default function Inicio() {
    return (
        <SafeAreaView style={styles.styleInicio}>
            <View style={styles.styleImage}>
                <Image source={logo} style={{ width: 400, height: 110 }}></Image>
            </View>

            <View style={styles.styleText}>
                <Text style={styles.fontText}>Gabriel Augusto Lopes Pantalhão</Text>
                <Text style={styles.fontText}>Sumaré, 30/01/2024</Text>
                <Text style={styles.fontText}>Escola SENAI Celso Charuri</Text>
                <Text style={styles.fontText}>Técnico em Desenvolvimento de Sistemas</Text>
                <Text style={styles.fontText}>INDMO - Interface para Dispositivos Móveis</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    styleInicio: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft:20
    },
    styleImage: {
        bottom: 100
    },
    styleText: {
        width: 'auto',
        height: 'auto',
        bottom: 10,
        alignItems: 'center',
        alignContent: 'center',
    },
    fontText:{
        textAlign:'center',
        paddingBottom: 30,
        fontSize: 18,
        fontWeight: '900',
    }
})