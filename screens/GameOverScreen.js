import React from 'react';
import {View, StyleSheet, Button, Image, Text} from 'react-native';
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <TitleText> Game over!</TitleText>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/success.png')}
                    resizeMode={'cover'}
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText>
                    Your phone needed
                    <Text style={styles.highlightText}> {props.rounds} </Text>
                    rounds to guess the number
                    <Text style={styles.highlightText}> {props.userNumber} </Text>
                </BodyText>
            </View>
            <View style={styles.buttonContainer}>
                <Button color={'blueviolet'} onPress={props.onRestart} title={'Restart'}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginVertical: 20
    },
    resultContainer: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    imageContainer: {
        height: 300,
        width: 300,
        borderRadius: 150,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.26,
        elevation: 5,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    highlightText: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    }
});

export default GameOverScreen;
