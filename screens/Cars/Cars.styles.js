import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors.styles";

let width = (Dimensions.get('window').width - 20);
console.log(width);
const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

const CarList = styled.FlatList`
    flex: 1;
`;

const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${Math.round(width)}px;
    height: 100px;
    border-radius: 15px;
    background-color: ${colors.white} ;
    padding: 0;
    margin: 5px;
    box-shadow: 1px 1px 2px #cfcfcf;
    text-align: center;
`;


const InfoButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center; 
    /* margin-right: 10px; */
`;

const Image = styled.Image`
    width: 70px;
    height: 70px;
    margin: 20px;
    borderRadius: 10px;
`;

const Car = styled.Text`
    flex: 3;
    align-items: center;
    font-size: 17px;
    color: ${colors.black};
    padding:10px;
`;

const AddButtonContainer = styled.KeyboardAvoidingView`
    background-color: transparent;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;

const AddButton = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-end;
    padding: 20px;
`;

const Label = styled.Text`
  align-items: center;
  font-size: 25px;
  color: ${colors.black};
  padding:5px;
`;

export { Container, CarList, Card, Car, InfoButton, AddButtonContainer, AddButton, Label, Image }