import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { protocolos } from "../../data/mockData";

export default function ProtocolosVet() {
    const [usuario, setUsuario] = useState(null);
    const [tutores, setTutores] = useState([]);
    const [tutorSelecionado, setTutorSelecionado] = useState(null);
    const [petsDoTutor, setPetsDoTutor] = useState([]);
    const [petSelecionado, setPetSelecionado] = useState(null);
    const [protocoloSelecionado, setProtocoloSelecionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [modalTutor, setModalTutor] = useState(false);
    const [modalPet, setModalPet] = useState(false);

    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
        const usuariosStorage = await AsyncStorage.getItem("USUARIOS");

        if (usuarioStorage !== null) setUsuario(JSON.parse(usuarioStorage));

        if (usuariosStorage !== null) {
            const usuarios = JSON.parse(usuariosStorage);
            setTutores(usuarios.filter((item) => item.tipoPerfil === "tutor"));
        }
    }

    async function buscarPetsDoTutor(tutorId) {
        const petsStorage = await AsyncStorage.getItem("PETS");
        const todosPets = petsStorage ? JSON.parse(petsStorage) : [];
        setPetsDoTutor(todosPets.filter((pet) => pet.tutorId === tutorId));
    }

    function abrirFormulario(protocolo) {
        setProtocoloSelecionado(protocolo);
        setMostrarFormulario(true);
        setTutorSelecionado(null);
        setPetSelecionado(null);
        setPetsDoTutor([]);
        setMensagem("");
    }

    function selecionarTutor(item) {
        setTutorSelecionado(item);
        setPetSelecionado(null);
        setMensagem("");
        setModalTutor(false);
        buscarPetsDoTutor(item.id);
    }

    function selecionarPet(item) {
        setPetSelecionado(item);
        setMensagem("");
        setModalPet(false);
    }

    async function enviarProtocolo() {
        if (!protocoloSelecionado || !tutorSelecionado || !petSelecionado) {
            setMensagem("Selecione tutor e pet.");
            return;
        }

        const storage = await AsyncStorage.getItem("PROTOCOLOS_ENVIADOS");
        let enviados = storage ? JSON.parse(storage) : [];

        const novoProtocolo = {
            id: `${Date.now()}`,
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            titulo: protocoloSelecionado.titulo,
            texto: protocoloSelecionado.texto,
            dataEnvio: new Date().toLocaleDateString("pt-BR"),
        };

        enviados.push(novoProtocolo);

        await AsyncStorage.setItem("PROTOCOLOS_ENVIADOS", JSON.stringify(enviados));

        setMensagem("Protocolo enviado para o tutor.");
        setMostrarFormulario(false);
        setProtocoloSelecionado(null);
        setTutorSelecionado(null);
        setPetSelecionado(null);
        setPetsDoTutor([]);
    }

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="shield-check-outline" size={50} color="#7167F6" alignSelf= "center"/>
            <Text style={styles.titulo}>Protocolos</Text>

            {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}

            {mostrarFormulario && (
                <View style={styles.formulario}>
                    <Text style={styles.subtitulo}>Enviar: {protocoloSelecionado?.titulo}</Text>

                    <TouchableOpacity style={styles.select} onPress={() => setModalTutor(true)}>
                        <Text style={tutorSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                        {tutorSelecionado ? tutorSelecionado.nome : "Selecionar tutor"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.select} onPress={() => setModalPet(true)}>
                        <Text style={petSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                        {petSelecionado ? petSelecionado.nome : "Selecionar pet"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={enviarProtocolo}>
                        <Ionicons name="send" size={18} color="#fff"/>
                        <Text style={styles.textoBtn}>Enviar protocolo</Text>
                    </TouchableOpacity>

                    <Modal visible={modalTutor} transparent animationType="slide">
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalTitulo}>Selecionar tutor</Text>
                                {tutores.map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.modalItem} onPress={() => selecionarTutor(item)}>
                                        <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                        <Text style={styles.modalItemSubtexto}>{item.email}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalTutor(false)}>
                                    <Text style={styles.textoCancelar}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal visible={modalPet} transparent animationType="slide">
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalTitulo}>Selecionar pet</Text>
                                {petsDoTutor.length === 0 && (
                                    <Text style={styles.modalItemSubtexto}>
                                    Selecione um tutor com pets cadastrados.
                                    </Text>
                                )}
                                {petsDoTutor.map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.modalItem} onPress={() => selecionarPet(item)}>
                                        <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                        <Text style={styles.modalItemSubtexto}>
                                            {item.especie} • {item.raca}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalPet(false)}>
                                    <Text style={styles.textoCancelar}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}

            <FlatList data={protocolos} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.linhaTitulo}>
                        <Text style={styles.cardTitulo}>{item.titulo}</Text>
                        <TouchableOpacity style={styles.botaoEnviar} onPress={() => abrirFormulario(item)}>
                            <Ionicons name="send" size={18} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.cardTexto}>{item.texto}</Text>
                </View>
            )}/>
            <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
                <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 28,
        paddingTop: 60,
    },

    titulo: {
        fontSize: 28,
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

    formulario: {
        backgroundColor: "#f1f1f1",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
    },

    subtitulo: {
        fontSize: 18,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 12,
    },

    select: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectTexto: {
        color: "#000",
    },

    selectPlaceholder: {
        color: "#777",
    },

    btn: {
        backgroundColor: "#7167F6",
        height: 46,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    textoBtn: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    card: {
        backgroundColor: "#f1f1f1",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
    },

    linhaTitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardTitulo: {
        color: "#7167F6",
        fontSize: 20,
        fontWeight: "bold",
        flex: 1,
    },

    botaoEnviar: {
        backgroundColor: "#7167F6",
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
    },

    cardTexto: {
        color: "#222",
        fontSize: 15,
        lineHeight: 21,
        marginTop: 10,
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