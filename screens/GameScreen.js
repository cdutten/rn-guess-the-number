import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Alert, ScrollView, Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {List, ListItem} from 'native-base';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import IconButton from "../components/IconButton";


/**
 * Generates a random number
 * between the min and max, excluding the third param
 *
 * @param min exclusive
 * @param max exclusive
 * @param exclude
 * @returns {number}
 */
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min + 1);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return rndNum;
};

const renderListItem = (value, numOfRound) => {
    return (
        <ListItem style={styles.listContainer} key={value}>
            <BodyText>#{numOfRound}</BodyText>
            <BodyText>{value}</BodyText>
        </ListItem>
    )
};


/**
 * @param props
 * @returns {*}
 * @constructor
 */
const GameScreen = props => {
    const initialGuess = generateRandomBetween(0, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                "Don't lie!",
                'You know that this is wrong...',
                [{text: 'Sorry', style: 'cancel'}]
            );
            return;
        }
        switch (direction) {
            case 'lower':
                currentMax.current = currentGuess;
                break;
            case 'greater':
                currentMin.current = currentGuess;
                break;
        }
        const nextGuess = generateRandomBetween(currentMin.current, currentMax.current, currentGuess)
        setCurrentGuess(nextGuess);
        setPastGuesses(currentPastGuesses => [nextGuess, ...currentPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <BodyText> Opponent's Guess </BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <IconButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <MaterialIcons name={"remove"}/> {' Lower'}
                </IconButton>
                <IconButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <MaterialIcons name={"add"}/> {' Greater'}
                </IconButton>
            </Card>
            <List>
                {pastGuesses.map((guess, index) => renderListItem(guess, index))}
            </List>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },
    listContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default GameScreen;
