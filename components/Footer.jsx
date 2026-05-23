import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>Produzido por PetCore - Copyright © 2026.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#7167F6",
        padding: 10,
        alignItems: "center",
    },
    
    text: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
    },
});