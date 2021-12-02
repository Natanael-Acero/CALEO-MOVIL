import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//URLBACK 'https://estacionamiento-web-back.herokuapp.com'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Registro from './components/Registro';
import Tabs from './components/tabs/Tabs';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState({});

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Registro" component={Registro} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{ headerShown: false }} >
          {() => <Login setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} options={{ headerTitle: 'Registro', }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
