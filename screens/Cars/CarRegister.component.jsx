import React, { useState } from 'react'
import { Button } from 'react-native'
import { ActivityIndicator, View, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from '../../screens/Login/Login.styles';

export const CarRegister = () => {

    const [newCar, setNewCar] = useState({
        strMarca: '',
        strModelo: '',
        strDescripcion: '',
        nmbAnio: '',
        strPlacas: '',
        strColor: '',
        idPersona: '',
        idCajon: ''
    });

    const handleInputChange = (field) => {
        setUsuario({
            ...usuario,
            ...field
        });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log('hola')
        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center", marginTop: 5 }}>
            <View>
                <StyledInput
                    placeholder="Marca"
                    value={newCar.strMarca}
                    onChangeText={(text) => handleInputChange({ strMarca: text })}

                />
                <StyledInput
                    placeholder="Modelo"
                    value={newCar.strModelo}
                    onChangeText={(text) => handleInputChange({ strModelo: text })}

                />
                <StyledInput
                    placeholder="Descripción"
                    value={newCar.strDescripcion}
                    onChangeText={(text) => handleInputChange({ strDescripcion: text })}

                />
                <StyledInput
                    placeholder="Año"
                    keyboardType="numeric"
                    value={newCar.nmbAnio}
                    onChangeText={(text) => handleInputChange({ nmbAnio: text })}

                />
                <StyledInput
                    placeholder="Placas"
                    value={newCar.strPlacas}
                    onChangeText={(text) => handleInputChange({ strPlacas: text })}

                />
                <StyledInput
                    placeholder="Color"
                    value={newCar.strColor}
                    onChangeText={(text) => handleInputChange({ strColor: text })}

                />
                <StyledInput
                    placeholder="Cajón"
                    secureTextEntry={true}
                    value={newCar.idCajon}
                    onChangeText={(text) => handleInputChange({ idCajon: text })}
                />

                <PressableButton title="Register" color="darkorange" bgColor="white" onPress={handleRegister} />

            </View>
        </KeyboardAvoidingView>
    )
}
