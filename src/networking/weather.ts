import { WeatherResponse } from "../model/weatherResponse";

// Función para agregar un retraso
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Función asíncrona para obtener los datos del clima con un retraso de 3 segundos
export const getWeather = async (city: string): Promise<WeatherResponse> => {
    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };


    await delay(3000);

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`, requestOptions);

    return response.json();

};