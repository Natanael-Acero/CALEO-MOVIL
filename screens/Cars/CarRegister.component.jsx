import React, { useRef, useState, useEffect } from 'react'
import { ActivityIndicator, View, Alert, KeyboardAvoidingView, Dimensions, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modalize } from 'react-native-modalize';
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from '../../screens/Login/Login.styles';
import {
    Container,
    Label,
    ModalContainer,
    ModalView,
    CloseButton,
    DrawerButton,
    DrawerText
} from "./Cars.styles";
import axios from 'axios';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Keyboard } from "react-native";

export const CarRegister = ({ user, getCars }) => {

    const modalizeRef = useRef(null);

    const navigation = useNavigation();

    const [cargando, setCargando] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const [file, setFile] = useState({});

    const [cajones, setCajones] = useState([]);

    const [newCar, setNewCar] = useState({
        strMarca: '',
        strModelo: '',
        strDescripcion: '',
        nmbAño: '',
        strImg: [],
        strPlacas: '',
        strColor: '#F12',
        idPersona: user._id,
        idCajon: cajones.length > 0 ? cajones[0]._id : undefined
    });

    const onOpen = () => {
        Keyboard.dismiss();
        modalizeRef.current.open();
    };

    const getCajon = async () => {
        await axios.get(`${urlBack}/cajon`)
            .then(async (res) => {
                let cajones = res.data.cont.cajon;
                let cajonesLibres = cajones.filter((cajon) => cajon.blnRentado != true)
                if (cajonesLibres.length <= 0) {
                    Alert.alert('Lo sentimos, por el momento no contamos con cajónes disponibles.')
                    navigation.navigate("CarsComponent");
                }
                await setCajones(cajonesLibres);
                setNewCar({ ...newCar, idCajon: cajonesLibres[0]._id })
            }).catch((err) => {
                console.log(err, 'err');
            })
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true
            });

            if (!result.cancelled) {
                let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
                let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                let match = /\.(\w+)$/.exec(imageName);
                let type = match ? `image/${match[1]}` : `image`;
                await setFile({
                    uri: uploadUri,
                    name: imageName,
                    type
                })

            }
        } catch (error) {
            console.error(error);
            Toast.show("An error has ocurred!", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                containerStyle: { marginTop: 50 },
            });
        }
    };

    const handleInputChange = (field) => {
        setNewCar({
            ...newCar,
            ...field
        });
    }

    const handleAddColor = () => {
        Keyboard.dismiss();
        setModalVisible(!modalVisible);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setCargando(true);
        Keyboard.dismiss();
        try {
            await axios.post(`${urlBack}/vehiculo`, newCar).then(async (response) => {
                Alert.alert('Registro Exitoso', response.data.msg)
                const idAuto = response.data.cont.autos._id;

                if (file.name) {
                    let formData = new FormData();
                    formData.append("archivo", file, file.name);

                    await axios.put(`${urlBack}/carga/?ruta=vehiculos&id=${idAuto}`, formData)
                        .then(res => {

                            setCargando(false);
                        }).catch(error => {
                            console.log(error, 'errorIMG');
                        })
                    await getCars()
                    navigation.navigate("CarsComponent");
                }
                await getCars();
                navigation.navigate("CarsComponent");
            }).catch((error) => {
                console.log(error.response, 'errorGEN')
                setCargando(false);
                Alert.alert('Error al registrar el vehiculo', error.response ? error.response.data.msg : 'Error al registrar el vehiculo')
            })
        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const takePicture = async () => {

        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                console.log(result);
                let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
                let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                try {
                    let match = /\.(\w+)$/.exec(imageName);
                    let type = match ? `image/${match[1]}` : `image`;
                    await setFile({
                        uri: uploadUri,
                        name: imageName,
                        type
                    })

                } catch (error) {
                    console.log(error);
                    Toast.show("An error has ocurred!", {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.TOP,
                        containerStyle: { marginTop: 50 },
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Toast.show("An error has ocurred!", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                containerStyle: { marginTop: 50 },
            });
        }
    }

    useEffect(() => {
        getCajon();
    }, [])

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
                                value={newCar.nmbAño}
                                onChangeText={(text) => handleInputChange({ nmbAño: text })}

                            />
                            <StyledInput
                                placeholder="Placas"
                                value={newCar.strPlacas}
                                onChangeText={(text) => handleInputChange({ strPlacas: text })}

                            />
                            <PressableButton title="Add Color" color="darkorange" bgColor="white" onPress={handleAddColor} />

                            <PressableButton title="Add Image" color="darkorange" bgColor="white" onPress={onOpen} />
                            <PressableButton title="Register" color="white" bgColor="darkorange" onPress={handleRegister} />
                        </View>
                    )
                }
            </KeyboardAvoidingView>
            <Modalize ref={modalizeRef} modalHeight={150} >
                <DrawerButton onPress={pickImage}><DrawerText><Ionicons name="cloud-upload-outline" size={30} color='black' /> Upload Image</DrawerText></DrawerButton>
                <DrawerButton onPress={takePicture}><DrawerText><Ionicons name="camera-outline" size={30} color='black' /> Take photo</DrawerText></DrawerButton>
            </Modalize>
        </Container>
    )
}
