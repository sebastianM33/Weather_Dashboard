import { useState } from 'react'
import axios from 'axios'

function App() {
  const [ciudad, setCiudad] = useState('')
  const [datos, setDatos] = useState(null)

  const consultarClima = async () => {
    try {
      // Usamos axios para llamar a tu FastAPI
      const res = await axios.get(`http://127.0.0.1:8000/weather/${ciudad}`)
      setDatos(res.data)
    } catch (err) {
      alert("Error al conectar con el servidor. ¿Está encendido el Backend?")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Clima App</h1>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          className="p-2 rounded bg-slate-800 text-white border border-slate-700"
          placeholder="Escribe una ciudad..."
          onChange={(e) => setCiudad(e.target.value)}
        />
        <button 
          onClick={consultarClima}
          className="bg-blue-600 px-4 py-2 rounded text-white font-bold"
        >
          Consultar
        </button>
      </div>

      {datos && (
        <div className="mt-10 p-6 bg-slate-900 rounded-xl border border-blue-500/30 text-center">
          <h2 className="text-2xl text-white">{datos.city}</h2>
          <p className="text-5xl font-black text-blue-400 my-4">{datos.temp}°C</p>
          <p className="text-slate-400 capitalize">{datos.condition}</p>
          <p className="text-slate-400 capitalize">{datos.country}</p>
          <p>{datos.is_day}</p>
          <p>VIENTO: {datos.wind_kph} km/h</p>
          <img src={datos.icon} alt="clima" className="mx-auto w-20" />
        </div>
      )}
    </div>
  )
}

export default App