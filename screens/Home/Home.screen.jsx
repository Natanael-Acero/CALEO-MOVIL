import React, { useEffect, useState, useCallback } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { SearchInput, ContainerRe, ButtonContainer, Label, Card, ButtonDelete, LabelText } from './Home.styles'
import { StyledInput } from '../Login/Login.styles'
import { colors } from "../../styles/colors.styles";
import { UsuarioService } from '../../services/Usuario/UsuarioService'
import { useNavigation } from "@react-navigation/core";
import i18n from "../../localization/i18n";
import moment from 'moment';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export const Home = (userData) => {
    const [cajon, setCajon] = useState({ strNombre: '', strDescripcion: '' })
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(userData.user);
    const [textSearch, setTextSearch] = useState('');
    const [cajones, setCajones] = useState([])
    const navigation = useNavigation();
    const [descripcion, setDescripcion] = useState({
        blnActivo: '',
        blnRentado: '',
        created_at: '',
        nmbCajon: 0,
        strDescripcion: ''
    })
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => getCajones());
    }, []);

    const getCajones = async () => {
        UsuarioService(user._id).then(res => {
            setCajones(res.data.cont);
            setRefreshing(false)
            setTextSearch('');
        }).catch(err => {
            setRefreshing(false)
        })
    }

    const handleInputChange = (field) => {
        setCajon({
            ...cajon,
            ...field
        });
    }
    const filter = (text) => {
        setTextSearch(text)
        if (text == "") {
            UsuarioService(user._id).then(res => {
                setCajones(res.data.cont);
            }).catch(err => {
                console.log(err);
            })
        } else {
            UsuarioService(user._id).then(res => {
                const resp = res.data.cont;
                const filter = resp.filter(res => res.cajon.nmbCajon == text)
                setCajones(filter);
            }).catch(err => {
                console.log(err);
            })
        }


    }
    const registro = (cajon) => {
        setModalVisible(!modalVisible)
        setDescripcion({
            nmbCajon: cajon.nmbCajon,
            strDescripcion: cajon.strDescripcion,
            created_at: cajon.created_at
        })
    }

    useEffect(() => {
        getCajones()
    }, [])

    return (
        <ContainerRe >
            <SearchInput title={i18n.t("Text")} placeholder={i18n.t("Buscar"),'...'} value={textSearch} onChangeText={(text) => { filter(text) }} />
            <ButtonContainer disabled={false} onPress={() => { navigation.navigate("My cars"); }} >
                <Label>+</Label>
            </ButtonContainer>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ textAlign: 'left' }}>{i18n.t("Ndecajon")}</Text>
                            <LabelText>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {descripcion.nmbCajon}
                                </Text>
                            </LabelText>
                            <Text style={{ textAlign: 'left' }}>{i18n.t("Descripcion")}</Text>
                            <LabelText>
                                <Text>
                                    {descripcion.strDescripcion}
                                </Text>
                            </LabelText>
                            <Text style={{ textAlign: 'left' }}>{i18n.t("fechaderegistro")}</Text>
                            <LabelText>
                                <Text>
                                    {moment(descripcion.created_at).format('LL')}
                                </Text>
                            </LabelText>
                            <View style={styles.viewClose}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPressIn={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>{i18n.t("cerrar")}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {
                    cajones.map(cajon => {
                        return (
                            <Card key={cajon.cajon._id}>
                                <Text style={styles.text} key={cajon.cajon._id} >{i18n.t("Ndecajon")}{cajon.cajon.nmbCajon}</Text>
                                <View style={styles.buttonEliminar}>
                                    <ButtonDelete>
                                        <Ionicons onPress={() => { registro(cajon.cajon) }} name="cog-outline" size={25} color={colors.tertiary} />
                                    </ButtonDelete>
                                </View>
                            </Card>
                        )
                    })
                }
            </ScrollView>
        </ContainerRe>
    )

}

const styles = StyleSheet.create({
    viewClose: {
        padding: "10%",
        alignItems: 'center'
    },
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
        backgroundColor: `${colors.primary}`,
        alignItems: 'center',
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
    buttonEliminar: {
        width: "30%",
        position: 'absolute',
        right: "5%",
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});







