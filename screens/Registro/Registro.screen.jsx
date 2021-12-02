import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from '../Login/Login.styles';
import axios from 'axios';

export const Registro = () => {
    const [usuario, setUsuario] = useState({
        strNombre: '',
        strPrimerApellido: '',
        strSegundoApellido: '',
        strCorreo: '',
        strContrasena: '',
        nmbTelefono: null,
        strDireccion: ''
    });

    const handleInputChange = (field) => {
        setUsuario({
            ...usuario,
            ...field
        });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log(usuario)
        try {
            await axios
                .post(`${urlBack}/persona`, usuario)
                .then((response) => {
                    console.log(response);
                    Alert.alert('Registro Exitoso', response.data.msg)
                    // navigation.navigate('Tabs')
                    // setCargando(false)\
                    setUsuario({
                        strNombre: '',
                        strPrimerApellido: '',
                        strSegundoApellido: '',
                        strEmail: '',
                        strPassword: '',
                        strTelefono: '',
                        strDireccion: ''
                    });
                })
                .catch((error) => {
                    // setCargando(false)

                    Alert.alert('Error al iniciar sesión', error.response.data.err.message ? error.response.data.err.message : 'Error')
                })

        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <LogoImage source={require('../../assets/caleoLogo.png')} />
            <View>
                <StyledInput
                    placeholder="Name"
                    id="strNombre"
                    name="strNombre"
                    value={usuario.strNombre}
                    onChangeText={(text) => handleInputChange({ strNombre: text })}

                />
                <StyledInput
                    placeholder="Primer Apellido"
                    id='strPrimerApellido'
                    name='strPrimerApellido'
                    value={usuario.strPrimerApellido}
                    onChangeText={(text) => handleInputChange({ strPrimerApellido: text })}

                />
                <StyledInput
                    placeholder="Segundo Apellido"
                    id='strSegundoApellido'
                    name='nastrSegundoApellidome'
                    value={usuario.strSegundoApellido}
                    onChangeText={(text) => handleInputChange({ strSegundoApellido: text })}

                />
                <StyledInput
                    placeholder="Teléfono"
                    id='nmbTelefono'
                    name='nmbTelefono'
                    keyboardType="numeric"
                    value={usuario.nmbTelefono}
                    onChangeText={(text) => handleInputChange({ nmbTelefono: text })}

                />
                <StyledInput
                    placeholder="Dirección"
                    id='strDireccion'
                    name='strDireccion'
                    value={usuario.strDireccion}
                    onChangeText={(text) => handleInputChange({ strDireccion: text })}

                />
                <StyledInput
                    placeholder="Email"
                    id='strCorreo'
                    name='strCorreo'
                    value={usuario.strCorreo}
                    onChangeText={(text) => handleInputChange({ strCorreo: text })}

                />
                <StyledInput
                    placeholder="Password"
                    id='strContrasena'
                    name='strContrasena'
                    value={usuario.strContrasena}
                    onChangeText={(text) => handleInputChange({ strContrasena: text })}
                />

                <PressableButton title="Register" color="darkorange" bgColor="white" onPress={handleRegister} />

            </View>
            {/* We have 2 buttons that will execute the functions above) */}

        </KeyboardAvoidingView>
    );
}


