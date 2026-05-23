import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    function mostrarMensagem(tipo, texto) {
        setTipoMensagem(tipo);
        setMensagem(texto);
    }

    async function entrar() {
        if (!email || email.trim() === "") {
            mostrarMensagem("erro", "Informe o e-mail");
            return;
        }
        if (!senha || senha.trim() === "") {
            mostrarMensagem("erro", "Informe a senha");
            return;
        }

        const dados = await AsyncStorage.getItem("USUARIOS");
        const usuarios = dados ? JSON.parse(dados) : [];
        const usuarioEncontrado = usuarios.find((item) => {
            return item.email === email && item.senha === senha;
        });

        if (!usuarioEncontrado) {
            mostrarMensagem("erro", "E-mail ou senha inválidos");
            return;
        }

        await AsyncStorage.setItem("USUARIO_LOGADO", JSON.stringify(usuarioEncontrado));

        if (usuarioEncontrado.tipoPerfil === "veterinario") {
            router.replace("/vet/home");
        } else {
            router.replace("/tutor/home");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.conteudo}>
                <Image source={require("../assets/logo.jpeg")} style={styles.logo}/>
                <Text style={styles.titulo}>Acesse sua Conta</Text>

                {mensagem !== "" && (
                    <View style={tipoMensagem === "erro" ? styles.cardErro : styles.cardSucesso}>
                        <View style={tipoMensagem === "erro" ? styles.iconeErro : styles.iconeSucesso}>
                            <Ionicons name={tipoMensagem === "erro" ? "alert" : "checkmark"} size={24} color="#fff"/>
                        </View>

                        <Text style={tipoMensagem === "erro" ? styles.tituloErro : styles.tituloSucesso}>{tipoMensagem === "erro" ? "Atenção" : "Tudo certo!"}</Text>

                        <Text style={styles.textoMensagem}>{mensagem}</Text>
                    </View>
                )}

                <TextInput placeholder="Digite seu email" style={styles.input} value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={(value) => setEmail(value)}/>
                <TextInput placeholder="Digite sua senha" style={styles.input} secureTextEntry value={senha} onChangeText={(value) => setSenha(value)}/>

                <View style={styles.linhaCadastro}>
                    <Text>Não tem conta?</Text>
                    <TouchableOpacity onPress={() => router.push("/cadastro")}><Text style={styles.link}>Cadastre-se!</Text></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn} onPress={entrar}><Text style={styles.textoBtn}>Entrar</Text></TouchableOpacity>
            </View>
            <Footer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },

    conteudo: {
        paddingHorizontal: 32,
        paddingTop: 70,
        alignItems: "center",
    },

    logo: {
        width: 180,
        height: 180,
        resizeMode: "contain",
    },

    titulo: {
        fontSize: 24,
        marginBottom: 18,
    },

    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },

    linhaCadastro: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 18,
    },

    link: {
        color: "#7167F6",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },

    btn: {
        backgroundColor: "#7167F6",
        width: 150,
        height: 45,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    textoBtn: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    cardErro: {
        width: "100%",
        backgroundColor: "#FFF1F2",
        borderWidth: 1.5,
        borderColor: "#EF4444",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        marginBottom: 12,
    },

    cardSucesso: {
        width: "100%",
        backgroundColor: "#F4F3FF",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        marginBottom: 12,
    },

    iconeErro: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    iconeSucesso: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#7167F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    tituloErro: {
        color: "#EF4444",
        fontWeight: "bold",
        fontSize: 18,
    },

    tituloSucesso: {
        color: "#7167F6",
        fontWeight: "bold",
        fontSize: 18,
    },

    textoMensagem: {
        color: "#333",
        textAlign: "center",
        marginTop: 4,
    },
});