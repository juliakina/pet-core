import { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { mockUsers, mockPets } from "../data/mockData";

export default function Index() {
    useEffect(() => {
        iniciarApp();
    }, []);

    async function iniciarApp() {
        const usuarios = await AsyncStorage.getItem("USUARIOS");
        const pets = await AsyncStorage.getItem("PETS");

        if (usuarios === null) {
        await AsyncStorage.setItem("USUARIOS", JSON.stringify(mockUsers));
        }
        if (pets === null) {
        await AsyncStorage.setItem("PETS", JSON.stringify(mockPets));
        }

        const usuarioLogado = await AsyncStorage.getItem("USUARIO_LOGADO");

        setTimeout(() => {
            if (usuarioLogado === null) {
                router.replace("/login");
            } else {
                const usuario = JSON.parse(usuarioLogado);
                if (usuario.tipoPerfil === "veterinario") {
                    router.replace("/vet/home");
                } else {
                    router.replace("/tutor/home");
                }
            }
        }, 700);
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.jpeg")} style={styles.logo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 260,
        height: 260,
        resizeMode: "contain",
    },
});