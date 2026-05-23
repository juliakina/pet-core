import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ menuPath }) {
    return (
        <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => router.push(menuPath)}>
                <Ionicons name="menu" size={34} color="#7167F6"/>
            </TouchableOpacity>

            <Image source={require("../assets/logo.jpeg")} style={styles.logo}/>
            <Image source={require("../assets/avatar-default.png")} style={styles.avatar}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    logo: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 26,
    },
});