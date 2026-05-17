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
      <div className="bg-[#1c242f] border border-white/5 p-3 rounded-xl shadow-2xl text-left">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Hora: {payload[0].payload.hora}</p>
        <p className="text-white text-lg font-extrabold mt-1">{payload[0].value}°C</p>
        <p className="text-[#00e5ff] text-xs mt-0.5 capitalize font-medium">{payload[0].payload.condicion}</p>
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
    <div className="w-full max-w-5xl mx-auto bg-[#151b23] border border-slate-800/60 rounded-[2rem] p-8 md:p-10 shadow-2xl transition-all duration-500 mb-8">
      
      {/* Título de Sección */}
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/5">
        <div className="bg-[#00e5ff]/10 text-[#00e5ff] p-2.5 rounded-xl border border-[#00e5ff]/20">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide text-left">Pronóstico por Horas</h3>
          <p className="text-slate-400 text-xs md:text-sm text-left mt-0.5">Variación de la temperatura durante el día de hoy</p>
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
                <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00e5ff" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} vertical={false} />
            <XAxis 
              dataKey="hora" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}°C`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="temperatura" 
              stroke="#00e5ff" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Fila Scrollable de Horas */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-[#151b23] scrollbar-thumb-slate-700 max-w-full">
        {horas.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 bg-[#1c242f] border border-white/5 hover:border-[#00e5ff]/30 hover:bg-[#1f2833] p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center text-center w-28 md:w-32 shadow-md transition-all duration-300 group"
          >
            <span className="text-slate-400 text-sm font-bold">{item.hora}</span>
            <div className="my-2 group-hover:scale-110 transition-transform duration-300">
              <IconoClima codigo={item.codigo} es_dia={item.es_dia} className="w-14 h-14" />
            </div>
            <span className="text-white text-lg font-bold">{Math.round(item.temperatura)}°C</span>
            <span 
              className="text-xs text-[#00e5ff] truncate w-full capitalize mt-1 font-medium" 
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
