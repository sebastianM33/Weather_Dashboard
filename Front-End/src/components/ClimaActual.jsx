import { MapPin, Droplets, Wind, Sun, Thermometer } from "lucide-react";
import IconoClima from "./IconoClima";

export default function ClimaActual({ clima }) {
  if (!clima) return null;

  const {
    ciudad,
    pais,
    temperatura_celsius,
    estado,
    icono,
    porcentaje_humedad,
    viento_kph,
    uv,
    sensacion_termica,
    codigo,
    es_dia
  } = clima;

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden bg-[#151b23] border border-slate-800/60 shadow-2xl p-8 md:p-10 mb-8 transition-all">
      {/* Resplandor de fondo turquesa en la derecha */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:justify-between">
        
        {/* Lado Izquierdo: Info Principal */}
        <div className="flex flex-col">
          {/* Ubicación */}
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="text-[#00e5ff] w-5 h-5" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              {ciudad}
            </h2>
            {pais && (
              <span className="text-slate-400 text-sm md:text-base ml-1">
                {pais}
              </span>
            )}
          </div>

          {/* Temperatura Gigante */}
          <div className="flex items-start mb-6">
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
              {Math.round(temperatura_celsius)}
            </h1>
            <span className="text-3xl md:text-5xl font-medium text-[#00e5ff] mt-2 md:mt-4 ml-1">
              °C
            </span>
          </div>

          {/* Estado y Sensación */}
          <div className="flex flex-col gap-1">
            <p className="text-slate-300 text-lg md:text-xl font-medium capitalize tracking-wide">
              {estado}
            </p>
            <p className="text-slate-400 text-sm md:text-base">
              Sensación térmica: <span className="text-white font-semibold">{Math.round(sensacion_termica)}°C</span>
            </p>
          </div>
        </div>

        {/* Lado Derecho: Icono del Clima Dinámico */}
        <div className="hidden md:flex items-center justify-center pr-10 relative">
          <div className="absolute w-32 h-32 bg-[#00e5ff]/20 blur-3xl rounded-full pointer-events-none"></div>
          <IconoClima codigo={codigo} es_dia={es_dia} className="w-48 h-48 relative z-10 drop-shadow-[0_0_30px_rgba(0,229,255,0.1)]" />
        </div>
      </div>

      {/* Fila Inferior: 4 Métricas Originales */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        
        {/* Humedad */}
        <div className="bg-[#1c242f] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="text-[#00e5ff] w-4 h-4" />
            <span className="text-slate-400 text-xs md:text-sm font-medium">Humedad</span>
          </div>
          <p className="text-white text-xl md:text-2xl font-bold">{porcentaje_humedad}%</p>
        </div>

        {/* Viento */}
        <div className="bg-[#1c242f] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="text-[#00e5ff] w-4 h-4" />
            <span className="text-slate-400 text-xs md:text-sm font-medium">Viento</span>
          </div>
          <p className="text-white text-xl md:text-2xl font-bold">{viento_kph} km/h</p>
        </div>

        {/* Índice UV */}
        <div className="bg-[#1c242f] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="text-[#00e5ff] w-4 h-4" />
            <span className="text-slate-400 text-xs md:text-sm font-medium">Índice UV</span>
          </div>
          <p className="text-white text-xl md:text-2xl font-bold">{uv}</p>
        </div>

        {/* Sensación Térmica (Reiterada como Métrica) */}
        <div className="bg-[#1c242f] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="text-[#00e5ff] w-4 h-4" />
            <span className="text-slate-400 text-xs md:text-sm font-medium">Sensación</span>
          </div>
          <p className="text-white text-xl md:text-2xl font-bold">{Math.round(sensacion_termica)}°C</p>
        </div>

      </div>
    </div>
  );
}
