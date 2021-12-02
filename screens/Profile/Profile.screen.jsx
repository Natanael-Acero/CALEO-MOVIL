import React from 'react'
import { View, Button, Text } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = () => {

    const navigation = useNavigation();

    handleLogout = () => {
        navigation.replace("Login");
        AsyncStorage.removeItem('authorization');
    }
    return (
        <Button
            title="Logout"
            onPress={handleLogout}
        />
    )
}


