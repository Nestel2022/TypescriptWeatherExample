import './styles/main.scss';

// Importar métodos necesarios
import { buttonClick, getCity, updateInteface } from './dom-manipulation/domManipulation';
import { getWeather } from './networking/weather';

// Referencia al spinner
const spinner = document.getElementById("spinner");

// Función asíncrona para llamar al método de la API y manejar el spinner
export const displayWeather = async () => {
    try {
        if (buttonClick) (buttonClick as HTMLButtonElement).disabled = true; // Bloquear el botón
        if (spinner) spinner.style.display = "block"; // Mostrar el spinner

        const city = getCity();
        if (city) {
            const weather = await getWeather(city);
            updateInteface(weather);
        }
    } catch (error) {
        console.error("Error al obtener y mostrar el clima:", error);
    } finally {
        if (buttonClick) (buttonClick as HTMLButtonElement).disabled = false; // Desbloquear el botón
        if (spinner) spinner.style.display = "none"; // Ocultar el spinner
    }
};

// Agregar un event listener al botón
if (buttonClick) buttonClick.addEventListener('click', displayWeather);