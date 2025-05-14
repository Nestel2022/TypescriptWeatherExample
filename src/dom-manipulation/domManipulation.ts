import { DayOfWeek, WeatherIcon, WeatherIcontype, WeatherResponse } from "../model/weatherResponse";

// TODO: Crear referencias para todos los elementos HTML
export const buttonClick = document.getElementById("button-location");
const WeatherIconPng = document.getElementById("weather-icon");
const DateDayName = document.getElementById("date-dayname");
const LocationText = document.getElementById("location-text");
const DateDay = document.getElementById("date-day");
const WeatherTem = document.getElementById("weather-tem");
const WeatherDesc = document.getElementById("weather-desc");
const TemMax = document.getElementById("text-temp-max");
const TemMin = document.getElementById("text-temp-min");
const humidity = document.getElementById("text-humidity");
const wind = document.getElementById("text-wind");
const LocationInput = document.getElementById("weather-location-input");

const alertContainer = document.getElementById('alert-container');
const alertMessage = document.getElementById('alert-message');
const alertCloseButton = document.getElementById('alert-close-button');

// TODO: Crear la lógica de la función
export const updateInteface = (weather: WeatherResponse): void => {
    try {
        if (DateDayName) DateDayName.textContent = getDayOfWeek();
        if (DateDay) DateDay.textContent = getDate();
        if (LocationText) LocationText.textContent = weather.name;

        if (WeatherTem) WeatherTem.textContent = Math.floor(weather.main.temp).toString() + "°C";
        if (WeatherDesc) WeatherDesc.textContent = weather.weather[0].main;
        changeWeatherIcon(weather.weather[0].icon ?? '01d');

        if (TemMax) TemMax.textContent = weather.main.temp_max + "°C";
        if (TemMin) TemMin.textContent = weather.main.temp_min + "°C";
        if (humidity) humidity.textContent = weather.main.humidity.toString() + "%";
        if (wind) wind.textContent = weather.wind.speed.toString() + "m/s";
    } catch (error) {
        showAlert("Error al cargar la interfaz");       
    }
};

// TODO: Obtener la ciudad desde el elemento de entrada
export function getCity(): string {
    try {
        if (LocationInput) {
            return (LocationInput as HTMLInputElement).value;
        }
    } catch (error) {        
        showAlert("Error al obtener la ciudad");    
    }
    return "";
}

function getDayOfWeek(): string {
    try {
        let day = new Date();
        return DayOfWeek[day.getDay()];
    } catch (error) {
        showAlert("Error al obtener el día de la semana:");       
        return "";
    }
}

function getDate(): string {
    try {
        let date = new Date();
        return date.toLocaleDateString("es-ES");
    } catch (error) {
        showAlert("Error al obtener la fecha");        
        return "";
    }
}

function changeWeatherIcon(weatherImageRef: string) {
    try {
        const weatherMap = [weatherImageRef];
        validateImage(weatherMap);
        const mappedWeather = weatherMap.map(weather => WeatherIcon[weather])[0] ?? WeatherIcon["01d"];
        if (typeof mappedWeather[0] === "string") {
            if (WeatherIconPng) (WeatherIconPng as HTMLImageElement).src = mappedWeather;
        }
    } catch (error) {
        showAlert("Error al cambiar el ícono del clima");        
    }
}

function validateImage(values: string[]): asserts values is WeatherIcontype[] {
    try {
        if (!values.every(isValidImage)) {
            throw Error('Imagen no válida');
        }
    } catch (error) {
        showAlert("Error al validar la imagen");       
        throw error; // Re-lanzar el error para asegurar que se propague
    }
}

function isValidImage(value: string): value is WeatherIcontype {
    try {
        return value in WeatherIcon;
    } catch (error) {
        showAlert("Error al validar si el valor es una imagen válida");        
        return false;
    }
}

function showAlert(message: string): void {   
    if (!alertMessage || !alertContainer) return;
    alertMessage.textContent = message;
    alertContainer.style.display = 'block';

    // Ocultar el contenedor de alerta después de 3 segundos
    setTimeout(() => alertContainer.style.display = 'none', 3000);    
}

if (alertCloseButton && alertContainer) {
    alertCloseButton.addEventListener('click', () => {
        alertContainer.style.display = 'none';
    });
}
