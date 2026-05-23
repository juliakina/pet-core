import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockUsers, mockPets } from "../data/mockData";

const KEYS = {
    USERS: "PETCORE_USERS",
    PETS: "PETCORE_PETS",
    SESSION: "PETCORE_SESSION",
    EXAMS: "PETCORE_EXAMS",
    RECIPES: "PETCORE_RECIPES",
    PROTOCOLS_SENT: "PETCORE_PROTOCOLS_SENT",
    RECORDS: "PETCORE_RECORDS",
    REPORTS: "PETCORE_REPORTS",
    HISTORY_REQUESTS: "PETCORE_HISTORY_REQUESTS",
};

export async function initializeStorage() {
    const users = await AsyncStorage.getItem(KEYS.USERS);
    const pets = await AsyncStorage.getItem(KEYS.PETS);
    
    if (!users) {
        await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(mockUsers));
    }
    if (!pets) {
        await AsyncStorage.setItem(KEYS.PETS, JSON.stringify(mockPets));
    }
}

export async function getData(key) {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

export async function setData(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getUsers() {
    return getData(KEYS.USERS);
}

export async function saveUsers(users) {
    return setData(KEYS.USERS, users);
}

export async function getPets() {
    return getData(KEYS.PETS);
}

export async function savePets(pets) {
    return setData(KEYS.PETS, pets);
}

export async function saveSession(user) {
    await AsyncStorage.setItem(KEYS.SESSION, JSON.stringify(user));
}

export async function getSession() {
    const data = await AsyncStorage.getItem(KEYS.SESSION);
    return data ? JSON.parse(data) : null;
}

export async function clearSession() {
    await AsyncStorage.removeItem(KEYS.SESSION);
}

export async function addItem(key, item) {
    const list = await getData(key);
    const updated = [item, ...list];
    await setData(key, updated);
}

export {KEYS};