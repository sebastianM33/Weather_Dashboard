import { useState } from "react";
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

  const consultarClima = async (ciudadBuscar) => {
    setLoading(true);
    setError(null);
    try {
      const [resActual, resPronostico] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/weather/current/${ciudadBuscar}`),
        axios.get(`http://127.0.0.1:8000/weather/forecast/${ciudadBuscar}`),
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8 overflow-hidden font-sans">
      {/* Luces decorativas de fondo (Glow effect premium) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cabecera / Logo */}
      <header className="z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between mb-10 mt-4 gap-6">
        
        {/* Izquierda: Logo y Títulos */}
        <div className="flex items-center gap-4">
          <div className="bg-[#0b1419] p-3 rounded-2xl shadow-lg border border-white/5">
            <Cloud className="w-8 h-8 text-[#00e5ff]" strokeWidth={2} />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Weather Dashboard
            </h1>
            <p className="text-slate-400 text-sm">
              Pronóstico del tiempo en tiempo real
            </p>
          </div>
        </div>

        {/* Derecha: Buscador y Botones Secundarios */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Buscador onBuscar={consultarClima} cargando={loading} />
          
          <button 
              onClick={() => setMostrarModalMapa(true)}
            className="bg-[#00e5ff] text-slate-900 p-3.5 rounded-2xl hover:bg-[#33ebff] transition-all flex-shrink-0 shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <MapPin className="w-5 h-5" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#151b23] border border-white/5 text-slate-400 p-3.5 rounded-2xl hover:bg-[#1f2833] transition-all flex-shrink-0 shadow-lg active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Cuerpo principal */}
      <main className="z-10 w-full max-w-5xl flex flex-col gap-2">

        {/* Alerta de Error */}
        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 shadow-xl max-w-4xl mx-auto mb-6 transition-all duration-300 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-bold text-sm">
                Error de Consulta
              </h4>
              <p className="text-red-200/80 text-xs mt-1 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Estado Inicial (Vacío) */}
        {!climaActual && !loading && !error && (
          <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-700">
            <div className="bg-slate-900/40 p-6 rounded-full border border-slate-800/50 mb-6 shadow-2xl">
              <MapPin className="w-12 h-12 text-slate-500/50" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-300 mb-2">Descubre el Clima Global</h3>
            <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base">
              Ingresa el nombre de una ciudad o país en el buscador de arriba para obtener información detallada del clima actual y un pronóstico extendido.
            </p>
          </div>
        )}

        {/* Estado de carga (Spinner) */}
        {loading && !climaActual && (
          <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm font-medium animate-pulse">
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
                onSeleccionarUbicacion={(lat, lng) => consultarClima(`${lat},${lng}`)}
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

      {/* Footer */}
      <footer className="z-10 mt-auto pt-10 text-center text-slate-500 text-[10px] tracking-widest font-semibold uppercase">
        © 2026 Weather Dashboard · Conectado con FastAPI & WeatherAPI
      </footer>

      {/* MODAL DEL MAPA (Se muestra si el estado es true) */}
      {mostrarModalMapa && (
        <MapaSelector 
          onCerrar={() => setMostrarModalMapa(false)}
          onSeleccionarUbicacion={(lat, lng) => {
            setMostrarModalMapa(false);
            const coordenadas = `${lat},${lng}`;
            consultarClima(coordenadas);
          }}
        />
      )}
    </div>
  );
}
