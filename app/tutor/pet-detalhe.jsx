import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function PetDetalhe() {
    const { petId } = useLocalSearchParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        buscarPet();
    }, []);

    async function buscarPet() {
        const petsStorage = await AsyncStorage.getItem("PETS");

        if (petsStorage !== null) {
            const pets = JSON.parse(petsStorage);
            const petEncontrado = pets.find((item) => item.id === petId);
            setPet(petEncontrado);
        }
    }

    async function alterarObito() {
        const petsStorage = await AsyncStorage.getItem("PETS");
        let pets = petsStorage ? JSON.parse(petsStorage) : [];

        const petsAtualizados = pets.map((item) => {
            if (item.id === pet.id) {
                return { ...item, obitoInformado: !item.obitoInformado };
            }
            return item;
        });

        await AsyncStorage.setItem("PETS", JSON.stringify(petsAtualizados));

        const petAtualizado = petsAtualizados.find((item) => item.id === pet.id);
        setPet(petAtualizado);
    }

    if (!pet) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Pet não encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconArea}>
                <MaterialCommunityIcons name="paw" size={50} color="#7167F6"/>
            </View>

            <Text style={styles.titulo}>{pet.nome}</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Data de nascimento:</Text>
                <Text style={styles.valor}>{pet.nascimento}</Text>
                <Text style={styles.label}>Raça:</Text>
                <Text style={styles.valor}>{pet.raca}</Text>
                <Text style={styles.label}>Espécie:</Text>
                <Text style={styles.valor}>{pet.especie}</Text>
                <Text style={styles.label}>Porte:</Text>
                <Text style={styles.valor}>{pet.porte}</Text>
                <Text style={styles.label}>Pelagem:</Text>
                <Text style={styles.valor}>{pet.pelagem}</Text>
                <Text style={styles.label}>Sexo:</Text>
                <Text style={styles.valor}>{pet.sexo}</Text>
                <Text style={styles.label}>Status do pet:</Text>
                <Text style={styles.valor}>{pet.obitoInformado ? "Óbito informado" : "Ativo"}</Text>
            </View>

            <TouchableOpacity style={styles.checkboxArea} onPress={alterarObito}>
                <View style={styles.checkbox}>
                    {pet.obitoInformado && <Ionicons name="checkmark" size={18} color="#7167F6" />}
                </View>
                <Text style={styles.textoCheckbox}>Informar óbito do pet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
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

    iconArea: {
        alignItems: "center",
        marginBottom: 8,
    },

    titulo: {
        fontSize: 28,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    card: {
        backgroundColor: "#f1f1f1",
        borderRadius: 12,
        padding: 18,
        borderWidth: 1.5,
        borderColor: "#7167F6",
    },

    label: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
    },

    valor: {
        fontSize: 18,
        color: "#111",
        fontWeight: "500",
    },

    checkboxArea: {
        backgroundColor: "#7167F6",
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 8,
        marginTop: 20,
    },

    checkbox: {
        width: 24,
        height: 24,
        backgroundColor: "#fff",
        borderRadius: 4,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    textoCheckbox: {
        color: "#fff",
        fontSize: 16,
    },

    btnVoltar: {
        alignItems: "center",
        marginTop: 24,
    },

    textoVoltar: {
        color: "#7167F6",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});