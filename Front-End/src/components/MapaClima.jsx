import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Mueve la cámara del mapa automáticamente al buscar una nueva ciudad
function ActualizarCentroMapa({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

// Escucha los clics directos sobre el mapa de la pantalla principal
function DetectorClicsIncrustado({ alHacerClic }) {
  useMapEvents({
    click(e) {
      alHacerClic(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapaClima({ lat, lon, nombreCiudad, onSeleccionarUbicacion }) {
  if (!lat || !lon) return null

  const posicion = [lat, lon]

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-4 backdrop-blur-xl h-[300px] w-full relative z-0 overflow-hidden cursor-crosshair">
      <MapContainer 
        center={posicion} 
        zoom={12} 
        scrollWheelZoom={true} // Lo dejamos en true para que puedan explorar navegando
        className="h-full w-full rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={posicion}>
          <Popup>
            <span className="font-bold text-slate-900">{nombreCiudad}</span>
          </Popup>
        </Marker>

        <ActualizarCentroMapa center={posicion} />
        
        {/* Activamos la escucha de clics en este mapa */}
        <DetectorClicsIncrustado alHacerClic={onSeleccionarUbicacion} />
      </MapContainer>
    </div>
  )
}