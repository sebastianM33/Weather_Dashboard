# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException

# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import (
    CORSMiddleware,
)  # NECESARIO PARA LA COMUNICACION ENTRE EL FRONT Y EL BACK
import requests  # ES PARA PODER HACER PETICIONES A LA API

app = FastAPI(
    title="Weather Dashboard API",
    description="### API para consultar el clima actual y el pronóstico de 3 días utilizando WeatherAPI.\n\nEsta API sirve como intermediario para el Weather Dashboard en React, proporcionando datos limpios y traducidos.",
    version="1.0.0",
    contact={
        "name": "Soporte de Clima App",
    },
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Permite peticiones desde cualquier origen (ej. tu frontend en localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

import os

# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

load_dotenv()  # Carga las variables de entorno desde el archivo .env

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "http://api.weatherapi.com/v1/forecast.json"


@app.get("/weather/current/{ciudad}")
def obtener_clima_actual(ciudad: str):
    url = BASE_URL
    parametros = {"key": API_KEY, "q": ciudad, "lang": "es"}

    try:
        respuesta = requests.get(url, params=parametros)
        if respuesta.status_code == 400:
            raise HTTPException(status_code=404, detail="Ciudad no encontrada")

        datos = respuesta.json()
        actual = datos["current"]  # OBTENEMOS LA INFORMACION ACTUAL DE LA API
        ubicacion = datos[
            "location"
        ]  # OBTENEMOS LA INFORMACION DE LA UBICACION DE LA API

        return {
            "pais": ubicacion["country"],
            "ciudad": ubicacion["name"],
            "region": ubicacion["region"],
            "temperatura_celsius": actual["temp_c"],
            "estado": actual["condition"]["text"],
            "icono": actual["condition"]["icon"],
            "porcentaje_humedad": actual["humidity"],
            "viento_kph": actual["wind_kph"],
            "uv": actual["uv"],
            "sensacion_termica": actual["feelslike_c"],
            "codigo": actual["condition"]["code"],
            "es_dia": actual["is_day"],
            "latitud": ubicacion["lat"],
            "longitud": ubicacion["lon"],
        }
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=500, detail="Error de conexión")


@app.get("/weather/forecast/{ciudad}")
def obtener_pronostico_clima(ciudad: str):
    url = BASE_URL
    parametros = {"key": API_KEY, "q": ciudad, "days": 3, "lang": "es"}

    try:
        respuesta = requests.get(url, params=parametros)
        if respuesta.status_code == 400:
            raise HTTPException(status_code=404, detail="Ciudad no encontrada")

        datos = respuesta.json()

        # Predecir de cada 3 horas
        todas_las_horas = datos["forecast"]["forecastday"][0]["hour"]
        pronostico_horas = []
        for hora in todas_las_horas:
            hora_str = hora["time"].split(" ")[1]
            if hora_str in [
                "03:00",
                "06:00",
                "09:00",
                "12:00",
                "15:00",
                "18:00",
                "21:00",
                "00:00",
            ]:
                pronostico_horas.append(
                    {
                        "hora": hora_str,
                        "temperatura": hora["temp_c"],
                        "condicion": hora["condition"]["text"],
                        "icono": hora["condition"]["icon"],
                        "codigo": hora["condition"]["code"],
                        "es_dia": hora["is_day"],
                    }
                )

        # Pronóstico de los próximos días
        pronostico_diario = []
        for dia in datos["forecast"]["forecastday"]:
            pronostico_diario.append(
                {
                    "fecha": dia["date"],
                    "temp_max": dia["day"]["maxtemp_c"],
                    "temp_min": dia["day"]["mintemp_c"],
                    "condicion": dia["day"]["condition"]["text"],
                    "icono": dia["day"]["condition"]["icon"],
                    "codigo": dia["day"]["condition"]["code"],
                    "es_dia": 1,
                }
            )

        return {
            "ciudad": datos["location"]["name"],
            "horas": pronostico_horas,
            "diario": pronostico_diario,
        }
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=500, detail="Error de conexión")
