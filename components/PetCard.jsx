import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PetCard({ pet, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: pet.imagem }} style={styles.image}/>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{pet.nome}</Text>
                <Text style={styles.detail}>
                {pet.idade || "idade não informada"} {pet.sexo === "Macho" ? "♂" : "♀"}
                </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#7167F6",
        borderRadius: 12,
        marginHorizontal: 22,
        marginBottom: 14,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 4,
    },

    image: {
        width: 72,
        height: 72,
        borderRadius: 36,
    },

    info: {
        flex: 1,
        marginLeft: 14,
    },

    name: {
        color: "#FFFFFF",
        fontSize: 18,
    },

    detail: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    
    arrow: {
        color: "#FFFFFF",
        fontSize: 46,
    },
});