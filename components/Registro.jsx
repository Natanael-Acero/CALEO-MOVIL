import * as React from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';

function Registro({ }) {
    const [usuario, onChangeUsuario] = React.useState(null);
    const [contrasena, onChangeContrasena] = React.useState(null);
    const onPressLearnMore = () => {

    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView>
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
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

            </SafeAreaView>
        </View>
    );
}
export default Registro;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
    button: {
        margin: 5,
        padding: 10,
    }
});