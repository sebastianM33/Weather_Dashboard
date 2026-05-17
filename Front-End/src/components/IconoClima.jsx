import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle } from "lucide-react";

export default function IconoClima({ codigo, es_dia, className = "w-24 h-24" }) {
  // Mapeo básico de los códigos de WeatherAPI a grupos visuales
  const obtenerTipoClima = (code) => {
    if (code === 1000) return "despejado";
    if (code === 1003) return "parcialmente_nublado";
    if ([1006, 1009].includes(code)) return "nublado";
    if ([1030, 1135, 1148].includes(code)) return "niebla";
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1198, 1240].includes(code)) return "llovizna";
    if ([1192, 1195, 1201, 1243, 1246].includes(code)) return "lluvia_fuerte";
    if ([1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) return "nieve";
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "tormenta";
    return "desconocido";
  };

  const tipo = obtenerTipoClima(codigo);
  const isDay = es_dia === 1;

  // Renderizador de iconos multicapa con Tailwind CSS Absolute Positioning
  const renderIcono = () => {
    switch (tipo) {
      case "despejado":
        return isDay ? (
          <>
            <Sun className="absolute inset-0 w-full h-full text-amber-400 animate-[spin_12s_linear_infinite] drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]" strokeWidth={1} />
            <Sun className="absolute inset-0 w-full h-full text-orange-400 fill-orange-500/30 scale-75" strokeWidth={1.5} />
          </>
        ) : (
          <>
            <Moon className="absolute inset-0 w-full h-full text-blue-300 animate-[pulse_4s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(147,197,253,0.3)]" strokeWidth={1} />
            <Moon className="absolute inset-0 w-full h-full text-indigo-400 fill-indigo-500/20 scale-90" strokeWidth={1.5} />
          </>
        );

      case "parcialmente_nublado":
        return isDay ? (
          <>
            <Sun className="absolute top-0 right-0 w-[70%] h-[70%] text-amber-400 animate-[spin_10s_linear_infinite]" strokeWidth={1.5} />
            <Cloud className="absolute bottom-0 left-0 w-[90%] h-[90%] text-slate-300 fill-slate-100/20 drop-shadow-xl" strokeWidth={1.5} />
          </>
        ) : (
          <>
            <Moon className="absolute top-0 right-0 w-[60%] h-[60%] text-blue-300 animate-pulse" strokeWidth={1.5} />
            <Cloud className="absolute bottom-0 left-0 w-[90%] h-[90%] text-slate-400 fill-slate-500/30 drop-shadow-xl" strokeWidth={1.5} />
          </>
        );

      case "nublado":
        return (
          <>
            <Cloud className="absolute top-0 right-0 w-[80%] h-[80%] text-slate-500 fill-slate-600/30 translate-x-2 -translate-y-2 opacity-60 animate-pulse" strokeWidth={1.5} />
            <Cloud className="absolute bottom-0 left-0 w-full h-full text-slate-300 fill-slate-400/40 drop-shadow-2xl" strokeWidth={1.5} />
          </>
        );

      case "llovizna":
        return (
          <>
            <Cloud className="absolute top-0 left-0 w-full h-full text-slate-400 fill-slate-500/30" strokeWidth={1.5} />
            <CloudDrizzle className="absolute bottom-[-10%] left-0 w-full h-full text-cyan-400 fill-cyan-500/20 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
          </>
        );

      case "lluvia_fuerte":
        return (
          <>
            <Cloud className="absolute top-0 left-0 w-full h-full text-slate-600 fill-slate-700/50" strokeWidth={1.5} />
            <CloudRain className="absolute bottom-[-10%] left-0 w-full h-full text-blue-500 fill-blue-600/30 animate-bounce drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" strokeWidth={1.5} />
          </>
        );

      case "tormenta":
        return (
          <>
            <Cloud className="absolute top-0 left-0 w-full h-full text-slate-700 fill-slate-800/80" strokeWidth={1.5} />
            <CloudLightning className="absolute bottom-[-10%] left-0 w-full h-full text-yellow-400 fill-yellow-500/30 animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_25px_rgba(250,204,21,0.8)]" strokeWidth={1.5} />
          </>
        );

      case "nieve":
        return (
          <>
            <Cloud className="absolute top-0 left-0 w-full h-full text-slate-300 fill-slate-200/20" strokeWidth={1.5} />
            <CloudSnow className="absolute bottom-[-10%] left-0 w-full h-full text-white fill-white/40 animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]" strokeWidth={1.5} />
          </>
        );

      case "niebla":
        return (
          <>
            <Cloud className="absolute top-0 left-0 w-full h-full text-slate-400 fill-slate-500/20 opacity-50" strokeWidth={1.5} />
            <CloudFog className="absolute bottom-0 left-0 w-full h-full text-slate-300 fill-slate-400/40 animate-[pulse_4s_ease-in-out_infinite]" strokeWidth={1.5} />
          </>
        );

      default:
        // Fallback dinámico si el código no se mapea perfectamente
        return isDay ? (
          <>
            <Sun className="absolute inset-0 w-full h-full text-amber-400" strokeWidth={1.5} />
          </>
        ) : (
          <>
            <Moon className="absolute inset-0 w-full h-full text-blue-300" strokeWidth={1.5} />
          </>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {renderIcono()}
    </div>
  );
}
