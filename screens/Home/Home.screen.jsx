import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Text, RefreshControl } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import {
    SearchInput, ContainerRe, ButtonContainer,
    Label, Card, ButtonDelete, LabelText, ViewClose, CenteredView, ModalView, ScrollView,
    PressiableButton, ButtonEliminar, TextStyle, TextView, ButtonSucces, ButtonSuccess
} from './Home.styles'
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
                    <CenteredView >
                        <ModalView >
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
                                    {moment(descripcion.created_at).format('LLL')}
                                </Text>
                            </LabelText>
                            <ViewClose>
                                <PressiableButton
                                    onPressIn={() => setModalVisible(!modalVisible)}
                                >
                                    <TextStyle >{i18n.t("cerrar")}</TextStyle>
                                </PressiableButton>
                            </ViewClose>
                        </ModalView>
                    </CenteredView>
                </Modal>
                {
                    cajones.length > 0 ?

                        cajones.map(cajon => {
                            return (
                                <Card key={cajon.cajon._id}>
                                    <TextView key={cajon.cajon._id} >{i18n.t("Ndecajon")}{cajon.cajon.nmbCajon}</TextView>
                                    <ButtonEliminar >
                                        <ButtonDelete>
                                            <Ionicons onPress={() => { registro(cajon.cajon) }} name="cog-outline" size={25} color={colors.tertiary} />
                                        </ButtonDelete>
                                    </ButtonEliminar>
                                </Card>
                            )
                        })

                        :
                        <Card>
                            <TextView >
                                {i18n.t("nocajones")}
                                <Ionicons name="sad-outline" size={20} color={colors.tertiary} />
                            </TextView>
                        </Card>
                }

            </ScrollView>
        </ContainerRe>
    )

}









