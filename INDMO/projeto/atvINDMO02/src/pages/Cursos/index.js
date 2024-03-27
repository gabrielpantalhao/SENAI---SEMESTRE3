import { SafeAreaView, Text, TextInput, Button, StyleSheet } from 'react-native'

export default function Cursos() {
    return (
        <SafeAreaView style={styles.styleCursos}>
            <Text style={styles.title}>Cursos</Text>
            <Text style={styles.subTitle}>Técnico em Desenvolvimento de Sistemas</Text>
            <Text  style={styles.content}>Focado em programas de linguagem WEB e Mobile. Trabalha alguns tipo de linguagem SQL e montagem de banco de dados em geral, também trabalha-se com repositórios em Núvem  como o GitHub.</Text>

            <Text style={styles.subTitle2}>Eletrcista de Manutenção Eletroeletrônica</Text>
            <Text style={styles.content2}>Com o foco em desenvolver esquemas elétricos e automatizados, utilizando eletropneumática e eletroeletrônica. Neste curso de Aprendizagem Industrial também é incluso a integração ao mundo de eletrônica Digital e Analógica.</Text>

            <Text  style={styles.subTitle3}>Excel</Text>
            <Text style={styles.content3}>Neste curso é ensinado desde o básico até o avançado em Excel, criando Tabelas, gráficos, gerando grades automáticas de renda, multiplicadores e resultantes finais de tabela.</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    styleCursos: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    title:{
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 50,
        top: -90,
        color: '#393e46'
    },
    subTitle:{
        textAlign:'center',
        bottom: 50,
        fontSize: 23,
        fontWeight: '600'
    },
    subTitle2:{
        textAlign:'center',
        bottom:15,
        fontSize: 23,
        fontWeight: '600'
    },
    subTitle3:{
        textAlign:'center',
        bottom:-50,
        fontSize: 23,
        fontWeight: '600'
    },
    content:{
        textAlign: 'justify',
        fontSize: 15,
        bottom: 50,
    },
    content2:{
        textAlign: 'justify',
        fontSize: 15,
        bottom: 10,
    },
    content3:{
        textAlign: 'justify',
        fontSize: 15,
        bottom: -50,
    }
})