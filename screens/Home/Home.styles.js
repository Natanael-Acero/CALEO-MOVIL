import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors.styles";

let width = (Dimensions.get('window').width - 20);
console.log(width);
const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

const TaskList = styled.FlatList`
    flex: 1;
`;

const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${Math.round(width)}px;
    border-radius: 15px;
    background-color: ${colors.white} ;
    padding: 0;
    margin: 5px;
    box-shadow: 1px 1px 2px #cfcfcf;
    text-align: justify;
`;


const TaskStatusButton = styled.TouchableOpacity`
    flex: 1;
    align-items: baseline; 
    margin-left: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
    flex: 1;
    align-items: baseline; 
    margin-right: 10px;
`;

const Task = styled.Text`
    flex: 10;
    font-size: 17px;
    color: ${colors.black};
    padding: 20px ;
`;



const AddButtonContainer = styled.KeyboardAvoidingView`
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const AddButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

const Input = styled.TextInput`
    background-color: ${colors.white};
    flex: 3;
    padding: 5px;
    margin: 10px;
    border-radius: 8px;
    height: 40px;
    width: 100%;
    font-size: 20px;
    box-shadow: 1px 3px 5px #cfcfcf;
  `;

const Label = styled.Text`
  align-items: center;
  font-size: 25px;
  color: ${colors.black};
  padding:5px;
`;

export { Container, TaskList, Card, Task, TaskStatusButton, DeleteButton, AddButtonContainer, AddButton, Input, Label }