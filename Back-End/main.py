# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware #NECESARIO PARA LA COMUNICACION ENTRE EL FRONT Y EL BACK
import requests #ES PARA PODER HACER PETICIONES A LA API

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite peticiones desde cualquier origen (ej. tu frontend en localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)


API_KEY = "9560fdc7f392463aadf192812261305"
BASE_URL = "http://api.weatherapi.com/v1" 


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/weather/{city}")
def get_weather(city: str):
    url = f"{BASE_URL}/current.json?key={API_KEY}&q={city}&aqi=no"
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found") #lo que hace es lanzar un error cuando la peticion no es exitosa
    data = response.json()

    # Son los datos que se van a enviar al front-End
    return {
        "country": data["location"]["country"],
        "city": data["location"]["name"],
        "temp": data["current"]["temp_c"],
        "condition": data["current"]["condition"]["text"],
        "icon": f"https:{data['current']['condition']['icon']}", # Agregamos https: para que sea una URL válida
        "is_day": bool(data["current"]["is_day"]),
        "humidity": data["current"]["humidity"],
        "wind_kph": data["current"]["wind_kph"]          
    }   