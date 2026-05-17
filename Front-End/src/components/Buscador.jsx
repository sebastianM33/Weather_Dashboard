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
      <div className="relative flex items-center bg-[#151b23] border border-white/5 rounded-2xl px-4 py-3 shadow-inner transition-all focus-within:border-teal-500/50">
        {cargando ? (
          <Loader2 className="w-5 h-5 text-[#00e5ff] animate-spin flex-shrink-0" />
        ) : (
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
        <input
          type="text"
          className="flex-grow bg-transparent text-white px-3 focus:outline-none placeholder-slate-500 text-sm md:text-base w-full"
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
