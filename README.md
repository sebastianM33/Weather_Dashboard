# 🌤️ Weather App

Una aplicación web interactiva para consultar el clima en diferentes ciudades, construida con una arquitectura de Front-End y Back-End separados.

Este proyecto se encuentra en sus etapas iniciales y sirve principalmente para establecer una base arquitectónica, experimentar con la conexión entre React y FastAPI, y llevar un control de versiones de los avances.

## 📁 Estructura del Proyecto

El repositorio está dividido en dos carpetas principales:

### 1. `Front-End` (React + Vite)
Es la interfaz visual con la que interactúa el usuario. 
- **Tecnologías**: React, Vite, TailwindCSS (para los estilos) y Axios para las peticiones.
- Permite al usuario buscar el clima de una ciudad y lo muestra en pantalla de forma atractiva.

### 2. `Back-End` (Python + FastAPI)
Es el servidor que procesa las solicitudes del usuario.
- **Tecnologías**: Python 3, FastAPI, y `requests`.
- Funciona como un "puente" de seguridad: el Front-End le pide los datos al Back-End, y el Back-End es quien realmente consulta la [API de WeatherAPI](https://www.weatherapi.com/). Esto evita que la clave secreta (API Key) quede expuesta en el navegador de los usuarios.

---

## 🚀 Cómo ejecutar el proyecto localmente

Si deseas descargar y probar el proyecto en tu computadora, sigue estos pasos:

## ⚙️ Configuración del Entorno Local

Para correr este proyecto localmente, necesitas una clave gratuita de WeatherAPI.

1. Clona este repositorio: `git clone https://github.com/sebastianM33/Weather_Dashboard.git`
2. Ve a [WeatherAPI](https://www.weatherapi.com/) y crea una cuenta gratuita para obtener tu API Key.
3. En la carpeta `Back-End`, busca el archivo llamado `.env.example` y renómbralo a `.env` (o crea un archivo nuevo llamado `.env` basándote en la plantilla).
4. Abre el archivo `.env` y reemplaza el valor con tu clave real:
   ```plaintext
   WEATHER_API_KEY=123456789abcdef...
   ``` 

### Configurar el Back-End
1. Abre una terminal y navega a la carpeta del Back-End:
   ```bash
   cd Back-End
   ```
2. Crea el entorno virtual e instala las dependencias (En Windows):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Ejecuta el servidor de desarrollo de FastAPI:
   ```bash
   uvicorn main:app --reload
   ```

### Configurar el Front-End
1. Abre una nueva terminal y navega a la carpeta del Front-End:
   ```bash
   cd Front-End
   ```
2. Instala las dependencias (si es la primera vez):
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

---

## 📝 Notas de desarrollo
*Esta versión del README es inicial y será actualizada a medida que el proyecto evolucione y se agreguen nuevas características (como pronósticos de varios días, geolocalización o mejoras en el diseño).*
