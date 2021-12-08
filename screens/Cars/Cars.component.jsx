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
import { Alert, Modal, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors.styles";
import { urlBack } from '../../environments/environments.url';
import { useNavigation } from "@react-navigation/core";
import Toast from 'react-native-root-toast';
import axios from 'axios';
import i18n from "../../localization/i18n";


export const CarsComponent = ({ setCars, cars, getCars, updateCar }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [carInfo, setCarInfo] = useState({});

    const handleInfo = async (car, modalVisible) => {
        await setCarInfo(car);
        setModalVisible(modalVisible);
    }

    const options = (car) => {
        Alert.alert(i18n.t("options"), i18n.t("doyou"), [
            {
                text: i18n.t("cancel"),
                onDismiss: () => console.log('cancel'),
                style: "cancel"
            },
            {
                text: i18n.t("edit"),
                onPress: () => handleUpdate(car),
                style: "default"
            },
            {
                text: i18n.t("remove"),
                onPress: () => removeCar(car._id),
                style: "default"
            }

        ])
    }

    const handleUpdate = (car) => {
        updateCar({ ...car });
        navigation.navigate('ActualizarAuto')
    }

    const removeCar = (idCar) => {
        Alert.alert(i18n.t("removeCar"), i18n.t("seguro"), [
            {
                text: i18n.t("cancel"),
                onDismiss: () => console.log("Canceled"),
                style: "cancel"
            },
            {
                text: i18n.t("confirm"),
                onPress: () => {
                    axios.delete(`${urlBack}/vehiculo/${idCar}/false`).then(resp => {
                        Toast.show(i18n.t("caremove"), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.TOP,
                            containerStyle: { marginTop: 50 },
                        });
                        getCars();
                        console.log(resp);
                    }).catch(err => {
                        Toast.show(i18n.t("alertProfileErr"), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.TOP,
                            containerStyle: { marginTop: 50 },
                        });
                        console.log(err.response);
                    });
                },
                style: "confirm"
            }

        ])
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
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onLongPress={() => options(item)}>
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
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item._id}

                />
            ) : (
                <Label>{i18n.t("nocarsfound")}(</Label>
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
                        <ModalText>{i18n.t("Descripcion")} {carInfo.strDescripcion}</ModalText>
                        <ModalText>{i18n.t("placas")} {carInfo.strPlacas}</ModalText>
                        <ModalText>{i18n.t("cajon")} {carInfo.cajon ? carInfo.cajon[0].nmbCajon : 'N/A'}</ModalText>
                        <ModalText>{i18n.t("estatus")} {carInfo.cajon ? (carInfo.cajon[0].blnRentado ? 'Vigente' : 'Pago pendiente') : ''}</ModalText>
                        <CloseButton onPress={() => handleInfo({}, false)}>
                            <Label>{i18n.t("cerrar")}</Label>
                        </CloseButton>
                    </ModalView>
                </ModalContainer>
            </Modal>



        </Container >
    )
}
