import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';
import { WeatherDataResponse } from '../interfaces/types';
import { API_BASE_URL_ICON } from '@env';

interface Props {
    dataWeather: WeatherDataResponse;
}

export const Weather = ({ dataWeather }: Props) => {

    const { name, main } = dataWeather;
    if (!name) return null;

    const kelvinToCelsius: number = main.temp - 273.15;
    const kelvinToMinCelsius: number = main.temp_min - 273.15;
    const kelvinToMaxCelsius: number = main.temp_max - 273.15;

    return (
        <View>
            <Text style={[styles.text, styles.current]}>{parseInt(kelvinToCelsius.toString())}
                <Text style={styles.temperature}>&#x2103;</Text>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: `${API_BASE_URL_ICON}/w/${dataWeather.weather[0].icon}.png` }}
                />
            </Text>

            <View style={styles.temperatures}>
                <Text style={styles.text}>Min {' '}
                    <Text style={styles.temperature}>{parseInt(kelvinToMinCelsius.toString())} &#x2103;</Text>
                </Text>

                <Text style={styles.text}>Max {' '}
                    <Text style={styles.temperature}>{parseInt(kelvinToMaxCelsius.toString())} &#x2103;</Text>
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 10,
    },
    current: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold',
    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temperatures: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tempText: {

    }
});