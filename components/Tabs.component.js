import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { Home } from "../screens/Home/Home.screen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from '../styles/colors.styles';
// import ProfileComponent from '../screens/Profile/Profile.component';

const Tab = createBottomTabNavigator();

export const TabsComponent = ({ user }) => {
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "HomeScreen") {
                            iconName = focused
                                ? "list-circle"
                                : "list-circle-outline";
                        }
                        if (route.name === "My profile") {
                            iconName = focused
                                ? "person-circle"
                                : "person-circle-outline";
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "grey",
                })}
            >
                <Tab.Screen name="HomeScreen" options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarActiveTintColor: colors.primary
                }}  >
                    {() => <Home user={user} />}
                </Tab.Screen>
                {/* <Tab.Screen name="My profile" options={{
                    title: 'My profile',
                    headerStyle: {
                        backgroundColor: colors.secundary
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarActiveTintColor: colors.secundary
                }}  >
                    {() => <ProfileComponent user={user} />}
                </Tab.Screen> */}

            </Tab.Navigator>
        </>
    )

}
