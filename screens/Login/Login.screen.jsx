import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { StyledInput, LogoImage, PressableButton } from './Login.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { LoginService } from '../../services/Auth/LoginService';

export const Login = ({ setUser }) => {

    const navigation = useNavigation();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleLoggedIn = async () => {
        setCargando(true);
        const localToken = await AsyncStorage.getItem('authorization')
        if (localToken !== null) {
            const tokenDecoded = jwt_decode(localToken);
            setUser({ ...tokenDecoded.usuario });
            setTimeout(() => {
                setCargando(false);
                navigation.replace("Home");
            }, 1500);

        }
        setTimeout(() => {
            setCargando(false);
        }, 1500);
    }

    const handleLogin = async () => {
        const data = { strCorreo: email, strContrasena: password }
        setCargando(true);
        try {
            LoginService(data)
                .then(async (response) => {
                    await AsyncStorage.setItem('authorization', response.data.token);
                    setUser({ ...response.data.usuario });
                    setCargando(false);
                    navigation.replace("Home");
                })
                .catch((error) => {
                    setCargando(false);
                    Alert.alert('Error al iniciar sesión', error.response ? error.response.data.err.message : 'Error')
                })
        } catch (error) {
            setCargando(false)
        }

    }

    useEffect(() => {
        handleLoggedIn();
    }, [])

    return (
        <KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <LogoImage source={require('../../assets/caleoLogo.png')} />
            {
                cargando ?
                    <View >
                        <ActivityIndicator size="large" color="#e98425" />
                    </View>
                    :
                    <View>
                        <StyledInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <StyledInput
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                        />
                        <PressableButton title="Login" color="white" bgColor="darkorange" onPress={handleLogin} disabled={(email == null || email == "") || (password == "" || password == null)} />
                        <PressableButton title="No Account? Sign Up" color="darkorange" bgColor="white" onPress={() => navigation.navigate('Registro')} />
                    </View>
            }

        </KeyboardAvoidingView>
    );
}