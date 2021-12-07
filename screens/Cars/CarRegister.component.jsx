import React, { useState } from 'react'
import { Button } from 'react-native'
import { ActivityIndicator, View, Alert, KeyboardAvoidingView, Dimensions, Modal } from 'react-native';
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
import { ColorPicker, TriangleColorPicker, fromHsv } from 'react-native-color-picker'

export const CarRegister = () => {

    const [modalVisible, setModalVisible] = useState(false);

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
    }

    const handleAddImage = () => {

    }

    const handleAddColor = () => {
        setModalVisible(!modalVisible);
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
                style={{ flex: 1, alignItems: "center", marginTop: 5 }}>
                {
                    modalVisible ? (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <ModalContainer>
                                <ModalView >
                                    <View >
                                        <ColorPicker
                                            onColorChange={(e) => handleInputChange({ strColor: fromHsv({ h: e.h, s: e.s, v: e.v }) })}
                                            style={{ flex: 1, width: 250 }}
                                            defaultColor={newCar.strColor}
                                            hideSliders={false}
                                        />
                                        <CloseButton onPress={() => setModalVisible(!modalVisible)}>
                                            <Label>Cerrar</Label>
                                        </CloseButton>
                                    </View>


                                </ModalView>

                            </ModalContainer>
                        </Modal>
                    ) : (
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
                            <PressableButton title="Add Color" color="darkorange" bgColor="white" onPress={handleAddColor} />

                            <PressableButton title="Add Image" color="darkorange" bgColor="white" onPress={handleRegister} />
                            <PressableButton title="Register" color="white" bgColor="darkorange" onPress={handleRegister} />

                        </View>
                    )
                }
            </KeyboardAvoidingView>
        </Container>
    )
}
