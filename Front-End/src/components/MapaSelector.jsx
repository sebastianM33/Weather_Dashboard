import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Componente invisible que escucha los clics en el mapa
function ClickEnMapa({ alSeleccionar }) {
  const [posicion, setPosicion] = useState(null);
  
  useMapEvents({
    click(e) {
      setPosicion(e.latlng); // Pone el marcador donde hiciste clic
      alSeleccionar(e.latlng.lat, e.latlng.lng); // Envía las coordenadas arriba
    },
  });

  return posicion ? <Marker position={posicion} /> : null;
}

export default function MapaSelector({ onCerrar, onSeleccionarUbicacion }) {
  // Centro por defecto: Colombia
  const centroInicial = [4.5709, -74.2973];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-texto-primario/40 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-fondo-tarjeta rounded-3xl w-full max-w-3xl overflow-hidden border border-borde-sutil shadow-sombra-hover relative">
        
        {/* Cabecera del Modal */}
        <div className="p-4 bg-fondo-columna flex justify-between items-center border-b border-borde-sutil">
          <h3 className="text-texto-primario font-bold">Haz clic en cualquier lugar del mapa</h3>
          <button 
            onClick={onCerrar}
            className="text-texto-secundario hover:text-acento-texto bg-borde-sutil hover:bg-peligro rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Contenedor del Mapa */}
        <div className="h-[400px] w-full cursor-crosshair">
          <MapContainer center={centroInicial} zoom={5} className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <ClickEnMapa alSeleccionar={onSeleccionarUbicacion} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}