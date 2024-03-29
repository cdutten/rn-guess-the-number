import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TitleText = props => <Text {...props} style={styles.text}>{props.children}</Text>;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
    }
});

export default TitleText;
