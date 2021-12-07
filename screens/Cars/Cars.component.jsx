import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import {
    Container,
    CarList,
    Card,
    Car,
    InfoButton,
    AddButtonContainer,
    AddButton,
    Label,
    Image,
    ModalContainer,
    ModalView,
    CloseButton,
    ModalText
} from "./Cars.styles";
import { Modal } from "react-native";
import { colors } from "../../styles/colors.styles";
import { urlBack } from '../../environments/environments.url';
import { useNavigation } from "@react-navigation/core";


export const CarsComponent = ({ setCars, cars }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [carInfo, setCarInfo] = useState({});

    const handleInfo = async (car, modalVisible) => {
        await setCarInfo(car);
        setModalVisible(modalVisible);
    }

    const handleAdd = () => {
        navigation.navigate('RegistroAuto')
    }

    return (
        <Container>
            {cars.length > 0 ? (
                <CarList
                    data={cars}
                    numColumns={1}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <Card>
                                <Image
                                    source={{
                                        uri: `${urlBack}/imagen?ruta=vehiculos&img=${item.strImg[0]}`,
                                    }}
                                />
                                <Car>{item.strMarca} {item.strModelo} {item.nmbAño} <Ionicons name="ellipse" size={17} color={item.strColor} /></Car>
                                <InfoButton onPress={(e) => { handleInfo(item, true) }}>
                                    <Ionicons name="information-circle" size={30} color={colors.success} />
                                </InfoButton>
                            </Card>
                        );
                    }}
                />
            ) : (
                <Label>No cars found :(</Label>
            )}

            <AddButtonContainer
                behavior={Platform.OS === "ios" ? "padding" : ""}
            >
                <AddButton onPress={handleAdd}>
                    <Ionicons name="add-circle" size={60} color={colors.success} />
                </AddButton>
            </AddButtonContainer>

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
                        <ModalText>Descripción: {carInfo.strDescripcion}</ModalText>
                        <ModalText>Placas: {carInfo.strPlacas}</ModalText>
                        <ModalText>Cajón asignado: {carInfo.cajon ? carInfo.cajon[0].nmbCajon : 'N/A'}</ModalText>
                        <ModalText>Estatus: {carInfo.cajon ? (carInfo.cajon[0].blnRentado ? 'Vigente' : 'Pago pendiente') : ''}</ModalText>
                        <CloseButton onPress={() => handleInfo({}, false)}>
                            <Label>Cerrar</Label>
                        </CloseButton>
                    </ModalView>
                </ModalContainer>
            </Modal>



        </Container >
    )
}
