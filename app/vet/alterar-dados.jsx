import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { especializacoes, clinicas } from "../../data/mockData";

export default function AlterarDadosVet() {
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState("");
    const [especializacao, setEspecializacao] = useState("");
    const [clinica, setClinica] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [modalEspecializacao, setModalEspecializacao] = useState(false);
    const [modalClinica, setModalClinica] = useState(false);

    useEffect(() => {
        buscarUsuario();
    }, []);

    async function buscarUsuario() {
        const dados = await AsyncStorage.getItem("USUARIO_LOGADO");
        if (dados !== null) {
            const user = JSON.parse(dados);
            setUsuario(user);
            setNome(user.nome || "");
            setEspecializacao(user.especializacao || "");
            setClinica(user.clinica || user.nomeClinica || "");
            setCnpj(user.cnpj || "");
            setCep(user.cep || "");
            setComplemento(user.complemento || "");
        }
    }

    function selecionarClinica(item) {
        setClinica(item.nome);
        setCnpj(item.cnpj);
        setCep(item.cep);
        setComplemento(item.complemento);
        setModalClinica(false);
    }

    async function salvar() {
        if (!nome || nome.trim() === "") {
            setMensagem("Informe o nome.");
            return;
        }
        if (!especializacao || especializacao.trim() === "") {
            setMensagem("Informe a especialização.");
            return;
        }
        if (!clinica || clinica.trim() === "") {
            setMensagem("Informe a clínica.");
            return;
        }

        const usuariosStorage = await AsyncStorage.getItem("USUARIOS");
        let usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

        const usuarioAtualizado = {
            ...usuario,
            nome,
            especializacao,
            clinica,
            nomeClinica: clinica,
            cnpj,
            cep,
            complemento,
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

            <TouchableOpacity style={styles.select} onPress={() => setModalEspecializacao(true)}>
                <Text style={especializacao ? styles.selectTexto : styles.selectPlaceholder}>
                {especializacao || "Selecione sua especialização"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#7167F6"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.select} onPress={() => setModalClinica(true)}>
                <Text style={clinica ? styles.selectTexto : styles.selectPlaceholder}>
                {clinica || "Selecione sua clínica"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#7167F6"/>
            </TouchableOpacity>

            <TextInput placeholder="CNPJ da clínica" style={styles.input} value={cnpj} onChangeText={setCnpj}/>
            <TextInput placeholder="CEP da clínica" style={styles.input} value={cep} onChangeText={setCep}/>
            <TextInput placeholder="Complemento" style={styles.input} onChangeText={setComplemento}/>

            <TouchableOpacity style={styles.btn} onPress={salvar}>
                <Text style={styles.textoBtn}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnVoltar} onPress={() => router.replace("/vet/home")}>
                <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>

            <Modal visible={modalEspecializacao} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitulo}>Especialização</Text>
                        {especializacoes.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.modalItem} onPress={() => {
                                setEspecializacao(item);
                                setModalEspecializacao(false);
                            }}>
                                <Text style={styles.modalItemTexto}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalEspecializacao(false)}>
                            <Text style={styles.textoCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalClinica} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitulo}>Clínica</Text>
                        {clinicas.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.modalItem} onPress={() => selecionarClinica(item)}>
                                <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                <Text style={styles.modalItemSubtexto}>{item.cnpj}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalClinica(false)}>
                            <Text style={styles.textoCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        textAlign: "center",
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

    select: {
        height: 50,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectTexto: {
        color: "#333",
        fontSize: 14,
    },

    selectPlaceholder: {
        color: "#777",
        fontSize: 14,
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

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 20,
    },

    modalTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#7167F6",
        marginBottom: 16,
    },

    modalItem: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    modalItemTexto: {
        fontSize: 15,
        color: "#333",
        fontWeight: "bold",
    },

    modalItemSubtexto: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },

    btnCancelar: {
        marginTop: 16,
        alignItems: "center",
    },
    
    textoCancelar: {
        color: "#7167F6",
        fontWeight: "bold",
    },
});