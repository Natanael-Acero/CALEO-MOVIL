import * as React from 'react';
import {
    ActivityIndicator, View, SafeAreaView, StyleSheet,
    TextInput, Button, Alert, Text, Image
} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { urlBack } from '../Environments/environments.url';
import axios from 'axios';


export const Login = ({ setUser }) => {
    const navigation = useNavigation();
    const [usuario, onChangeUsuario] = React.useState(null);
    const [contrasena, onChangeContrasena] = React.useState(null);
    const [cargando, setCargando] = React.useState(false);
    const onPressLearnMore = async () => {
        const data = { strCorreo: usuario, strContrasena: contrasena }
        setCargando(true);
        try {
            axios
                .post(`${urlBack}/login`, data)
                .then((response) => {
                    navigation.navigate('Tabs')
                    setCargando(false)
                })
                .catch((error) => {
                    setCargando(false)
                    Alert.alert('Error al iniciar sesión', error.response ? error.response.data.err.message : 'Error')
                })
        } catch (error) {
            setCargando(false)
            console.log(error);
        }

    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={styles.tinyLogo}
                source={require('../assets/caleoLogo.png')}
            />
            <SafeAreaView>

                {
                    cargando ?
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#e98425" />
                        </View>
                        :
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeUsuario}
                                placeholder="Usuario"
                                value={usuario}

                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeContrasena}
                                value={contrasena}
                                placeholder="Contraseña"
                                secureTextEntry={true}
                            />
                            <View style={styles.button}>
                                <Button
                                    onPress={onPressLearnMore}
                                    title="Enviar"
                                    color="#e98425"
                                    accessibilityLabel="Learn more about this purple button"
                                    disabled={(usuario == null || usuario == "") || (contrasena == "" || contrasena == null)}
                                />
                            </View>

                            <Text style={styles.text}
                                onPress={() => navigation.navigate('Registro')}>
                                ¿No cuentas con un registro?
                            </Text>
                        </View>
                }

            </SafeAreaView>
        </View>
    );
}
export default Login;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250,
        borderRadius: 30,
    },
    button: {
        borderRadius: 30,
        margin: 10,
        padding: 5,
    },
    text: {
        marginTop: 20,
        textAlign: 'center',
        color: "#e98425"
    },
    tinyLogo: {
        margin: 30,
        width: 205,
        height: 45,
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});