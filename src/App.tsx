import React, { useState, useEffect, useMemo } from 'react';
import { 
  Film, 
  Tv, 
  Zap, 
  Check, 
  Search, 
  Clock, 
  Ticket, 
  X, 
  Flame, 
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  Radio,
  Globe
} from 'lucide-react';
import { marvelData, MarvelProduction } from './data/marvelData';

type UniverseType = 'UCM' | 'FOX' | 'SONY' | 'MTV';
type FormatType = 'movie' | 'series' | 'oneshot';
type SortOrderType = 'chrono' | 'release';

export default function App() {
  // Persistencia en localStorage bajo 'marvelTrackerProV4'
  const [watched, setWatched] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('marvelTrackerProV4');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterCritical, setFilterCritical] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOrderType>('chrono');
  
  // Filtros de Multiselección (Arrays [])
  // Si están vacíos, se interpreta como "Mostrar Todos"
  const [activeUniverse, setActiveUniverse] = useState<string[]>([]);
  const [activeFormat, setActiveFormat] = useState<string[]>([]);
  const [activeEarth, setActiveEarth] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MarvelProduction | null>(null);

  // Objetivos Clímax de la Saga
  // Avengers: Doomsday (18 de diciembre de 2026)
  // Avengers: Secret Wars (17 de diciembre de 2027)
  const DOOMSDAY_TARGET = useMemo(() => new Date('2026-12-18T00:00:00').getTime(), []);
  const SECRET_WARS_TARGET = useMemo(() => new Date('2027-12-17T00:00:00').getTime(), []);

  const calculateTimeRemaining = (targetTime: number) => {
    const diff = targetTime - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdownDoomsday, setCountdownDoomsday] = useState(() => calculateTimeRemaining(new Date('2026-12-18T00:00:00').getTime()));
  const [countdownSecretWars, setCountdownSecretWars] = useState(() => calculateTimeRemaining(new Date('2027-12-17T00:00:00').getTime()));

  // Actualizador en vivo en tiempo real con setInterval
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownDoomsday(calculateTimeRemaining(DOOMSDAY_TARGET));
      setCountdownSecretWars(calculateTimeRemaining(SECRET_WARS_TARGET));
    }, 1000);

    return () => clearInterval(timer);
  }, [DOOMSDAY_TARGET, SECRET_WARS_TARGET]);

  useEffect(() => {
    try {
      localStorage.setItem('marvelTrackerProV4', JSON.stringify(watched));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [watched]);

  const toggleWatch = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setWatched(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Toggle helpers para multiselección
  const toggleUniverse = (uni: string) => {
    setActiveUniverse(prev => 
      prev.includes(uni) ? prev.filter(u => u !== uni) : [...prev, uni]
    );
  };

  const toggleFormat = (fmt: string) => {
    setActiveFormat(prev => 
      prev.includes(fmt) ? prev.filter(f => f !== fmt) : [...prev, fmt]
    );
  };

  const toggleEarth = (earth: string) => {
    setActiveEarth(prev => 
      prev.includes(earth) ? prev.filter(e => e !== earth) : [...prev, earth]
    );
  };

  const resetAllFilters = () => {
    setActiveUniverse([]);
    setActiveFormat([]);
    setActiveEarth([]);
    setSearchQuery('');
    setFilterCritical(false);
  };

  // Filtrado y ordenación combinados (AND / OR)
  const activeDataset = useMemo(() => {
    const filtered = marvelData.filter(m => {
      // Si el array está vacío, muestra todos
      const passUni = activeUniverse.length === 0 || activeUniverse.includes(m.uni);
      const passCrit = filterCritical ? m.cr : true;
      const passFormat = activeFormat.length === 0 || activeFormat.includes(m.ty);
      const passEarth = activeEarth.length === 0 || activeEarth.includes(m.earth);
      
      const query = searchQuery.trim().toLowerCase();
      const passSearch = query === '' || 
        m.tEs.toLowerCase().includes(query) ||
        m.tEn.toLowerCase().includes(query) ||
        m.earth.toLowerCase().includes(query);

      return passUni && passCrit && passFormat && passEarth && passSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'chrono') return a.y_in - b.y_in;
      return a.y_out - b.y_out;
    });
  }, [activeUniverse, filterCritical, activeFormat, activeEarth, searchQuery, sortBy]);

  // Métricas matemáticas
  const analytics = useMemo(() => {
    const totalMinutes = activeDataset.reduce((acc, curr) => acc + curr.d, 0);
    const totalHours = totalMinutes / 60;
    
    const watchedInActive = activeDataset.filter(m => watched.includes(m.id));
    const watchedMinutes = watchedInActive.reduce((acc, curr) => acc + curr.d, 0);
    const watchedHours = watchedMinutes / 60;
    
    const remainingHours = Math.max(0, totalHours - watchedHours);
    const remainingDays = remainingHours / 24;
    const progressPct = activeDataset.length === 0 
      ? 0 
      : Math.round((watchedInActive.length / activeDataset.length) * 100);

    return {
      totalCount: activeDataset.length,
      watchedCount: watchedInActive.length,
      totalHours,
      watchedHours,
      remainingHours,
      remainingDays,
      progressPct
    };
  }, [activeDataset, watched]);

  // Navegación en el Modal
  const currentModalIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return activeDataset.findIndex(i => i.id === selectedItem.id);
  }, [selectedItem, activeDataset]);

  const handlePrevItem = () => {
    if (currentModalIndex > 0) {
      setSelectedItem(activeDataset[currentModalIndex - 1]);
    }
  };

  const handleNextItem = () => {
    if (currentModalIndex < activeDataset.length - 1) {
      setSelectedItem(activeDataset[currentModalIndex + 1]);
    }
  };

  // Paleta dinámica: Rojo Marvel (#ED1D24) vs Verde Esmeralda Cyberpunk (#10b981)
  const theme = useMemo(() => {
    if (filterCritical) {
      return {
        isDoomsday: true,
        primaryHex: '#10b981',
        primaryGlow: 'rgba(16, 185, 129, 0.45)',
        textAccent: 'text-emerald-400',
        textAccentHover: 'hover:text-emerald-300',
        bgAccent: 'bg-emerald-500',
        bgAccentHover: 'hover:bg-emerald-400',
        borderAccent: 'border-emerald-500',
        borderGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
        cardHoverClass: 'card-floating-doom',
        timelineClass: 'timeline-doomsday',
        heroHalo: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(6,78,59,0.15) 50%, transparent 75%)',
        badgeClass: 'badge-doomsday'
      };
    }
    return {
      isDoomsday: false,
      primaryHex: '#ED1D24',
      primaryGlow: 'rgba(237, 29, 36, 0.45)',
      textAccent: 'text-[#ff3b44]',
      textAccentHover: 'hover:text-red-400',
      bgAccent: 'bg-[#ED1D24]',
      bgAccentHover: 'hover:bg-red-600',
      borderAccent: 'border-[#ED1D24]',
      borderGlow: 'shadow-[0_0_20px_rgba(237,29,36,0.3)]',
      cardHoverClass: 'card-floating',
      timelineClass: '',
      heroHalo: 'radial-gradient(circle, rgba(237,29,36,0.28) 0%, rgba(138,43,226,0.12) 50%, transparent 75%)',
      badgeClass: 'badge-ucm'
    };
  }, [filterCritical]);

  const getUniverseBadge = (uni: MarvelProduction['uni']) => {
    switch(uni) {
      case 'UCM': return 'badge-ucm';
      case 'FOX': return 'badge-fox';
      case 'SONY': return 'badge-sony';
      case 'MTV': return 'badge-mtv';
      default: return 'badge-ucm';
    }
  };

  const getFormatBadge = (ty: MarvelProduction['ty']) => {
    switch(ty) {
      case 'movie': return 'badge-movie';
      case 'series': return 'badge-series';
      case 'oneshot': return 'badge-oneshot';
    }
  };

  const getUniverseName = (uni: string) => {
    const map: Record<string, string> = {
      UCM: 'Marvel Studios (UCM)',
      FOX: '20th Century Fox',
      SONY: 'Sony Spider-Verse',
      MTV: 'Marvel Television'
    };
    return map[uni] || uni;
  };

  // Listas de filtros fijos
  const studioList: { key: UniverseType; label: string }[] = [
    { key: 'UCM', label: 'UCM' },
    { key: 'FOX', label: 'FOX' },
    { key: 'SONY', label: 'SONY' },
    { key: 'MTV', label: 'MTV' }
  ];

  const formatList: { key: FormatType; label: string; icon: React.ElementType }[] = [
    { key: 'movie', label: 'Películas', icon: Film },
    { key: 'series', label: 'Series', icon: Tv },
    { key: 'oneshot', label: 'One-Shots', icon: Zap }
  ];

  const earthList: string[] = [
    '616', 
    '10005', 
    '96283', 
    '120703', 
    '688', 
    '701306', 
    '58460', 
    '121698',
    'Fuera del Tiempo',
    'Multiverso'
  ];

  // Renderizador unificado para Countdown Clímax (arriba y abajo de la interfaz)
  const renderCountdownSection = (isBottomGoal: boolean) => (
    <section 
      aria-label={isBottomGoal ? "La Meta Final: Clímax de la Saga" : "Countdown Clímax de la Saga"} 
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isBottomGoal ? 'mt-16 pt-10 border-t border-white/10' : 'mb-8'}`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${theme.bgAccent} animate-ping`} />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
            <span>{isBottomGoal ? 'La Meta: Clímax del Multiverso' : 'Countdown Clímax'}</span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              theme.isDoomsday 
                ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                : 'border-red-500/50 text-red-400 bg-red-950/40 shadow-[0_0_10px_rgba(237,29,36,0.25)]'
            }`}>
              {isBottomGoal ? 'DESTINO SUPREMO TRAS 109 PRODUCCIONES' : 'OBJETIVO PRINCIPAL DE LA MARATÓN'}
            </span>
          </h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 hidden sm:flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          {isBottomGoal ? 'ESTRENO DEFINITIVO' : 'TIEMPO REAL EXACTO'}
        </span>
      </div>

      {/* 2 Tarjetas Especiales de Alto Impacto Estilo Cartel Cinematográfico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* TARJETA 1: AVENGERS DOOMSDAY */}
        <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group hover:-translate-y-1 ${
          theme.isDoomsday 
            ? 'bg-gradient-to-br from-emerald-950/50 via-[#061811]/90 to-black/95 border-emerald-400/70 shadow-[0_0_35px_rgba(16,185,129,0.3)]' 
            : 'bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-black/95 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.18)] hover:border-emerald-500/70'
        }`}>
          {/* Halo sutil de fondo */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none group-hover:bg-emerald-500/25 transition-all" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="badge-neon badge-doomsday text-[10px] px-2.5 py-0.5 rounded-lg uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3 text-emerald-400" />
                    FASE 6 • IMPACTO OMEGA
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400/90 font-bold uppercase tracking-wider">
                    18 de Diciembre de 2026
                  </span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight drop-shadow-md">
                  Avengers: <span className="text-emerald-400">Doomsday</span>
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm line-clamp-2">
                  El ascenso de Victor Von Doom, la fractura definitiva de la línea temporal y el preludio al colapso total.
                </p>
              </div>
            </div>

            {/* 4 Contadores en Vivo */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-3 border-t border-white/10 font-mono-numbers">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-emerald-500/25 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                  {countdownDoomsday.days}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                  Días
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-emerald-500/25 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                  {String(countdownDoomsday.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                  Horas
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-emerald-500/25 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                  {String(countdownDoomsday.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                  Min
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-emerald-500/40 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block tracking-tight animate-pulse">
                  {String(countdownDoomsday.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mt-0.5">
                  Seg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: AVENGERS SECRET WARS */}
        <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group hover:-translate-y-1 ${
          theme.isDoomsday 
            ? 'bg-gradient-to-br from-emerald-950/40 via-[#071317]/90 to-black/95 border-emerald-400/60 shadow-[0_0_35px_rgba(16,185,129,0.25)]' 
            : 'bg-gradient-to-br from-red-950/30 via-zinc-950/95 to-black/95 border-red-500/40 shadow-[0_0_25px_rgba(237,29,36,0.18)] hover:border-red-500/70'
        }`}>
          {/* Halo sutil de fondo */}
          <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all ${
            theme.isDoomsday ? 'bg-emerald-500/15 group-hover:bg-emerald-500/25' : 'bg-red-600/15 group-hover:bg-red-600/25'
          }`} />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`badge-neon text-[10px] px-2.5 py-0.5 rounded-lg uppercase flex items-center gap-1 ${
                    theme.isDoomsday ? 'badge-doomsday' : 'badge-ucm'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    FASE 6 • CLÍMAX MULTIVERSAL
                  </span>
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${theme.isDoomsday ? 'text-emerald-400/90' : 'text-red-400/90'}`}>
                    17 de Diciembre de 2027
                  </span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight drop-shadow-md">
                  Avengers: <span className={theme.isDoomsday ? 'text-emerald-400' : 'text-[#ff3b44]'}>Secret Wars</span>
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm line-clamp-2">
                  La colisión final de universos, Battleworld y la refundación absoluta de toda la continuidad de Marvel.
                </p>
              </div>
            </div>

            {/* 4 Contadores en Vivo */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-3 border-t border-white/10 font-mono-numbers">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-white/10 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                  {countdownSecretWars.days}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                  Días
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-white/10 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                  {String(countdownSecretWars.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                  Horas
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/60 border border-white/10 text-center shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                  {String(countdownSecretWars.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                  Min
                </span>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-2xl bg-black/60 border text-center shadow-inner ${
                theme.isDoomsday ? 'border-emerald-500/40' : 'border-red-500/40'
              }`}>
                <span className={`text-2xl sm:text-3xl font-black block tracking-tight animate-pulse ${
                  theme.isDoomsday ? 'text-emerald-400' : 'text-[#ff3b44]'
                }`}>
                  {String(countdownSecretWars.seconds).padStart(2, '0')}
                </span>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest block mt-0.5 ${
                  theme.isDoomsday ? 'text-emerald-500' : 'text-red-400'
                }`}>
                  Seg
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.isDoomsday ? 'cinema-bg-doomsday' : 'cinema-bg'} relative selection:bg-${theme.isDoomsday ? 'emerald-500' : 'red-600'} selection:text-white`}>
      
      {/* Luz ambiental cinematográfica superior */}
      <div 
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] blur-[150px] opacity-40 transition-all duration-700"
        style={{ background: theme.heroHalo }}
      />

      {/* Top Navbar Compacta con Branding Marvel */}
      <nav className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-[#050508]/85 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`px-2.5 py-1 rounded tracking-tighter text-white font-black text-sm uppercase transition-all duration-500 shadow-lg ${theme.isDoomsday ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-[#ED1D24] shadow-red-600/30'}`}>
              MARVEL
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold uppercase tracking-wider text-white">
                Multiverse Tracker
              </span>
              <span className="hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-zinc-400 bg-white/5">
                TIERRAS & CRONOLOGÍA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Reiniciar Progreso */}
            {watched.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('¿Deseas reiniciar tu progreso de visualización?')) {
                    setWatched([]);
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/30 text-xs transition-colors flex items-center gap-1"
                title="Reiniciar progreso"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reiniciar Vistas</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* CABECERA HERO CINEMATOGRÁFICA */}
      <section className="relative pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Banner Superior Estilo Cartel */}
        <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-[#07090e]/95 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {/* Resplandor y halo de fondo dinámico */}
          <div 
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-35 transition-all duration-700 pointer-events-none"
            style={{ background: theme.primaryHex }}
          />
          <div 
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[110px] opacity-25 transition-all duration-700 pointer-events-none"
            style={{ background: theme.isDoomsday ? '#047857' : '#9333ea' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            
            {/* Título de Cartel & Subtítulo */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2 w-2 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.bgAccent}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.bgAccent}`} />
                </span>
                <span className={`text-[11px] font-black tracking-[0.2em] uppercase ${theme.textAccent}`}>
                  {theme.isDoomsday ? 'FASE APOCALÍPTICA // RUTA SECRET WARS' : 'EXPEDIENTE CRONOLÓGICO MULTIVERSAL'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                  109 PRODUCCIONES
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
                Saga del <span className={`transition-colors duration-500 ${theme.textAccent}`}>Multiverso</span>
              </h1>
              
              <p className="mt-3 text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-xl">
                Guía cinematográfica definitiva de las eras canónicas, líneas temporales fracturadas (Earth-616, Earth-10005, Earth-96283) y producciones críticas hacia el desenlace de Doomsday.
              </p>
            </div>

            {/* Barra de Progreso Global con Glow */}
            <div className="w-full lg:w-80 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">Progreso Total</span>
                <span className={`font-mono-numbers font-black text-base ${theme.textAccent}`}>
                  {analytics.progressPct}%
                </span>
              </div>
              <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${theme.bgAccent} shadow-[0_0_14px_${theme.primaryHex}]`}
                  style={{ width: `${analytics.progressPct}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mt-2">
                <span>{analytics.watchedCount} VISTAS</span>
                <span>{analytics.totalCount - analytics.watchedCount} PENDIENTES</span>
              </div>
            </div>
          </div>

          {/* CONTADORES MASIVOS */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tarjeta 1: Progreso */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
                <span>Completado</span>
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono-numbers text-white tracking-tight">
                  {analytics.progressPct}
                </span>
                <span className={`text-xl font-black ${theme.textAccent}`}>%</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                {analytics.watchedCount} de {analytics.totalCount} obras
              </p>
            </div>

            {/* Tarjeta 2: Vistas / Total */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
                <span>Obras Vistas</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono-numbers text-white tracking-tight">
                  {analytics.watchedCount}
                </span>
                <span className="text-lg sm:text-2xl font-mono-numbers text-zinc-500 font-bold">
                  / {analytics.totalCount}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                En filtro actual
              </p>
            </div>

            {/* Tarjeta 3: Horas Restantes */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
                <span>Horas Restantes</span>
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono-numbers text-white tracking-tight">
                  {Math.round(analytics.remainingHours)}
                </span>
                <span className="text-lg sm:text-xl font-bold text-zinc-400">h</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                Total catálogo: ~{Math.round(analytics.totalHours)}h
              </p>
            </div>

            {/* Tarjeta 4: Días Continuos */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
                <span>Maratón Continuo</span>
                <Flame className={`w-3.5 h-3.5 ${theme.textAccent}`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl sm:text-4xl md:text-5xl font-black font-mono-numbers tracking-tight ${theme.textAccent}`}>
                  {analytics.remainingDays.toFixed(1)}
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-400">días</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                24 horas ininterrumpidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN COUNTDOWN CLÍMAX SUPERIOR: AVENGERS DOOMSDAY & SECRET WARS */}
      {renderCountdownSection(false)}

      {/* CONTROLES Y FILTROS GLASSMORPHISM (3 BARRAS INDEPENDIENTES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-3">
        
        {/* BARRA 1: ESTUDIO (UCM, FOX, SONY, MTV) */}
        <div className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 flex items-center gap-2 overflow-x-auto hide-scrollbar shadow-lg">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap pl-1 pr-2 flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-zinc-500" /> Estudio:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setActiveUniverse([])}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all duration-200 ${
                activeUniverse.length === 0
                  ? `${theme.bgAccent} text-white border-transparent shadow-[0_0_12px_${theme.primaryHex}] font-black`
                  : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white font-medium'
              }`}
            >
              Todos los Estudios
            </button>
            {studioList.map(({ key, label }) => {
              const isSelected = activeUniverse.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleUniverse(key)}
                  className={`badge-neon px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all duration-200 ${
                    isSelected
                      ? `${theme.bgAccent} text-white border-transparent shadow-[0_0_14px_${theme.primaryHex}] font-black`
                      : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* BARRA 2: FORMATO (Películas, Series, One-Shots) */}
        <div className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 flex items-center gap-2 overflow-x-auto hide-scrollbar shadow-lg">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap pl-1 pr-2 flex items-center gap-1.5 shrink-0">
            <Film className="w-3.5 h-3.5 text-zinc-500" /> Formato:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setActiveFormat([])}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all duration-200 ${
                activeFormat.length === 0
                  ? `${theme.bgAccent} text-white border-transparent shadow-[0_0_12px_${theme.primaryHex}] font-black`
                  : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white font-medium'
              }`}
            >
              Todos los Formatos
            </button>
            {formatList.map(fmt => {
              const isSelected = activeFormat.includes(fmt.key);
              const IconComponent = fmt.icon;
              return (
                <button
                  key={fmt.key}
                  onClick={() => toggleFormat(fmt.key)}
                  className={`badge-neon px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? `${theme.bgAccent} text-white border-transparent shadow-[0_0_14px_${theme.primaryHex}] font-black`
                      : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{fmt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BARRA 3: LÍNEA TEMPORAL / EARTH (616, 10005, 96283, 120703, 688, 701306, 58460, 121698...) */}
        <div className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 flex items-center gap-2 overflow-x-auto hide-scrollbar shadow-lg">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap pl-1 pr-2 flex items-center gap-1.5 shrink-0">
            <Globe className="w-3.5 h-3.5 text-zinc-500" /> Línea Temporal:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setActiveEarth([])}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all duration-200 ${
                activeEarth.length === 0
                  ? `${theme.bgAccent} text-white border-transparent shadow-[0_0_12px_${theme.primaryHex}] font-black`
                  : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white font-medium'
              }`}
            >
              Todas las Tierras
            </button>
            {earthList.map(earth => {
              const isSelected = activeEarth.includes(earth);
              return (
                <button
                  key={earth}
                  onClick={() => toggleEarth(earth)}
                  className={`badge-neon px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border transition-all duration-200 font-mono ${
                    isSelected
                      ? `${theme.bgAccent} text-white border-transparent shadow-[0_0_14px_${theme.primaryHex}] font-black`
                      : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {earth === 'Fuera del Tiempo' || earth === 'Multiverso' ? earth : `Earth-${earth}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* BARRA 4: BUSCADOR + ORDEN + BOTÓN RUTA DOOMSDAY */}
        <div className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg">
          
          {/* Buscador Rápido */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar título (ej. Deadpool, Loki) o tierra (616, 10005)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Toggle Orden Cronológico / Estreno */}
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                onClick={() => setSortBy('chrono')}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                  sortBy === 'chrono' 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Por Sucesos
              </button>
              <button
                onClick={() => setSortBy('release')}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                  sortBy === 'release' 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Por Estreno
              </button>
            </div>

            {/* BOTÓN RUTA DOOMSDAY CON TRANSICIÓN VERDE ESMERALDA */}
            <button
              onClick={() => setFilterCritical(!filterCritical)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border shrink-0 ${
                filterCritical
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.55)] scale-[1.02]'
                  : 'bg-black/80 text-zinc-400 border-emerald-900/60 hover:border-emerald-500/50 hover:text-emerald-400'
              }`}
            >
              <Flame className={`w-4 h-4 ${filterCritical ? 'animate-bounce text-zinc-950' : 'text-emerald-500'}`} />
              <span>{filterCritical ? 'Ruta Doomsday Activa' : 'Activar Ruta Doomsday'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* RESULTADOS & CONTADOR DE PRODUCCIONES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-xs text-zinc-400 font-medium flex items-center gap-2">
          <span>Mostrando <strong className="text-white font-mono-numbers">{activeDataset.length}</strong> de {marvelData.length} producciones</span>
          {(activeUniverse.length > 0 || activeFormat.length > 0 || activeEarth.length > 0 || filterCritical || searchQuery) && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-2 ml-2"
            >
              Limpiar filtros
            </button>
          )}
          {filterCritical && (
            <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
              • Canon Crítico para Secret Wars & Doomsday
            </span>
          )}
        </div>
        <div className="text-[11px] font-mono text-zinc-500 uppercase">
          {sortBy === 'chrono' ? 'Línea Temporal Sagrada' : 'Orden de Lanzamiento'}
        </div>
      </div>

      {/* GRID DE PRODUCCIONES EN 4 COLUMNAS CON TARJETAS FLOTANTES & GLASSMORPHISM */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {activeDataset.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-white/5 backdrop-blur-md">
            <Radio className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Sin resultados</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              No hay producciones que cumplan con la combinación de filtros y búsqueda actual.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          /* 4 COLUMNAS EN PANTALLAS GRANDES (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 relative">
            {activeDataset.map((item) => {
              const isWatched = watched.includes(item.id);
              const isCritical = item.cr;
              
              // Resplandor de tarjeta si es de Doomsday
              let customGlowBorder = 'border-zinc-800/80';
              if (filterCritical && isCritical && !isWatched) {
                customGlowBorder = 'border-emerald-500/70 shadow-[0_0_20px_rgba(16,185,129,0.25)]';
              } else if (isCritical && !isWatched) {
                customGlowBorder = 'border-emerald-600/40';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`timeline-card card-floating group flex flex-col p-4 sm:p-5 rounded-2xl cursor-pointer border ${customGlowBorder} ${theme.cardHoverClass} ${
                    isWatched
                      ? 'bg-zinc-950/60 opacity-50 hover:opacity-85'
                      : 'bg-zinc-900/80 backdrop-blur-md'
                  }`}
                >
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono-numbers text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-lg bg-black/60 text-zinc-300 border border-white/10">
                        {sortBy === 'chrono'
                          ? (item.y_in === 1000 ? 'ORIGEN' : item.y_in)
                          : `ESTRENO: ${item.y_out}`}
                      </span>

                      {/* Insignia Holográfica Doomsday si es crítica */}
                      {item.cr && (
                        <span 
                          title="Producción crítica para la saga de Doctor Doom y Secret Wars"
                          className="badge-neon badge-doomsday text-[9px] px-1.5 py-0.5 rounded-lg uppercase flex items-center gap-1 font-bold"
                        >
                          <Flame className="w-2.5 h-2.5" />
                          DOOM
                        </span>
                      )}
                    </div>

                    {/* Botón de Visto con Checkmark */}
                    <button
                      onClick={(e) => toggleWatch(e, item.id)}
                      title={isWatched ? 'Desmarcar como vista' : 'Marcar como vista'}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-200 shrink-0 ${
                        isWatched
                          ? `${theme.bgAccent} ${theme.borderAccent} text-white shadow-lg`
                          : 'border-zinc-700 bg-black/50 text-transparent hover:text-zinc-400 hover:border-zinc-500'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`font-black text-base sm:text-lg leading-tight mb-1.5 transition-colors line-clamp-2 ${
                        isWatched ? 'line-through text-zinc-500' : 'text-white group-hover:text-zinc-100'
                      }`}>
                        {item.tEs}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {/* Badge de Universo */}
                        <span className={`badge-neon text-[10px] px-2 py-0.5 rounded-md uppercase font-bold ${getUniverseBadge(item.uni)}`}>
                          {item.uni}
                        </span>

                        {/* Badge de Línea Temporal / Earth */}
                        <span className="badge-neon badge-earth text-[10px] px-2 py-0.5 rounded-md font-mono">
                          {item.earth === 'Fuera del Tiempo' || item.earth === 'Multiverso' ? item.earth : `E-${item.earth}`}
                        </span>

                        <h4 className="text-[11px] text-zinc-400 italic truncate max-w-[140px]" title={item.tEn}>
                          {item.tEn}
                        </h4>
                      </div>
                    </div>

                    {/* Fila Inferior de Metadatos con Badges Neón */}
                    <div className="pt-2.5 border-t border-white/5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-zinc-400">
                      
                      {/* Badge Neón de Formato */}
                      <span className={`badge-neon px-2 py-0.5 rounded-md flex items-center gap-1 ${getFormatBadge(item.ty)}`}>
                        {item.ty === 'movie' && <Film className="w-3 h-3" />}
                        {item.ty === 'series' && <Tv className="w-3 h-3" />}
                        {item.ty === 'oneshot' && <Zap className="w-3 h-3" />}
                        <span className="capitalize">{item.ty === 'oneshot' ? 'One-Shot' : item.ty === 'movie' ? 'Película' : 'Serie'}</span>
                      </span>

                      {/* Duración */}
                      <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/10 font-mono-numbers text-zinc-300">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {item.d > 1000 ? `${Math.round(item.d / 60)}h` : `${item.d}m`}
                      </span>

                      {/* Escenas Post-Créditos */}
                      {item.pc > 0 && (
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-mono-numbers ${theme.textAccent} bg-black/50 border border-white/10`}>
                          <Ticket className="w-3 h-3" />
                          {item.pc} {item.pc === 1 ? 'Post' : 'Posts'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SECCIÓN COUNTDOWN CLÍMAX INFERIOR: LA META TRAS LAS 109 PRODUCCIONES */}
        {renderCountdownSection(true)}
      </main>

      {/* MODAL INMERSIVO ESTILO EXPEDIENTE SHIELD (Desenfocado total, ficha clasificada) */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl transition-all"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className={`w-full max-w-xl bg-[#07090d] border ${
              selectedItem.cr 
                ? 'border-emerald-500/70 shadow-[0_0_50px_rgba(16,185,129,0.3)]' 
                : 'border-red-500/50 shadow-[0_0_50px_rgba(237,29,36,0.25)]'
            } rounded-3xl overflow-hidden modal-shield-enter relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Trama de Escaneo Táctico S.H.I.E.L.D. */}
            <div className="absolute inset-0 shield-scanlines z-10 pointer-events-none" />

            {/* Cabecera Clasificada S.H.I.E.L.D. / TVA */}
            <div className="bg-black/90 px-5 py-4 border-b border-white/10 flex items-center justify-between relative z-20">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${selectedItem.cr ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400' : 'border-red-500/40 bg-red-950/40 text-red-400'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400 block">
                    S.H.I.E.L.D. // EXPEDIENTE MULTIVERSAL CLASIFICADO
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    CLEARANCE: LEVEL 9 // ARCHIVO ID-MRVL-{String(selectedItem.id).padStart(3, '0')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Expediente */}
            <div className="p-6 relative z-20 space-y-6">
              
              {/* Badges de Estado y Prioridad */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`badge-neon text-xs px-3 py-1 rounded-lg uppercase ${getUniverseBadge(selectedItem.uni)}`}>
                    {getUniverseName(selectedItem.uni)}
                  </span>
                  <span className="badge-neon badge-earth text-xs px-3 py-1 rounded-lg font-mono">
                    {selectedItem.earth === 'Fuera del Tiempo' || selectedItem.earth === 'Multiverso' ? selectedItem.earth : `Tierra-${selectedItem.earth}`}
                  </span>
                  <span className={`badge-neon text-xs px-3 py-1 rounded-lg uppercase ${getFormatBadge(selectedItem.ty)}`}>
                    {selectedItem.ty === 'movie' ? 'Largometraje' : selectedItem.ty === 'series' ? 'Serie de Televisión' : 'Cortometraje Canon'}
                  </span>
                </div>

                {selectedItem.cr ? (
                  <span className="badge-neon badge-doomsday text-xs px-3 py-1 rounded-lg font-black uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] shrink-0">
                    <Flame className="w-3.5 h-3.5" />
                    RUTA DOOMSDAY
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-[10px] font-mono border border-zinc-700 shrink-0">
                    CANON ALTERNO
                  </span>
                )}
              </div>

              {/* Título y Ficha Principal */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {selectedItem.tEs}
                </h2>
                <h3 className="text-sm text-zinc-400 italic font-medium mt-1">
                  Título original: {selectedItem.tEn}
                </h3>
              </div>

              {/* Ficha Técnica Cuadrícula de Datos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-black/60 p-3.5 rounded-2xl border border-white/10 font-mono text-xs">
                <div className="p-2.5 bg-zinc-950/80 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Año Canónico</span>
                  <span className="font-bold text-white text-sm">
                    {selectedItem.y_in === 1000 ? 'Origen' : selectedItem.y_in}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-950/80 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Estreno en Cines</span>
                  <span className="font-bold text-white text-sm">
                    {selectedItem.y_out}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-950/80 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Duración</span>
                  <span className="font-bold text-white text-sm">
                    {selectedItem.d > 1000 ? `${Math.round(selectedItem.d / 60)} hrs` : `${selectedItem.d} min`}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-950/80 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-500 block uppercase">Post-Créditos</span>
                  <span className={`font-bold text-sm ${selectedItem.pc > 0 ? theme.textAccent : 'text-zinc-400'}`}>
                    {selectedItem.pc}
                  </span>
                </div>
              </div>

              {/* Línea Temporal / Ubicación Multiversal */}
              <div className="flex items-center gap-2 text-xs bg-black/50 px-4 py-3 rounded-2xl border border-white/5">
                <span className="font-mono text-zinc-500 uppercase tracking-wider text-[11px]">Realidad / Tierra:</span>
                <span className="font-bold text-zinc-100 font-mono">
                  {selectedItem.earth === 'Fuera del Tiempo' || selectedItem.earth === 'Multiverso' 
                    ? selectedItem.earth 
                    : `Tierra-${selectedItem.earth} (${getUniverseName(selectedItem.uni)})`}
                </span>
              </div>

              {/* Barra de Acciones del Expediente */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/10">
                
                {/* Botón de Visto en Modal */}
                <button
                  onClick={(e) => toggleWatch(e, selectedItem.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    watched.includes(selectedItem.id)
                      ? 'bg-zinc-800 text-zinc-300 border border-white/10 hover:bg-zinc-700'
                      : `${theme.bgAccent} text-white shadow-lg ${theme.borderGlow}`
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{watched.includes(selectedItem.id) ? 'Marcado como Visto (Desmarcar)' : 'Marcar como Visto'}</span>
                </button>

                {/* Navegación Anterior / Siguiente */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={handlePrevItem}
                    disabled={currentModalIndex <= 0}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Obra anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-zinc-500 px-1">
                    {currentModalIndex + 1} / {activeDataset.length}
                  </span>
                  <button
                    onClick={handleNextItem}
                    disabled={currentModalIndex >= activeDataset.length - 1}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Siguiente obra"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER FIJO / DESCARGO LEGAL OBLIGATORIO */}
      <footer className="mt-16 border-t border-white/10 bg-[#030306]/95 py-8 px-4 text-center relative z-20">
        <div className="max-w-4xl mx-auto space-y-2.5">
          <p className="text-xs text-zinc-500 leading-relaxed font-mono">
            Sitio creado por fans. Este proyecto no es oficial, no tiene fines de lucro y no está asociado, respaldado ni afiliado de ninguna manera con Marvel Entertainment LLC, Disney, Sony Pictures o 20th Century Studios.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-600 font-mono uppercase tracking-wider">
            <span>Cronología Multiversal Actualizada</span>
            <span>•</span>
            <span>109 Producciones Oficiales</span>
            <span>•</span>
            <span>Multiverse Saga 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
