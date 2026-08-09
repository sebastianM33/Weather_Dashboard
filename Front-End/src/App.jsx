import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Cloud, AlertCircle, Loader2, MapPin, RefreshCw } from "lucide-react";
import Buscador from "./components/Buscador";
import ClimaActual from "./components/ClimaActual";
import PronosticoHoras from "./components/PronosticoHoras";
import PronosticoDiario from "./components/PronosticoDiario";
import MapaClima from './components/MapaClima'
import MapaSelector from './components/MapaSelector';



export default function App() {
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarModalMapa, setMostrarModalMapa] = useState(false);


  //Esta funcion obtiene la ubicacion del usuario y muestra el clima en tiempo real
  useEffect(() => { 
    if ("geolocation" in navigator) {   //Se comprueba si el navegador tiene geolocalizacion
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude; 
        consultarClima(`${lat},${lon}`);
      },
      (error) => {
      console.error("Error al obtener la ubicación:", error);
      }
    );
  } 
  }, []); //El corchete de cierre es para que se ejecute solo una vez al cargar la página
  
  const manejarClicEnMapa = async (lat, lon) => {
    try {
      // Esto es más preciso y nos ahorra una petición a Geoapify
      consultarClima(`${lat},${lon}`);
    } catch (error) {
      console.error("Error al procesar el clic en el mapa:", error);
    }
  };
  
  const consultarClima = async (ciudadBuscar) => { 
    setLoading(true);
    setError(null);
    try {
      const BaseURL = import.meta.env.VITE_API_URL; //Se creo una constante para almacenar la URL base
      const [resActual, resPronostico] = await Promise.all([
        axios.get(`${BaseURL}/weather/current/${ciudadBuscar}`),
        axios.get(`${BaseURL}/weather/forecast/${ciudadBuscar}`),
      ]);

      setClimaActual(resActual.data);
      setPronostico(resPronostico.data);
    } catch (err) {
      console.error("Error al consultar el clima:", err);
      setClimaActual(null);
      setPronostico(null);

      if (err.response && err.response.status === 404) {
        setError(
          `No pudimos encontrar la ciudad "${ciudadBuscar}". Por favor, revisa la ortografía.`,
        );
      } else {
        setError(
          "Ocurrió un error al conectar con el servidor backend. Asegúrate de que el Backend esté encendido en el puerto 8000.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-fondo-cuerpo text-texto-primario flex flex-col items-center p-4 md:p-8 overflow-hidden font-sans">
      {/* Luces decorativas sutiles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-acento/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-acento/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Cabecera / Logo */}
      <header className="z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between mb-10 mt-4 gap-6">
        
        {/* Izquierda: Logo y Títulos */}
        <div className="flex items-center gap-4">
          <div className="bg-fondo-tarjeta p-3 rounded-2xl shadow-sombra border border-borde-sutil">
            <Cloud className="w-8 h-8 text-acento" strokeWidth={2} />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-texto-primario tracking-tight">
              Weather Dashboard
            </h1>
            <p className="text-texto-secundario text-sm font-medium">
              Pronóstico del tiempo en tiempo real
            </p>
          </div>
        </div>

        {/* Derecha: Buscador y Botones Secundarios */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Buscador onBuscar={consultarClima} cargando={loading} />
          
          <button 
              onClick={() => setMostrarModalMapa(true)}
            className="bg-acento text-acento-texto p-3.5 rounded-2xl hover:bg-acento-hover transition-all flex-shrink-0 shadow-sombra active:scale-95"
          >
            <MapPin className="w-5 h-5" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={() => window.location.reload()} 
            className="bg-fondo-tarjeta border border-borde-sutil text-texto-secundario p-3.5 rounded-2xl hover:bg-fondo-cuerpo hover:text-texto-primario transition-all flex-shrink-0 shadow-sombra active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Cuerpo principal */}
      <main className="z-10 w-full max-w-5xl flex flex-col gap-2">

        {/* Alerta de Error */}
        {error && (
          <div className="w-full bg-peligro/10 border border-peligro/20 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 shadow-sombra max-w-4xl mx-auto mb-6 transition-all duration-300 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-peligro flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-peligro font-bold text-sm">
                Error de Consulta
              </h4>
              <p className="text-peligro/80 text-xs mt-1 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Estado Inicial (Vacío) */}
        {!climaActual && !loading && !error && (
          <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-700">
            <div className="bg-fondo-tarjeta p-6 rounded-full border border-borde-sutil mb-6 shadow-sombra">
              <MapPin className="w-12 h-12 text-acento/50" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-texto-primario mb-2">Descubre el Clima Global</h3>
            <p className="text-texto-secundario max-w-md mx-auto text-sm md:text-base">
              Ingresa el nombre de una ciudad o país en el buscador de arriba para obtener información detallada del clima actual y un pronóstico extendido.
            </p>
          </div>
        )}

        {/* Estado de carga (Spinner) */}
        {loading && !climaActual && (
          <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-acento animate-spin" />
            <p className="text-texto-secundario text-sm font-medium animate-pulse">
              Obteniendo información meteorológica...
            </p>
          </div>
        )}

        {/* Datos Meteorológicos */}
        {climaActual && !loading && (
          <div className="animate-in fade-in duration-500">
            <ClimaActual clima={climaActual} />
            <div className="mt-6 mb-6">
              <MapaClima 
                lat={climaActual.latitud} 
                lon={climaActual.longitud} 
                nombreCiudad={climaActual.ciudad} 
                onSeleccionarUbicacion={manejarClicEnMapa}
              />
            </div>
            {pronostico && (
              <div className="flex flex-col gap-6">
                {pronostico.horas && pronostico.horas.length > 0 && (
                  <PronosticoHoras horas={pronostico.horas} />
                )}
                {pronostico.diario && pronostico.diario.length > 0 && (
                  <PronosticoDiario diario={pronostico.diario} />
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="z-10 mt-auto pt-10 text-center text-texto-secundario text-[10px] tracking-widest font-semibold uppercase">
        © 2026 Weather Dashboard · Conectado con FastAPI & WeatherAPI
      </footer>

      {/* MODAL DEL MAPA (Se muestra si el estado es true) */}
      {mostrarModalMapa && (
        <MapaSelector 
          onCerrar={() => setMostrarModalMapa(false)}
          onSeleccionarUbicacion={(lat, lng) => {
            setMostrarModalMapa(false);
            manejarClicEnMapa(lat, lng);
          }}
        />
      )}
    </div>
  );
}
