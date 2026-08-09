import requests
import os
from dotenv import load_dotenv

load_dotenv("c:\\Users\\sebas\\OneDrive\\Escritorio\\projects\\Weather_Dashboard\\Back-End\\.env")
GEOAPIFY_KEY = os.getenv("WEATHER_API_KEY2")

ciudad = "pereira"
url = f"https://api.geoapify.com/v1/geocode/search?text={ciudad}&lang=es&apiKey={GEOAPIFY_KEY}"
res = requests.get(url).json()

if "features" in res and len(res["features"]) > 0:
    lat = res["features"][0]["properties"]["lat"]
    lon = res["features"][0]["properties"]["lon"]
    print(f"Coordinates for {ciudad}: {lat},{lon}")
    
    # Let's see what WeatherAPI says for these exact coordinates
    API_KEY = os.getenv("WEATHER_API_KEY")
    w_url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={lat},{lon}&lang=es"
    w_res = requests.get(w_url).json()
    print(f"WeatherAPI temp for coords: {w_res['current']['temp_c']} C")
else:
    print("Not found")
