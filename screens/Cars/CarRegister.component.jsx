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
import { ColorPicker, fromHsv } from 'react-native-color-picker'

export const CarRegister = () => {

    const modalizeRef = useRef(null);

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

    const onOpen = () => {
        modalizeRef.current.open();
    };

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
                // await uploadPhoto({
                //     uri: uploadUri,
                //     name: imageName,
                //     type
                // })

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

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            setUserImage(`${urlBack}/imagen?ruta=personas&img=${user.strImg}`);
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
                    // await uploadPhoto({
                    //     uri: uploadUri,
                    //     name: imageName,
                    //     type
                    // })
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
