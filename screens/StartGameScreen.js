import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import ButtonConfirmation from "../components/ButtonConfirmation";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        setConfirmed(false);
        props.onStartGame(selectedNumber);
        setEnteredValue('');
    };

    const preConfirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99) {
            //TODO: This alert can be a component with better style
            Alert.alert(
                'Invalid number!',
                'Has to be a number between 1 an 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>{'Start a New Game!'}</TitleText>
                <Card style={styles.card}>
                    <BodyText>{confirmed ? 'Your choice' : 'Select a number'}</BodyText>

                    <View style={styles.numberContainer}>
                    {
                        confirmed ?
                            <NumberContainer>{enteredValue}</NumberContainer> :
                            <Input style={styles.input}
                                   blurOnSubmit
                                   autoCapitalize={'none'}
                                   autoCorrect={false}
                                   keyboardType={'numeric'}
                                   maxLength={2}
                                   onChangeText={numberInputHandler}
                                   value={enteredValue}
                            />
                    }
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title={'Reset'}
                                    color={Colors.secondary}
                                    onPress={resetInputHandler}
                            />
                        </View>
                        <ButtonConfirmation title={'Confirm'}
                                            confirmationTitle={'Sure?'}
                                            style={styles.button}
                                            confirmed={confirmed}
                                            onPress={preConfirmInputHandler}
                                            onConfirm={confirmInputHandler}
                        />
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    card: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    numberContainer: {
        height: 70,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: '40%',
    },
    input: {
        width: '20%',
        textAlign: 'center',
        color: Colors.primary,
        fontSize: 22,
        marginVertical: 16,
        padding: 10,
        height: 45
    }
});

export default StartGameScreen;
