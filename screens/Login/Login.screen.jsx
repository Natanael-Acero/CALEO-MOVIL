import React, { useState } from 'react';
import { ActivityIndicator, View, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from './Login.styles';
import axios from 'axios';

export const Login = ({ setUser }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [cargando, setCargando] = useState(false);
    const handleLogin = async () => {
        const data = { strCorreo: email, strContrasena: password }
        setCargando(true);
        try {
            axios
                .post(`${urlBack}/login`, data)
                .then((response) => {
                    console.log(response);
                    navigation.replace("Home");
                    setCargando(false)
                })
                .catch((error) => {
                    console.log(error.response)
                    setCargando(false)
                    Alert.alert('Error al iniciar sesión', error.response ? error.response.data.err.message : 'Error')
                })
        } catch (error) {
            setCargando(false)
            console.log(error);
        }

    }
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