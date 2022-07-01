import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Animated, Alert } from 'react-native'

import { Picker } from '@react-native-picker/picker';
import { WeatherFromData } from '../interfaces/types';

interface Props {
    city: string;
    country: string;
    onChange: (value: string, field: keyof WeatherFromData) => void;
    setCallRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WeatherForm = ({ city, country, onChange, setCallRequest }: Props) => {

    const [animatedBtn] = useState(new Animated.Value(1));

    const animatedIn = () => {
        Animated.spring(animatedBtn, {
            useNativeDriver: true,
            toValue: 0.9,
        }).start();
    }

    const animatedOut = () => {
        Animated.spring(animatedBtn, {
            useNativeDriver: true,
            toValue: 1,
            friction: 4,
            tension: 30
        }).start();
    }

    const animationBtnStyle = {
        transform: [{ scale: animatedBtn }]
    }

    const handleWeatherData = () => {
        if ([city.trim(), country.trim()].includes('')) {
            return Alert.alert('WeatherApp', 'Country and city must not be empty', [{ text: 'Ok' }])
        }
        setCallRequest(true);
    }

    return (
        <>
            <View style={styles.form}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='City'
                        placeholderTextColor='#666'
                        value={city}
                        onChangeText={(value) => onChange(value, 'city')}
                    />
                </View>

                <View>
                    <Picker
                        selectedValue={country}
                        onValueChange={(value) => onChange(value, 'country')}
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                    >
                        <Picker.Item label='-- Select country --' value='' />
                        <Picker.Item label='United State' value='US' />
                        <Picker.Item label='Mexico' value='MX' />
                        <Picker.Item label='El Salvador' value='SV' />
                        <Picker.Item label='España' value='ES' />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animatedIn()}
                    onPressOut={() => animatedOut()}
                    onPress={() => handleWeatherData()}
                >
                    <Animated.View style={[styles.btnSearch, animationBtnStyle]}>
                        <Text style={styles.txtSearch}>Search Weather</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 10
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    btnSearch: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    txtSearch: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
    }
})