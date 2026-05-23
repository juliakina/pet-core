import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProntuarioVet() {
    const [usuario, setUsuario] = useState(null);
    const [tutores, setTutores] = useState([]);
    const [tutorSelecionado, setTutorSelecionado] = useState(null);
    const [petsDoTutor, setPetsDoTutor] = useState([]);
    const [petSelecionado, setPetSelecionado] = useState(null);
    const [dataConsulta, setDataConsulta] = useState("");
    const [temperatura, setTemperatura] = useState("");
    const [peso, setPeso] = useState("");
    const [tratamento, setTratamento] = useState("");
    const [observacoes, setObservacoes] = useState("");
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

    function formatarData(texto) {
        let numeros = texto.replace(/\D/g, "");
        if (numeros.length > 8) {
            numeros = numeros.slice(0, 8);
        }
        if (numeros.length > 4) {
            return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
        }
        if (numeros.length > 2) {
            return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
        }
        return numeros;
    }

    async function salvarProntuario() {
        if (!tutorSelecionado || !petSelecionado || !dataConsulta) {
            setMensagem("Selecione tutor, pet e informe a data da consulta.");
            return;
        }

        const storage = await AsyncStorage.getItem("PRONTUARIOS");
        let prontuarios = storage ? JSON.parse(storage) : [];

        const novoProntuario = {
            id: `${Date.now()}`,
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            dataConsulta,
            temperatura,
            peso,
            tratamento,
            observacoes,
        };

        prontuarios.push(novoProntuario);

        await AsyncStorage.setItem("PRONTUARIOS", JSON.stringify(prontuarios));

        setMensagem("Prontuário salvo com sucesso.");

        setTutorSelecionado(null);
        setPetsDoTutor([]);
        setPetSelecionado(null);
        setDataConsulta("");
        setTemperatura("");
        setPeso("");
        setTratamento("");
        setObservacoes("");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={50} color="#7167F6" alignSelf= "center"/>
            <Text style={styles.titulo}>Preencher prontuário</Text>

            {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}

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

            {petSelecionado && (
                <View style={styles.cardPet}>
                <Text style={styles.petTitulo}>Dados do pet</Text>
                <Text style={styles.petTexto}>Data de nascimento: {petSelecionado.nascimento}</Text>
                <Text style={styles.petTexto}>Raça: {petSelecionado.raca}</Text>
                <Text style={styles.petTexto}>Espécie: {petSelecionado.especie}</Text>
                <Text style={styles.petTexto}>Porte: {petSelecionado.porte}</Text>
                <Text style={styles.petTexto}>Pelagem: {petSelecionado.pelagem}</Text>
                <Text style={styles.petTexto}>Sexo: {petSelecionado.sexo}</Text>
                <Text style={styles.petTexto}>
                    Status do pet: {petSelecionado.obitoInformado ? "Óbito" : "Ativo"}
                </Text>
                </View>
            )}

            <Text style={styles.subtitulo}>Dados clínicos</Text>

            <TextInput placeholder="Data da consulta" style={styles.input} value={dataConsulta} keyboardType="numeric" maxLength={10} onChangeText={(value) => setDataConsulta(formatarData(value))}/>
            <TextInput placeholder="Temperatura" style={styles.input} onChangeText={setTemperatura}/>
            <TextInput placeholder="Peso" style={styles.input} value={peso} onChangeText={setPeso}/>
            <TextInput placeholder="Tratamento" style={styles.input} value={tratamento} onChangeText={setTratamento}/>
            <TextInput placeholder="Observações" style={styles.textArea} value={observacoes} onChangeText={setObservacoes} multiline/>

            <TouchableOpacity style={styles.btn} onPress={salvarProntuario}>
                <Ionicons name="save-outline" size={18} color="#fff"/>
                <Text style={styles.textoBtn}>Salvar prontuário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
                <Text style={styles.textoVoltar}>Voltar</Text>
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
        fontSize: 28,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    subtitulo: {
        fontSize: 20,
        color: "#7167F6",
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 12,
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

    select: {
        height: 50,
        backgroundColor: "#e5e5e5",
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

    cardPet: {
        backgroundColor: "#f1f1f1",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },

    petTitulo: {
        color: "#7167F6",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },

    petTexto: {
        fontSize: 15,
        color: "#333",
        marginBottom: 3,
    },

    input: {
        height: 50,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingTop: 12,
        marginBottom: 10,
        textAlignVertical: "top",
    },
    btn: {
        backgroundColor: "#7167F6",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        flexDirection: "row",
        gap: 8,
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