import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors.styles";
import React from 'react';

let width = (Dimensions.get('window').width - 20);

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;
const ContainerRe = styled.SafeAreaView`
    flex: 1;
   margin: 10px;
   background-color: #E8E8E8;
   border-radius: 40px;
`;

const TaskList = styled.FlatList`
    flex: 1;
`;

const Card = styled.View`
    
    justify-content: space-between;
    align-items: flex-start;
    width: ${Math.round(width)}px;
    border-radius: 15px;
    background-color: ${colors.white} ;
    margin: 2%;
    padding: 3%;
    box-shadow: 1px 1px 2px #cfcfcf;
    width: 95%;
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
const SearchInput = styled.TextInput`
  border: 1.5px orange;
  margin: 15px;
  padding: 3px;
  border-radius: 50px;
  align-items: flex-start;
  width: 80%;
  background-color: ${colors.background};
`;
const LabelText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${colors.black};
  border: solid 1px;
  border-radius: 10px;
  padding: 3%;
  margin-bottom: 8%;
`;


const Label = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${colors.white};
`;
const ButtonContainer = styled.TouchableOpacity`
        width: 32px;
        height: 32px;
        position: absolute;
        top: 2.5%;
        right: 15px;
        border-radius: 50px;
        color: white;
        font-size: 25px;
        background-color: orange;
        
`;
const ButtonDelete = styled.TouchableOpacity`
        margin-top: 7%;
        position: absolute;
        right: 1%;
        font-size: 25px; 
`;





export {
    Container, TaskList, Card, Task,
    TaskStatusButton, DeleteButton, AddButtonContainer,
    AddButton, Input, Label, SearchInput,
    ContainerRe, ButtonContainer, ButtonDelete,
    LabelText
}