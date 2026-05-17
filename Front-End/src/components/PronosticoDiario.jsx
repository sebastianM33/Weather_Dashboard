import { Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import IconoClima from './IconoClima'

const formatearFecha = (fechaStr) => {
  try {
    const fecha = new Date(fechaStr + 'T00:00:00')
    const opciones = { weekday: 'long', day: 'numeric', month: 'short' }
    const formateada = fecha.toLocaleDateString('es-ES', opciones)
    // Capitaliza la primera letra (ej: Lunes, 18 may.)
    return formateada.charAt(0).toUpperCase() + formateada.slice(1)
  } catch (e) {
    return fechaStr
  }
}

export default function PronosticoDiario({ diario }) {
  if (!diario || diario.length === 0) return null

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#151b23] border border-slate-800/60 rounded-[2rem] p-8 md:p-10 shadow-2xl transition-all duration-500 mb-8">
      
      {/* Título de Sección */}
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/5">
        <div className="bg-[#00e5ff]/10 text-[#00e5ff] p-2.5 rounded-xl border border-[#00e5ff]/20">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide text-left">Pronóstico de 3 Días</h3>
          <p className="text-slate-400 text-xs md:text-sm text-left mt-0.5">Predicción diaria para los próximos días</p>
        </div>
      </div>

      {/* Lista de Pronósticos Diarios */}
      <div className="flex flex-col gap-4">
        {diario.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#1c242f] border border-white/5 hover:border-[#00e5ff]/30 hover:bg-[#1f2833] px-5 md:px-6 py-5 rounded-2xl gap-4 transition-all duration-300 group shadow-md"
          >
            {/* Fecha / Día */}
            <div className="text-left flex-1 min-w-[150px]">
              <span className="text-white text-base md:text-lg font-bold tracking-tight block">
                {formatearFecha(item.fecha)}
              </span>
              <span className="text-[#00e5ff] text-xs md:text-sm font-semibold tracking-wide uppercase mt-0.5 block">
                {index === 0 ? 'Hoy' : `Día ${index + 1}`}
              </span>
            </div>

            {/* Icono y Condición */}
            <div className="flex items-center gap-4 flex-1 min-w-[200px]">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <IconoClima codigo={item.codigo} es_dia={item.es_dia} className="w-14 h-14" />
              </div>
              <span className="text-slate-300 text-sm md:text-base font-medium capitalize text-left">
                {item.condicion}
              </span>
            </div>

            {/* Rango de Temperatura Estilizado */}
            <div className="flex items-center gap-4 justify-between sm:justify-end flex-shrink-0">
              
              {/* Temp Min */}
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm md:text-base">
                <TrendingDown className="w-4 h-4 opacity-75" />
                <span>{Math.round(item.temp_min)}°</span>
              </div>

              {/* Barra de progreso de Rango */}
              <div className="w-20 md:w-24 h-2 bg-slate-800/80 rounded-full overflow-hidden relative">
                <div className="absolute left-[20%] right-[20%] top-0 bottom-0 bg-gradient-to-r from-[#00e5ff] via-teal-400 to-emerald-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Temp Max */}
              <div className="flex items-center gap-1.5 text-white font-bold text-sm md:text-base">
                <TrendingUp className="w-4 h-4 text-[#00e5ff] opacity-75" />
                <span>{Math.round(item.temp_max)}°</span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
