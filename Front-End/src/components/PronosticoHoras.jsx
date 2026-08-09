import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts'
import { Clock } from 'lucide-react'
import IconoClima from './IconoClima'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-fondo-cuerpo border border-borde-sutil p-3 rounded-xl shadow-sombra text-left">
        <p className="text-texto-secundario text-[10px] font-bold uppercase tracking-wider">Hora: {payload[0].payload.hora}</p>
        <p className="text-texto-primario text-lg font-extrabold mt-1">{payload[0].value}°C</p>
        <p className="text-acento text-xs mt-0.5 capitalize font-medium">{payload[0].payload.condicion}</p>
      </div>
    )
  }
  return null
}

export default function PronosticoHoras({ horas }) {
  if (!horas || horas.length === 0) return null

  // Mapeamos los datos para Recharts
  const chartData = horas.map(h => ({
    hora: h.hora,
    temperatura: Math.round(h.temperatura),
    condicion: h.condicion,
    icono: h.icono,
    codigo: h.codigo,
    es_dia: h.es_dia
  }))

  return (
    <div className="w-full max-w-5xl mx-auto bg-fondo-tarjeta border border-borde-sutil rounded-[2rem] p-8 md:p-10 shadow-sombra transition-all duration-500 mb-8 hover:shadow-sombra-hover">
      
      {/* Título de Sección */}
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-borde-sutil">
        <div className="bg-acento-bg text-acento p-2.5 rounded-xl border border-acento/20">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-texto-primario tracking-wide text-left">Pronóstico por Horas</h3>
          <p className="text-texto-secundario text-xs md:text-sm text-left mt-0.5">Variación de la temperatura durante el día de hoy</p>
        </div>
      </div>

      {/* Gráfico de Temperatura */}
      <div className="w-full h-64 mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5c8d89" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#5c8d89" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e2db" opacity={0.6} vertical={false} />
            <XAxis 
              dataKey="hora" 
              stroke="#797470" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#797470" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}°C`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="temperatura" 
              stroke="#5c8d89" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Fila Scrollable de Horas */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-borde-sutil max-w-full">
        {horas.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 bg-fondo-cuerpo border border-borde-sutil hover:border-acento hover:bg-fondo-tarjeta p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center text-center w-28 md:w-32 shadow-sombra transition-all duration-300 group"
          >
            <span className="text-texto-secundario text-sm font-bold">{item.hora}</span>
            <div className="my-2 group-hover:scale-110 transition-transform duration-300">
              <IconoClima codigo={item.codigo} es_dia={item.es_dia} className="w-14 h-14" />
            </div>
            <span className="text-texto-primario text-lg font-bold">{Math.round(item.temperatura)}°C</span>
            <span 
              className="text-xs text-acento truncate w-full capitalize mt-1 font-medium" 
              title={item.condicion}
            >
              {item.condicion}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
