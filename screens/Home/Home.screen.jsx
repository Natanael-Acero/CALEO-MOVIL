import React, { useEffect, useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import { SearchInput, ContainerRe, ButtonContainer, Label, Card } from './Home.styles'
import { StyledInput } from '../Login/Login.styles'
import { UsuarioService } from '../../services/Usuario/UsuarioService'


export const Home = (userData) => {
    const [cajon, setCajon] = useState({ strNombre: '', strDescripcion: '' })
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(userData.user);
    const [cajones, setCajones] = useState([])

    const getCajones = async () => {
        UsuarioService(user._id).then(res => {
            setCajones(res.data.cont);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleInputChange = (field) => {
        setCajon({
            ...cajon,
            ...field
        });
    }
    const registro = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        getCajones()
    }, [])

    return (
        <ContainerRe >
            <SearchInput title="Text" placeholder="  Buscar..." />
            <ButtonContainer disabled={false} onPress={registro} >
                <Label>+</Label>
            </ButtonContainer>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <StyledInput
                            placeholder="Nombre"
                            value={cajon.strNombre}
                            onChangeText={(text) => handleInputChange({ strNombre: text })} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {
                cajones.map(cajon => {
                    return (
                        <Card>
                            <Text style={styles.text} key={cajon.cajon._id} >Cajon:{cajon.cajon.nmbCajon}</Text>
                        </Card>
                    )
                })
            }


        </ContainerRe>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 370,
        height: "81%",
        maxWidth: 370,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        width: 200,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        textAlign: 'center',
        color: "black",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});







