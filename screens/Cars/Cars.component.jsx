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


export const CarsComponent = ({ setCars, cars , getCars}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [carInfo, setCarInfo] = useState({});

    const handleInfo = async (car, modalVisible) => {
        await setCarInfo(car);
        setModalVisible(modalVisible);
    }

    const options = (idCar) => {
        Alert.alert("Options", "Do you want to do with this car?",[
            {
                text: "Edit",
                onPress: () => alert("Edit"+ idCar ),
                style: "default"
            },
            {
                text: "Remove",
                onPress: () => removeCar(idCar),
                style: "default"
            }
        ])
    }

    const removeCar = (idCar) => {
        Alert.alert("Remove a car", "Are you sure you want to remove this car?",[
            {
                text: "Cancel",
                onDismiss: () => console.log("Canceled"),
                style: "cancel"
            },
            {
                text: "Confirm",
                onPress: () => {
                    axios.delete(`${urlBack}/vehiculo/${idCar}/false`).then(resp => {
                        Toast.show("Car removed correclty!", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            containerStyle: { marginTop: 50 },
          });
                getCars();
          console.log(resp);
                    }).catch(err => {
                        Toast.show("An error has ocurred!", {
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
                            <TouchableOpacity onLongPress={() => options(item._id)}>
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
