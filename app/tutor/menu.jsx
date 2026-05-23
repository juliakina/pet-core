import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function MenuTutor() {
    function alterarFoto() {
        Alert.alert(
            "Funcionalidade em desenvolvimento",
            "A alteração de foto de perfil estará disponível em uma próxima versão do aplicativo.",
            [{
                text: "Entendi",
                style: "default"
            }]
        );
    }

    async function sair() {
        await AsyncStorage.removeItem("USUARIO_LOGADO");
        router.replace("/login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu Perfil</Text>
            <TouchableOpacity style={styles.item} onPress={alterarFoto}>
                <Ionicons name="camera-outline" size={22} color="#7167F6"/>
                <Text style={styles.textoItem}>Alterar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => router.push("/tutor/alterar-dados")}>
                <Ionicons name="person-outline" size={22} color="#7167F6"/>
                <Text style={styles.textoItem}>Alterar dados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => router.push("/tutor/adicionar-pet")}>
                <MaterialCommunityIcons name="paw" size={22} color="#7167F6"/>
                <Text style={styles.textoItem}>Adicionar pet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemSair} onPress={sair}>
                <Ionicons name="exit-outline" size={22} color="#fff"/>
                <Text style={styles.textoSair}>Sair</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
                <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7167F6",
        padding: 28,
        paddingTop: 60,
    },

    titulo: {
        color: "#fff",
        fontSize: 28,
        marginBottom: 30,
        fontWeight: "bold",
    },

    item: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    textoItem: {
        color: "#7167F6",
        fontSize: 18,
        fontWeight: "bold",
    },

    itemSair: {
        backgroundColor: "#EF4444",
        padding: 16,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    textoSair: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    voltar: {
        marginTop: 26,
        alignItems: "center",
    },

    textoVoltar: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});