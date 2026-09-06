import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Activity,
  Zap,
  Target,
  Award,
  Calendar,
  Layers,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { useUiSettings } from '../../../ui/theme/useUiSettings';

interface AthleticProgressChartsProps {
  playerName?: string;
  sportName?: { en: string; ar: string };
  level?: { en: string; ar: string };
}

type Timeframe = '4w' | '8w' | '12w';
type ActiveTab = 'volume' | 'skills' | 'radar';

export function AthleticProgressCharts({
  playerName,
  sportName,
  level,
}: AthleticProgressChartsProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const [activeTab, setActiveTab] = useState<ActiveTab>('volume');
  const [timeframe, setTimeframe] = useState<Timeframe>('8w');

  // Simulated structured longitudinal dataset based on selected timeframe
  const volumeData = useMemo(() => {
    const fullSeries = [
      { week: isAr ? 'أسبوع 1' : 'W1', hours: 4.5, intensity: 72, target: 4.0, sessions: 3 },
      { week: isAr ? 'أسبوع 2' : 'W2', hours: 5.0, intensity: 78, target: 4.5, sessions: 3 },
      { week: isAr ? 'أسبوع 3' : 'W3', hours: 6.0, intensity: 84, target: 5.0, sessions: 4 },
      { week: isAr ? 'أسبوع 4' : 'W4', hours: 5.5, intensity: 80, target: 5.0, sessions: 3 },
      { week: isAr ? 'أسبوع 5' : 'W5', hours: 6.5, intensity: 88, target: 5.5, sessions: 4 },
      { week: isAr ? 'أسبوع 6' : 'W6', hours: 7.0, intensity: 91, target: 6.0, sessions: 4 },
      { week: isAr ? 'أسبوع 7' : 'W7', hours: 6.8, intensity: 89, target: 6.0, sessions: 4 },
      { week: isAr ? 'أسبوع 8' : 'W8', hours: 7.5, intensity: 94, target: 6.5, sessions: 5 },
      { week: isAr ? 'أسبوع 9' : 'W9', hours: 7.2, intensity: 92, target: 6.5, sessions: 4 },
      { week: isAr ? 'أسبوع 10' : 'W10', hours: 8.0, intensity: 96, target: 7.0, sessions: 5 },
      { week: isAr ? 'أسبوع 11' : 'W11', hours: 7.8, intensity: 93, target: 7.0, sessions: 5 },
      { week: isAr ? 'أسبوع 12' : 'W12', hours: 8.5, intensity: 98, target: 7.5, sessions: 5 },
    ];

    if (timeframe === '4w') return fullSeries.slice(-4);
    if (timeframe === '8w') return fullSeries.slice(-8);
    return fullSeries;
  }, [timeframe, isAr]);

  const skillGrowthData = useMemo(() => {
    const fullSeries = [
      { month: isAr ? 'الشهر 1' : 'M1', technical: 65, stamina: 60, tactical: 58, speed: 68 },
      { month: isAr ? 'الشهر 2' : 'M2', technical: 72, stamina: 68, tactical: 66, speed: 74 },
      { month: isAr ? 'الشهر 3' : 'M3', technical: 80, stamina: 76, tactical: 74, speed: 81 },
      { month: isAr ? 'الشهر 4' : 'M4', technical: 86, stamina: 84, tactical: 82, speed: 87 },
      { month: isAr ? 'الشهر 5' : 'M5', technical: 91, stamina: 89, tactical: 88, speed: 92 },
      { month: isAr ? 'الشهر 6' : 'M6', technical: 95, stamina: 94, tactical: 92, speed: 96 },
    ];

    if (timeframe === '4w') return fullSeries.slice(-3);
    return fullSeries;
  }, [timeframe, isAr]);

  const radarData = useMemo(() => {
    return [
      {
        subject: isAr ? 'السرعة والانطلاق' : 'Speed & Pace',
        score: 92,
        benchmark: 78,
        fullMark: 100,
      },
      {
        subject: isAr ? 'الدقة والتكنيك' : 'Technical Skill',
        score: 89,
        benchmark: 75,
        fullMark: 100,
      },
      {
        subject: isAr ? 'التحمل القلبي' : 'Cardio Stamina',
        score: 94,
        benchmark: 80,
        fullMark: 100,
      },
      {
        subject: isAr ? 'الرشاقة والتوازن' : 'Agility & Balance',
        score: 86,
        benchmark: 72,
        fullMark: 100,
      },
      {
        subject: isAr ? 'الوعي التكتيكي' : 'Tactical IQ',
        score: 88,
        benchmark: 70,
        fullMark: 100,
      },
      {
        subject: isAr ? 'الانضباط والثبات' : 'Mental Focus',
        score: 95,
        benchmark: 82,
        fullMark: 100,
      },
    ];
  }, [isAr]);

  // Dynamic calculations for current period summary
  const totalHours = useMemo(() => {
    return volumeData.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
  }, [volumeData]);

  const avgIntensity = useMemo(() => {
    const sum = volumeData.reduce((acc, curr) => acc + curr.intensity, 0);
    return Math.round(sum / volumeData.length);
  }, [volumeData]);

  const totalSessions = useMemo(() => {
    return volumeData.reduce((acc, curr) => acc + curr.sessions, 0);
  }, [volumeData]);

  return (
    <div className="athlete-glass-card p-5 sm:p-7 space-y-6 border-amber-500/20" id="athletic-progress-analytics">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <TrendingUp size={18} />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-amber-400">
              <BilingualText value={bi('Athletic Growth Engine', 'محرك مؤشرات التطور الرياضي')} />
            </span>
          </div>
          <h2 className="mt-1.5 text-lg sm:text-xl font-black text-white">
            <BilingualText value={bi('Training Progress & Performance Trajectory', 'منحنى تقدم التدريب ومعدل النمو البدني')} />
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            <BilingualText
              value={bi(
                'Comprehensive biometric and technical development analytics across training cycles.',
                'تحليلات شاملة للحجم التدريبي، الكثافة الحركية ومستوى الإتقان الفني عبر الدورات التدريبية.'
              )}
            />
          </p>
        </div>

        {/* View & Period Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tab buttons */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('volume')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'volume'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BilingualText value={bi('Volume & Load', 'الحجم والجهد')} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BilingualText value={bi('Skill Growth', 'تطور المهارات')} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'radar'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BilingualText value={bi('Athletic Profile', 'الملف التنافسي')} />
            </button>
          </div>

          {/* Timeframe selector (for volume/skills) */}
          {activeTab !== 'radar' && (
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs">
              {(['4w', '8w', '12w'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white/15 text-amber-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf === '4w'
                    ? isAr ? '4 أسابيع' : '4 Weeks'
                    : tf === '8w'
                    ? isAr ? '8 أسابيع' : '8 Weeks'
                    : isAr ? '12 أسبوع' : '12 Weeks'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Activity size={13} className="text-amber-400" />
            <BilingualText value={bi('Period Volume', 'ساعات التدريب')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-white">{totalHours} <span className="text-xs font-normal text-slate-400">{isAr ? 'ساعة' : 'hrs'}</span></div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span>+14.2%</span>
            <span className="text-slate-500 font-normal">{isAr ? 'مقارنة بالسابق' : 'vs previous'}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Zap size={13} className="text-amber-400" />
            <BilingualText value={bi('Training Intensity', 'متوسط الكثافة')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-white">{avgIntensity}%</div>
          <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
            <span>{isAr ? 'نطاق الأداء العالي' : 'High Performance Zone'}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Calendar size={13} className="text-amber-400" />
            <BilingualText value={bi('Completed Sessions', 'الحصص المنجزة')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-white">{totalSessions} <span className="text-xs font-normal text-slate-400">{isAr ? 'حصة' : 'sessions'}</span></div>
          <div className="text-[10px] text-emerald-400 font-bold">
            <span>97% {isAr ? 'نسبة الالتزام' : 'Attendance Rate'}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Award size={13} className="text-amber-400" />
            <BilingualText value={bi('Overall Mastery', 'مؤشر الإتقان')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-white">93.5 <span className="text-xs font-normal text-slate-400">/ 100</span></div>
          <div className="text-[10px] text-amber-300 font-bold">
            <span>{isAr ? 'فئة النخبة المتقدمة' : 'Elite Tier A'}</span>
          </div>
        </div>
      </div>

      {/* Main Recharts Visualization Canvas */}
      <div className="pt-2">
        {activeTab === 'volume' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold text-slate-200">
                <BilingualText value={bi('Weekly Training Hours vs Target Load', 'ساعات التدريب الأسبوعية مقابل الحمل المستهدف')} />
              </span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <BilingualText value={bi('Logged Hours', 'الساعات المسجلة')} />
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400/60 inline-block" />
                  <BilingualText value={bi('Target Goal', 'الهدف المخطط')} />
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full rounded-2xl bg-slate-950/40 p-2 sm:p-4 border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="week"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    unit="h"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(251,191,36,0.3)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'hours') return [`${value} ${isAr ? 'ساعة' : 'hours'}`, isAr ? 'الساعات الفعلية' : 'Actual Hours'];
                      if (name === 'target') return [`${value} ${isAr ? 'ساعة' : 'hours'}`, isAr ? 'الهدف المخطط' : 'Target Goal'];
                      return [value, name];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#34d399"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#targetGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#goldGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold text-slate-200">
                <BilingualText value={bi('Pillar Mastery Trajectory (0-100)', 'معدل تطور المهارات التراكمي')} />
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <BilingualText value={bi('Technical', 'الفني')} />
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <BilingualText value={bi('Stamina', 'التحمل')} />
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <BilingualText value={bi('Speed', 'السرعة')} />
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full rounded-2xl bg-slate-950/40 p-2 sm:p-4 border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    domain={[40, 100]}
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(251,191,36,0.3)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="technical" fill="#fbbf24" radius={[4, 4, 0, 0]} maxBarSize={22} name={isAr ? 'المهارة الفنية' : 'Technical Skill'} />
                  <Bar dataKey="stamina" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={22} name={isAr ? 'التحمل البدني' : 'Physical Stamina'} />
                  <Bar dataKey="speed" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={22} name={isAr ? 'السرعة والرشاقة' : 'Speed & Agility'} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold text-slate-200">
                <BilingualText value={bi('6-Dimension Athlete Radar vs Academy Benchmark', 'الرادار الرياضي سداسي الأبعاد مقابل معيار الأكاديمية')} />
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <BilingualText value={bi('Athlete Level', 'مستوى الرياضي')} />
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <BilingualText value={bi('Academy Average', 'متوسط الفئة')} />
                </span>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full rounded-2xl bg-slate-950/40 p-2 border border-white/5 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.12)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={9} />
                  <Radar
                    name={isAr ? 'معدل الأكاديمية' : 'Academy Average'}
                    dataKey="benchmark"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name={isAr ? 'تقييم الرياضي' : 'Athlete Rating'}
                    dataKey="score"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    fill="#fbbf24"
                    fillOpacity={0.45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(251,191,36,0.3)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Footer Coach Note */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300 font-tajawal">
        <Sparkles size={16} className="text-amber-400 shrink-0" />
        <span>
          <BilingualText
            value={bi(
              'Performance trajectory is updated synchronously following each verified coach evaluation cycle.',
              'يتم تحديث منحنى الأداء تلقائياً بعد اعتماد تقرير المدرب الدوري لكل دورة تدريبية.'
            )}
          />
        </span>
      </div>
    </div>
  );
}
