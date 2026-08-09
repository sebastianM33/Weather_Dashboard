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

GEOAPIFY_KEY = os.getenv("WEATHER_API_KEY2")
BASE_URL2 = f"https://api.geoapify.com/v1/geocode/?text=Mosco&apiKey={GEOAPIFY_KEY}"



@app.get("/weather/reverse/{lat}/{lon}")
def obtener_ciudad_por_coordenadas(lat: float, lon: float):
    GEOAPIFY_KEY = os.getenv("WEATHER_API_KEY2") 
    
    url = f"https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&lang=es&apiKey={GEOAPIFY_KEY}"
    
    respuesta = requests.get(url)
    datos = respuesta.json()
    
    if "features" in datos and len(datos["features"]) > 0:
        props = datos["features"][0]["properties"]
        
        # 🧠 FILTRO INTELIGENTE (Estrategia de Fallback)
        # Python evaluará uno por uno. El primero que tenga datos, se guarda.
        ciudad_base = (
            props.get("city") or 
            props.get("town") or 
            props.get("municipality") or 
            props.get("village") or 
            props.get("county") or 
            "Ubicación desconocida"
        )
        
        region = props.get("state", "")
        pais = props.get("country", "")
        
        # Construimos un string más granular para que la búsqueda por texto sea más exacta
        # Ej: "Pereira, Risaralda, Colombia"
        partes = [ciudad_base]
        if region and region != ciudad_base:
            partes.append(region)
        if pais:
            partes.append(pais)
            
        ciudad_limpia = ", ".join(partes)
        
        return {
            "ciudad": ciudad_limpia,
            "pais": pais
        }
        
        
    return {"ciudad": "Ubicación desconocida", "pais": ""}

def limpiar_texto_clima(texto: str) -> str:
    if not texto:
        return texto
    # WeatherAPI tiene traducciones muy literales al español que suenan robóticas
    reemplazos = {
        "Lluvia Irregular En Las Cercanías": "Posible Lluvia Aislada",
        "Lluvia irregular en las cercanías": "Posible lluvia aislada",
        "Lluvia irregular": "Lluvia aislada",
        "Lluvia Irregular": "Lluvia Aislada",
        "Lluvia ligera irregular": "Llovizna aislada",
        "Lluvia Ligera Irregular": "Llovizna Aislada",
        "Nieve irregular en las cercanías": "Posible nieve aislada",
        "Nieve Irregular En Las Cercanías": "Posible Nieve Aislada",
        "Chubasco ligero": "Llovizna",
        "Chubascos ligeros": "Lloviznas",
        "Chubasco": "Lluvia breve",
        "Chubascos": "Lluvias breves"
    }
    
    for original, nuevo in reemplazos.items():
        texto = texto.replace(original, nuevo)
        
        
    return texto

def obtener_coordenadas_por_texto(texto: str) -> str:
    # Si ya parece ser coordenadas (ej. "4.81,-75.69"), lo devolvemos tal cual
    if "," in texto and any(c.isdigit() for c in texto):
        if texto[0].isdigit() or texto[0] == '-':
            return texto

    # Si es texto, usamos Geoapify para obtener la latitud y longitud exacta del centro de la ciudad
    GEOAPIFY_KEY = os.getenv("WEATHER_API_KEY2")
    url = f"https://api.geoapify.com/v1/geocode/search?text={texto}&lang=es&limit=1&apiKey={GEOAPIFY_KEY}"
    
    try:
        respuesta = requests.get(url)
        datos = respuesta.json()
        if "features" in datos and len(datos["features"]) > 0:
            lat = datos["features"][0]["properties"]["lat"]
            lon = datos["features"][0]["properties"]["lon"]
            return f"{lat},{lon}"
    except:
        pass
    
    # Si algo falla, devolvemos el texto original para que WeatherAPI lo intente
    return texto

@app.get("/weather/current/{ciudad}")
def obtener_clima_actual(ciudad: str):
    url = BASE_URL
    ciudad_query = obtener_coordenadas_por_texto(ciudad)
    parametros = {"key": API_KEY, "q": ciudad_query, "lang": "es"}

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
            "estado": limpiar_texto_clima(actual["condition"]["text"]),
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
    ciudad_query = obtener_coordenadas_por_texto(ciudad)
    parametros = {"key": API_KEY, "q": ciudad_query, "days": 3, "lang": "es"}

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
                        "condicion": limpiar_texto_clima(hora["condition"]["text"]),
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
                    "condicion": limpiar_texto_clima(dia["day"]["condition"]["text"]),
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
