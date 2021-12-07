import React, { useState } from 'react'
import { Button } from 'react-native'
import { ActivityIndicator, View, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from '../../screens/Login/Login.styles';
import {
    Container,
    CarList,
    Card,
    Car,
    InfoButton,
    AddButtonContainer,
    AddButton,
    Label,
    LabelColor,
    Image,
    ModalContainer,
    ModalView,
    CloseButton,
    ModalText,
    CardColorPicker
} from "./Cars.styles";
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'

export const CarRegister = () => {

    const [currentColor, setCurrentColor] = useState('#00000')

    const [newCar, setNewCar] = useState({
        strMarca: '',
        strModelo: '',
        strDescripcion: '',
        nmbAnio: '',
        strPlacas: '',
        strColor: '#fff',
        idPersona: '',
        idCajon: ''
    });

    const handleInputChange = (field) => {
        setNewCar({
            ...newCar,
            ...field
        });
        console.log(newCar);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log(newCar);
        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }


    return (
        <Container>


            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, alignItems: "center", marginTop: 5, }}>
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


                    <Container>
                        <TriangleColorPicker
                            onColorChange={(e) => handleInputChange({ strColor: fromHsv({ h: e.h, s: e.s, v: e.v }) })}

                            hideSliders={true}
                            hideControls={true}
                        />
                    </Container>

                    <PressableButton title="Register" color="white" bgColor="darkorange" onPress={handleRegister} />

                </View>
            </KeyboardAvoidingView>
        </Container>
    )
}
