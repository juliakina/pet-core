import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AlterarDadosTutor() {
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        buscarUsuario();
    }, []);

    async function buscarUsuario() {
        const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");

        if (usuarioStorage !== null) {
            const user = JSON.parse(usuarioStorage);
            setUsuario(user);
            setNome(user.nome || "");
            setNascimento(user.nascimento || "");
            setTelefone(user.telefone || "");
            setGenero(user.genero || "");
            setEmail(user.email || "");
            setSenha(user.senha || "");
            setConfirmarSenha(user.senha || "");
        }
    }

    function formatarData(texto) {
        let numeros = texto.replace(/\D/g, "");
        if (numeros.length > 8) numeros = numeros.slice(0, 8);
        if (numeros.length > 4) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
        if (numeros.length > 2) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
        return numeros;
    }

    function formatarTelefone(texto) {
        let numeros = texto.replace(/\D/g, "");
        if (numeros.length > 11) numeros = numeros.slice(0, 11);
        if (numeros.length > 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
        if (numeros.length > 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
        if (numeros.length > 2) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        return numeros;
    }

    async function salvar() {
        if (!nome || nome.trim() === "") {
            setMensagem("Informe o nome.");
            return;
        }

        if (!email || email.trim() === "") {
            setMensagem("Informe o e-mail.");
            return;
        }

        if (!senha || senha.trim() === "") {
            setMensagem("Informe a senha.");
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagem("As senhas não conferem.");
            return;
        }

        const usuariosStorage = await AsyncStorage.getItem("USUARIOS");
        let usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

        const usuarioAtualizado = {
            ...usuario,
            nome,
            nascimento,
            telefone,
            genero,
            email,
            senha,
        };

        usuarios = usuarios.map((item) => {
            if (item.id === usuario.id) return usuarioAtualizado;
            return item;
        });

        await AsyncStorage.setItem("USUARIOS", JSON.stringify(usuarios));
        await AsyncStorage.setItem("USUARIO_LOGADO", JSON.stringify(usuarioAtualizado));
        setMensagem("Dados atualizados com sucesso.");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require("../../assets/avatar-default.png")} style={styles.avatar}/>
            <Text style={styles.titulo}>Alterar dados</Text>
            {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}
            <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome}/>

            <TextInput placeholder="Data de nascimento" style={styles.input} value={nascimento} keyboardType="numeric" maxLength={10} onChangeText={(value) => setNascimento(formatarData(value))}/>
            <TextInput placeholder="Telefone" style={styles.input} value={telefone} keyboardType="phone-pad" maxLength={15} onChangeText={(value) => setTelefone(formatarTelefone(value))}/>

            <Text style={styles.label}>Gênero</Text>
            <View style={styles.opcoesGenero}>
                <TouchableOpacity style={genero === "Feminino" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setGenero("Feminino")}>
                    <Text style={genero === "Feminino" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Feminino</Text>
                </TouchableOpacity>
                <TouchableOpacity style={genero === "Masculino" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setGenero("Masculino")}>
                    <Text style={genero === "Masculino" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Masculino</Text>
                </TouchableOpacity>
            </View>

            <TextInput placeholder="E-mail" style={styles.input} value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail}/>
            <TextInput placeholder="Nova senha" style={styles.input} value={senha} secureTextEntry onChangeText={setSenha}/>
            <TextInput placeholder="Confirmar nova senha" style={styles.input} value={confirmarSenha} secureTextEntry onChangeText={setConfirmarSenha}/>

            <TouchableOpacity style={styles.btn} onPress={salvar}>
                <Text style={styles.textoBtn}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnVoltar} onPress={() => router.replace("/tutor/home")}>
                <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 28,
        paddingTop: 60,
    },
    
    titulo: {
        fontSize: 26,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },

    mensagem: {
        backgroundColor: "#F4F3FF",
        color: "#7167F6",
        fontWeight: "bold",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        textAlign: "center",
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginBottom:10,
        alignSelf: "center",
    },

    input: {
        height: 50,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        width: "100%",
    },

    label: {
        width: "100%",
        fontSize: 15,
        marginBottom: 6,
        color: "#333",
    },

    opcoesGenero: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 10,
    },

    opcao: {
        width: "31%",
        height: 42,
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
    },

    opcaoSelecionada: {
        width: "31%",
        height: 42,
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7167F6",
    },

    textoOpcao: {
        color: "#333",
        fontSize: 13,
    },

    textoOpcaoSelecionada: { 
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },

    btn: {
        backgroundColor: "#7167F6",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        width: "100%",
    },

    textoBtn: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    btnVoltar: {
        alignItems: "center",
        marginTop: 18,
    },

    textoVoltar: {
        color: "#7167F6",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});