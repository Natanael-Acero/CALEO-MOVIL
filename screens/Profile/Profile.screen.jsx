import React, { useRef, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/core";
import { InfoContainer, Header, AccountImage, LogoutButton, TextButton, DrawerText, DrawerButton } from '../Profile/Profile.styles';
import { TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { urlBack } from '../../environments/environments.url';
import axios from 'axios';
export const Profile = ({user}) =>  {
   const modalizeRef = useRef(null);
console.log(user);
 
   const navigation = useNavigation();
   const [userImage, setUserImage] = useState('')
   const [image, setImage] = useState('')

  const handleSignOut = () => {
        navigation.replace("Login");
        AsyncStorage.removeItem('authorization');
  };
 const onOpen = () => {
    modalizeRef.current.open();
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    setUserImage(`${urlBack}/imagen?ruta=personas&img=${user.strImg}`)
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
      let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1); 
      

    }
    } catch (error) {
      console.error(error);
       Toast.show("An error has ocurred!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
    }
  };
  const takePicture = async () => {

    try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
        console.log(result);
      let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
      let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        try {
    //   const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function (e) {
    //     console.log(e);
    //     reject(new TypeError("Network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", uploadUri, true);
    //   xhr.send(null);
    // });
await uploadPhoto({
    uri: uploadUri,
    name: imageName,
    type: result.type
})
    } catch (error) {
      console.log(error);
      Toast.show("An error has ocurred!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
      });
    }
    }
    } catch (error) {
      console.error(error);
       Toast.show("An error has ocurred!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
    }
  }

  
const uploadPhoto = async (img) => {
    let formData = new FormData();
    formData.append("archivo", img, img.name);
    console.log(formData);
await axios.put(`${urlBack}/carga/?ruta=personas&id=${user._id}`, formData).then(res => {
Toast.show("Image upload correctly!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
    console.log(res);
                    }).catch(err => {
                        console.log(err);
                        Toast.show("An error has ocurred!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      containerStyle: { marginTop: 50 },
    });
                    })
};
  return (

    <InfoContainer>
      <TouchableOpacity onPress={onOpen}>
        <AccountImage source={{ uri:userImage}} />
      </TouchableOpacity>
      <Header> {user.strNombre} {user.strPrimerApellido} {user.strSegundoApellido} </Header>
      <Header> {user.strCorreo}</Header>
      <LogoutButton onPress={handleSignOut}>
        <TextButton>Sign out</TextButton>
      </LogoutButton>
      <Modalize ref={modalizeRef} modalHeight={150} >

    <DrawerButton onPress={pickImage}><DrawerText><Ionicons name="cloud-upload-outline" size={30} color='black'/> Upload Image</DrawerText></DrawerButton>
    <DrawerButton onPress={takePicture}><DrawerText><Ionicons name="camera-outline" size={30} color='black'/> Take photo</DrawerText></DrawerButton>


      </Modalize>
    </InfoContainer>


  );
};





