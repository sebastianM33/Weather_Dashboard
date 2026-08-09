import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function Buscador({ onBuscar, cargando }) {
  const [ciudad, setCiudad] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (ciudad.trim()) {
      onBuscar(ciudad.trim());
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="w-full md:w-auto flex-1 max-w-md">
      <div className="relative flex items-center bg-fondo-tarjeta border border-borde-sutil rounded-2xl px-4 py-3 shadow-sombra transition-all focus-within:border-acento focus-within:ring-2 focus-within:ring-acento-bg">
        {cargando ? (
          <Loader2 className="w-5 h-5 text-acento animate-spin flex-shrink-0" />
        ) : (
          <Search className="w-5 h-5 text-texto-secundario flex-shrink-0" />
        )}
        <input
          type="text"
          className="flex-grow bg-transparent text-texto-primario px-3 focus:outline-none placeholder-texto-secundario text-sm md:text-base w-full font-medium"
          placeholder="Buscar ciudad..."
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          disabled={cargando}
        />
        {/* Hidden submit button to allow Enter key submission */}
        <button type="submit" className="hidden" disabled={cargando || !ciudad.trim()}></button>
      </div>
    </form>
  );
}
