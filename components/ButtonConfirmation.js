import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Colors from "../constants/colors";

const ButtonConfirmation = props => {
    const [title, setTitle] = useState(props.title);

    return (
        <View style={props.style}>
            <Button title={props.confirmed ? props.confirmationTitle : props.title}
                    color={Colors.primary}
                    onPress={props.confirmed ? props.onConfirm :props.onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default ButtonConfirmation;
