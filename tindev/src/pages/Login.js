import React, { useState, useEffect } from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/Api';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ navigation }) => {

    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(user => {
                if (user) {
                    navigation.navigate('Main', { user });
                }
            })
    }, [])

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}>
            <Image source={logo} />
            <TextInput
                placeholder="Digite o seu usuário no Github"
                placeholderTextColor='#999'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                onChangeText={setUser} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>)


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
export default Login;
