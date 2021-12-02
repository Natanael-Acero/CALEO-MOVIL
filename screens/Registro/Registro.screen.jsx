import React, { useState } from 'react';
import { ActivityIndicator, View, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from '../Login/Login.styles';
import { RegistroService } from '../../services/Auth/RegistroService';

export const Registro = () => {

    const navigation = useNavigation();

    const [cargando, setCargando] = useState(false);


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
        setCargando(true);

        try {
            await RegistroService(usuario).then((response) => {
                Alert.alert('Registro Exitoso', response.data.msg)
                setCargando(false);
                navigation.replace("Login");
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
                    setCargando(false);
                    Alert.alert('Error al registrar cuenta', error.response ? error.response.data.msg : 'Error al registrar al usuario')
                })

        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <LogoImage source={require('../../assets/caleoLogo.png')} />

            {
                cargando ?
                    <View >
                        <ActivityIndicator size="large" color="#e98425" />
                    </View>
                    :
                    <View>
                        <StyledInput
                            placeholder="Name"
                            value={usuario.strNombre}
                            onChangeText={(text) => handleInputChange({ strNombre: text })}

                        />
                        <StyledInput
                            placeholder="Primer Apellido"
                            value={usuario.strPrimerApellido}
                            onChangeText={(text) => handleInputChange({ strPrimerApellido: text })}

                        />
                        <StyledInput
                            placeholder="Segundo Apellido"
                            value={usuario.strSegundoApellido}
                            onChangeText={(text) => handleInputChange({ strSegundoApellido: text })}

                        />
                        <StyledInput
                            placeholder="Teléfono"
                            keyboardType="numeric"
                            value={usuario.nmbTelefono}
                            onChangeText={(text) => handleInputChange({ nmbTelefono: text })}

                        />
                        <StyledInput
                            placeholder="Dirección"
                            value={usuario.strDireccion}
                            onChangeText={(text) => handleInputChange({ strDireccion: text })}

                        />
                        <StyledInput
                            placeholder="Email"
                            value={usuario.strCorreo}
                            onChangeText={(text) => handleInputChange({ strCorreo: text })}

                        />
                        <StyledInput
                            placeholder="Password"
                            secureTextEntry={true}
                            value={usuario.strContrasena}
                            onChangeText={(text) => handleInputChange({ strContrasena: text })}
                        />

                        <PressableButton title="Register" color="darkorange" bgColor="white" onPress={handleRegister} />

                    </View>
            }

        </KeyboardAvoidingView>
    );
}


