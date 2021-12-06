import React, { useEffect, useState } from 'react';
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
    Image
} from "./Cars.styles";
import { colors } from "../../styles/colors.styles";
import { urlBack } from '../../environments/environments.url';
import axios from 'axios';

export const Cars = ({ user }) => {

    const [cars, setCars] = useState([]);

    const handleGetCars = async () => {
        await axios.get(`${urlBack}/vehiculo`)
            .then(async (res) => {
                let vehiculos = res.data.cont.getVehiculos;
                const carrosFilter = await vehiculos.filter(vehi => vehi.idPersona === user._id)
                setCars(carrosFilter);
                console.log(cars)
            }).catch((err) => {
                console.log(err, 'err');
            })
    }

    const handleInfo = (car) => {

    }

    useEffect(() => {
        handleGetCars();
    }, []);

    return (
        <Container>
            {cars.length > 0 ? (
                <CarList
                    data={cars}
                    numColumns={1}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <Card>
                                <Image
                                    source={{
                                        uri: `${urlBack}/imagen?ruta=vehiculos&img=${item.strImg[0]}`,
                                    }}
                                />
                                <Car>{item.strMarca} {item.strModelo} {item.nmbAño} <Ionicons name="ellipse" size={17} color={item.strColor} /></Car>
                                <InfoButton onPress={(e) => { handleInfo(item) }}>
                                    <Ionicons name="information-circle" size={30} color={colors.success} />
                                </InfoButton>
                            </Card>
                        );
                    }}
                />
            ) : (
                <Label>No cars found :(</Label>
            )}

            <AddButtonContainer
                behavior={Platform.OS === "ios" ? "padding" : ""}
            >
                <AddButton >
                    <Ionicons name="add-circle" size={60} color={colors.success} />
                </AddButton>
            </AddButtonContainer>


        </Container >

        // <Button
        //     title="Press me"

        // />
    )
}

