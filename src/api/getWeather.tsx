import axios from "axios";
import { API_BASE_URL, API_KEY } from '@env';

import { WeatherDataResponse } from "../interfaces/types";


export const weatherRequest = async (country: string, city: string) => {
    try {
        const resp = await axios.get<WeatherDataResponse>(`${API_BASE_URL}q=${city},${country}&appid=${API_KEY}`);
        const data = resp.data;
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        }
    }
}