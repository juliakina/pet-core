import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HomeTutor() {
    const [usuario, setUsuario] = useState(null);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
        const petsStorage = await AsyncStorage.getItem("PETS");

        if (usuarioStorage !== null) {
            const user = JSON.parse(usuarioStorage);
            setUsuario(user);
            const todosPets = petsStorage ? JSON.parse(petsStorage) : [];
            setPets(todosPets.filter((pet) => pet.tutorId === user.id));
        }
    }

    function abrirPet(pet) {
        router.push({
            pathname: "/tutor/pet-detalhe",
            params: { petId: pet.id },
        });
    }

    return (
        <View style={styles.container}>
            <Header menuPath="/tutor/menu"/>
            <Text style={styles.boasVindas}>Olá, {usuario?.nome}</Text>
            <Text style={styles.subtitulo}>Meus pets</Text>

            <FlatList data={pets} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.vazio}>Nenhum pet cadastrado.</Text>} renderItem={({ item }) => (
                <TouchableOpacity style={styles.petCard} onPress={() => abrirPet(item)}>
                    <View style={styles.petImagem}>
                        <MaterialCommunityIcons name="paw" size={30} color="#7167F6"/>
                    </View>
                    <View style={styles.petInfo}>
                        <Text style={styles.petNome}>{item.nome}</Text>
                        <Text style={styles.petTexto}>{item.especie} • {item.sexo}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={30} color="#fff"/>
                </TouchableOpacity>
            )}/>

            <Text style={styles.subtitulo}>Serviços</Text>

            <View style={styles.cards}>
                <TouchableOpacity style={styles.card} onPress={() => router.push("/tutor/receitas")}>
                    <Text style={styles.cardTexto}>Receitas</Text>
                    <MaterialCommunityIcons name="file-document-outline" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push("/tutor/exames")}>
                    <Text style={styles.cardTexto}>Exames</Text>
                    <MaterialCommunityIcons name="test-tube" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push("/tutor/avisos")}>
                    <Text style={styles.cardTexto}>Avisos</Text>
                    <Ionicons name="notifications-outline" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push("/tutor/historico")}>
                    <Text style={styles.cardTexto}>Histórico Pet</Text>
                    <MaterialCommunityIcons name="file-chart-outline" size={32} color="#fff"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardGrande} onPress={() => router.push("/tutor/comedouro")}>
                    <Text style={styles.cardTexto}>Comedouro Inteligente</Text>
                    <FontAwesome6 name="bowl-rice" size={32} color="#fff"/>
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
        marginTop: 6,
    },

    subtitulo: {
        fontSize: 20,
        marginHorizontal: 22,
        marginTop: 18,
        marginBottom: 10,
    },

    vazio: {
        marginHorizontal: 22,
        color: "#666",
        marginBottom: 10,
    },

    petCard: {
        backgroundColor: "#7167F6",
        borderRadius: 12,
        marginHorizontal: 22,
        marginBottom: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
    },

    petImagem: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    petInfo: {
        flex: 1,
        marginLeft: 12,
    },
    petNome: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    petTexto: {
        color: "#fff",
        fontSize: 14,
    },

    cards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: 80,
    },

    card: {
        width: "42%",
        height: 105,
        backgroundColor: "#7167F6",
        borderRadius: 10,
        padding: 12,
        margin: 8,
        justifyContent: "space-between",
    },

    cardGrande: {
        width: "88%",
        height: 105,
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