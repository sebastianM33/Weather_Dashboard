# 🌤️ Weather App

Una aplicación web interactiva y moderna para consultar el clima en diferentes ciudades. Construida con una arquitectura de **Front-End** y **Back-End** separados, y completamente dockerizada.

Este proyecto sirve para establecer una base arquitectónica sólida, experimentar con la conexión entre **React** y **FastAPI**, y aplicar las mejores prácticas de desarrollo y despliegue.

## 📁 Estructura del Proyecto

El repositorio está dividido en dos microservicios principales:

### 1. `Front-End` (React + Vite)
Es la interfaz visual con la que interactúa el usuario. 
- **Tecnologías**: React, Vite, TailwindCSS y Lucide React.
- **Funcionalidad**: Permite buscar el clima de una ciudad y muestra los datos (temperatura, humedad, viento, sensación térmica, índice UV) de forma muy visual y atractiva.

### 2. `Back-End` (Python + FastAPI)
Es el servidor que procesa las solicitudes del usuario y gestiona la lógica de negocio.
- **Tecnologías**: Python 3.11, FastAPI, Uvicorn y `requests`.
- **Funcionalidad**: Funciona como un puente seguro. El Front-End le pide los datos al Back-End, y este último consulta la [API de WeatherAPI](https://www.weatherapi.com/). Esto oculta y protege la API Key, evitando que quede expuesta en el navegador.

---

## 🚀 Cómo ejecutar el proyecto

Para correr este proyecto, primero necesitas una clave gratuita de WeatherAPI.

1. Clona este repositorio: `git clone https://github.com/sebastianM33/Weather_Dashboard.git`
2. Ve a [WeatherAPI](https://www.weatherapi.com/) y crea una cuenta gratuita para obtener tu API Key.
3. En la carpeta `Back-End`, busca el archivo `.env.example`, renómbralo a `.env` (o crea un archivo nuevo llamado `.env` basándote en la plantilla) y pega tu clave:
   ```plaintext
   WEATHER_API_KEY=tu_clave_secreta_aqui
   ```

A partir de aquí, tienes **dos formas** de levantar el proyecto:

### 🐳 Opción 1: Usando Docker (Recomendado)

Si tienes **Docker Desktop** instalado, esta es la forma más rápida y limpia, ya que no necesitas instalar Node ni Python localmente:

1. Asegúrate de que Docker Desktop esté encendido.
2. Abre una terminal en la raíz del proyecto (donde está el archivo `docker-compose.yml`).
3. Ejecuta el siguiente comando:
   ```bash
   docker compose up -d --build
   ```
4. ¡Listo! La aplicación estará disponible en:
   - **Front-End**: [http://localhost:5173](http://localhost:5173)
   - **Back-End (API Docs)**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 💻 Opción 2: Entorno Local (Manual)

Si prefieres levantar los servidores de forma manual para desarrollo continuo:

#### Configurar el Back-End
1. Abre una terminal y entra a la carpeta: `cd Back-End`
2. Crea el entorno virtual e instala las dependencias:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate      # En Windows
   pip install -r requirements.txt
   ```
3. Ejecuta el servidor:
   ```bash
   uvicorn main:app --reload
   ```

#### Configurar el Front-End
1. Abre una **nueva** terminal y entra a la carpeta: `cd Front-End`
2. Instala las dependencias (usando `pnpm`, `npm` o `yarn`):
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

---

## 📝 Notas de desarrollo
*El proyecto se encuentra en constante evolución. Se planea agregar características como pronósticos extendidos, gráficos históricos de clima y geolocalización automática.*
