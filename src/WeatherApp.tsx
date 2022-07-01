import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { weatherRequest } from './api/getWeather';
import { WeatherForm } from './components/WeatherForm';
import { Weather } from './components/Weather';
import { useForm } from './hooks/userForm';
import { WeatherDataResponse, WeatherFromData } from './interfaces/types';
import { setBgColorWeather } from './helper/bgColorWeather';

export const WeatherApp = () => {

    const { country, city, onChange } = useForm<WeatherFromData>({
        country: '',
        city: ''
    })

    const [dataWeather, setDataWeather] = useState<WeatherDataResponse>({} as WeatherDataResponse);
    const [bgColor, setBgColor] = useState<string>('rgb(71, 149, 212)');
    const [callRequest, setCallRequest] = useState<boolean>(false);

    useEffect(() => {
        if (callRequest) {
            const getWeather = async () => {
                const data = await weatherRequest(country, city);
                if (typeof data === 'undefined') {
                    return Alert.alert('WeatherApp', 'No results, try another city and country', [{ text: 'Ok' }])
                }

                setDataWeather(data!);
                setBgColor(setBgColorWeather(data))
            }

            getWeather();
            setCallRequest(false);
        }
    }, [callRequest])


    const bgColorApp = {
        backgroundColor: bgColor,
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => hideKeyboard()}
        >
            <View style={[styles.app, bgColorApp]}>
                <View style={styles.container}>
                    <Weather dataWeather={dataWeather} />
                    <WeatherForm country={country} city={city} onChange={onChange} setCallRequest={setCallRequest} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        marginHorizontal: '2.5%'
    }
})