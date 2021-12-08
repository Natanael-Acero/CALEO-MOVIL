import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarsComponent } from './Cars.component';
import axios from 'axios';
import { urlBack } from '../../environments/environments.url';
import { CarRegister } from './CarRegister.component';
import { colors } from '../../styles/colors.styles';

const Stack = createNativeStackNavigator();


export const Cars = ({ user }) => {

    const [cars, setCars] = useState([]);

    const handleGetCars = async () => {
        await axios.get(`${urlBack}/vehiculo`)
            .then(async (res) => {
                let vehiculos = res.data.cont.getVehiculos;
                const carrosFilter = await vehiculos.filter(vehi => vehi.idPersona === user._id)
                await setCars(carrosFilter);
                // console.log(cars)
            }).catch((err) => {
                console.log(err, 'err');
            })
    }

    useEffect(() => {
        handleGetCars();
    }, []);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='CarsComponent'>
                <Stack.Screen name="CarsComponent" options={{
                    headerTitle: 'My Cars',
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.primary },
                }} >
                    {() => <CarsComponent setCars={setCars} cars={cars} />}
                </Stack.Screen>

                <Stack.Screen name="RegistroAuto"
                    options={{
                        headerShown: true,
                        headerTitle: 'Car Register',
                        headerStyle: { backgroundColor: colors.primary }
                    }}>
                    {() => <CarRegister user={user} getCars={handleGetCars} />}
                </Stack.Screen>
                {/* <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {() => <TabsComponent user={user} />}
                </Stack.Screen> */}
            </Stack.Navigator>
            <StatusBar style='auto' />
        </NavigationContainer>
    )
}

