import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HomeVet() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        buscarUsuario();
    }, []);

    async function buscarUsuario() {
        const dados = await AsyncStorage.getItem("USUARIO_LOGADO");
        if (dados !== null) {
            setUsuario(JSON.parse(dados));
        }
    }

    return (
        <View style={styles.container}>
            <Header menuPath="/vet/menu"/>
            <Text style={styles.boasVindas}>Bem-vindo(a), Dr(a). {usuario?.nome}</Text>

            <Text style={styles.subtitulo}>Serviços</Text>
            <View style={styles.cards}>
                <TouchableOpacity style={styles.card} onPress={() => router.push("/vet/exames")}>
                    <Text style={styles.cardTexto}>Exames</Text>
                    <MaterialCommunityIcons name="test-tube" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push("/vet/prontuario")}>
                    <Text style={styles.cardTexto}>Preencher prontuário</Text>
                    <MaterialCommunityIcons name="clipboard-text-outline" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push("/vet/protocolos")}>
                    <Text style={styles.cardTexto}>Protocolos</Text>
                    <MaterialCommunityIcons name="shield-check-outline" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push("/vet/receitas")}>
                    <Text style={styles.cardTexto}>Receitas</Text>
                    <MaterialCommunityIcons name="file-document-outline" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardGrande} onPress={() => router.push("/vet/relatorios")}>
                    <Text style={styles.cardTexto}>Emitir relatório</Text>
                    <MaterialCommunityIcons name="file-chart-outline" size={32} color="#fff"/>
                </TouchableOpacity>
            </View>
            <Footer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    boasVindas: {
        fontSize: 22,
        marginHorizontal: 22,
        marginTop: 5,
    },

    subtitulo: {
        fontSize: 20,
        marginHorizontal: 22,
        marginTop: 28,
        marginBottom: 10,
    },

    cards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: 80,
    },

    card: {
        width: "42%",
        height: 120,
        backgroundColor: "#7167F6",
        borderRadius: 10,
        padding: 12,
        margin: 8,
        justifyContent: "space-between",
    },

    cardGrande: {
        width: "88%",
        height: 110,
        backgroundColor: "#7167F6",
        borderRadius: 10,
        padding: 12,
        margin: 8,
        justifyContent: "space-between",
    },

    cardTexto: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
});