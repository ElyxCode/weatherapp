import { WeatherDataResponse } from "../interfaces/types";

export const setBgColorWeather = (data: WeatherDataResponse): string => {
    const currentTemperature: number = data.main.temp - 273.15;

    if (currentTemperature < 10) {
        return 'rgb(105, 108, 149)';
    }

    if (currentTemperature >= 10 && currentTemperature <= 25) {
        return 'rgb(71, 149, 212)'
    }

    return 'rgb(178, 28, 61)'
}