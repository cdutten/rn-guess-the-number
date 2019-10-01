import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const IconButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default IconButton;
