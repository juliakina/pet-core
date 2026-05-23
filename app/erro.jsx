import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Erro() {
    return (
        <View style={styles.container}>
            <Ionicons name="alert-circle-outline" size={80} color="#7167F6"/>
            <Text style={styles.titulo}>Erro ao carregar</Text>
            <Text style={styles.texto}>
                Não foi possível carregar esta página no momento.
                {"\n"}
                Tente novamente mais tarde.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={18} color="#fff"/>
                <Text style={styles.textoBtn}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },

    titulo: {
        fontSize: 30,
        color: "#7167F6",
        fontWeight: "bold",
        marginTop: 16,
    },

    texto: {
        fontSize: 17,
        color: "#666",
        textAlign: "center",
        marginTop: 14,
        lineHeight: 24,
        marginBottom: 28,
        paddingHorizontal: 12,
    },

    btn: {
        backgroundColor: "#7167F6",
        width: 170,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    textoBtn: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },
});