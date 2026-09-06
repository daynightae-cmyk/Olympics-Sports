import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Zap,
  Activity,
  Calendar,
  Download,
  Printer,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Target,
  BarChart3,
  Layers,
} from 'lucide-react';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { useUiSettings } from '../../../ui/theme/useUiSettings';
import { exportMonthlyTrainingCSV, printMonthlyTrainingReport } from '../../../utils/exportTrainingReport';

interface PerformanceTrendsDashboardProps {
  playerNameEn?: string;
  playerNameAr?: string;
  membershipId?: string;
  sportName?: string;
  tier?: string;
}

type Period = '3m' | '6m' | '12m';
type TrendView = 'volume_load' | 'skills_trajectory' | 'intensity_split';

export function PerformanceTrendsDashboard({
  playerNameEn = 'Athlete',
  playerNameAr = 'الرياضي',
  membershipId = 'UOS-ATH-889',
  sportName = 'Olympic Disciplines',
  tier = 'Performance Elite',
}: PerformanceTrendsDashboardProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const [period, setPeriod] = useState<Period>('6m');
  const [activeView, setActiveView] = useState<TrendView>('volume_load');

  // Longitudinal monthly dataset
  const historicalData = useMemo(() => {
    const full = [
      {
        month: isAr ? 'أكتوبر' : 'Oct',
        hours: 18.5,
        sessions: 12,
        intensity: 75,
        technical: 68,
        speed: 70,
        stamina: 66,
        tactical: 64,
        coachScore: 72,
      },
      {
        month: isAr ? 'نوفمبر' : 'Nov',
        hours: 22.0,
        sessions: 14,
        intensity: 80,
        technical: 73,
        speed: 74,
        stamina: 72,
        tactical: 70,
        coachScore: 76,
      },
      {
        month: isAr ? 'ديسمبر' : 'Dec',
        hours: 24.5,
        sessions: 15,
        intensity: 84,
        technical: 79,
        speed: 78,
        stamina: 76,
        tactical: 75,
        coachScore: 81,
      },
      {
        month: isAr ? 'يناير' : 'Jan',
        hours: 26.0,
        sessions: 16,
        intensity: 88,
        technical: 84,
        speed: 82,
        stamina: 83,
        tactical: 80,
        coachScore: 86,
      },
      {
        month: isAr ? 'فبراير' : 'Feb',
        hours: 28.5,
        sessions: 17,
        intensity: 91,
        technical: 89,
        speed: 88,
        stamina: 89,
        tactical: 86,
        coachScore: 90,
      },
      {
        month: isAr ? 'مارس' : 'Mar',
        hours: 31.0,
        sessions: 18,
        intensity: 95,
        technical: 94,
        speed: 93,
        stamina: 94,
        tactical: 92,
        coachScore: 95,
      },
    ];

    if (period === '3m') return full.slice(-3);
    return full;
  }, [period, isAr]);

  // Intensity split data for donut chart
  const intensityData = useMemo(() => {
    return [
      { name: isAr ? 'منطقة الشدة القصوى (Z4-Z5)' : 'High / Peak Zone', value: 45, color: '#fbbf24' },
      { name: isAr ? 'منطقة البناء الهوائي (Z3)' : 'Moderate Aerobic Base', value: 35, color: '#38bdf8' },
      { name: isAr ? 'منطقة الاستشفاء والتكنيك (Z1-Z2)' : 'Recovery & Form Drill', value: 20, color: '#34d399' },
    ];
  }, [isAr]);

  // Calculations for improvement metrics
  const metrics = useMemo(() => {
    const first = historicalData[0];
    const last = historicalData[historicalData.length - 1];
    const hoursDelta = (((last.hours - first.hours) / first.hours) * 100).toFixed(1);
    const scoreDelta = (((last.coachScore - first.coachScore) / first.coachScore) * 100).toFixed(1);
    const totalHoursPeriod = historicalData.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
    const totalSessionsPeriod = historicalData.reduce((acc, curr) => acc + curr.sessions, 0);

    return {
      hoursDelta,
      scoreDelta,
      totalHoursPeriod,
      totalSessionsPeriod,
      currentRating: last.coachScore,
    };
  }, [historicalData]);

  const handleExportCSV = () => {
    const exportData = {
      athleteNameEn: playerNameEn,
      athleteNameAr: playerNameAr,
      membershipId,
      sport: sportName,
      level: tier,
      month: period === '3m' ? 'Last 3 Months' : period === '6m' ? 'Last 6 Months' : 'Annual Cycle',
      year: new Date().getFullYear(),
      totalHours: parseFloat(metrics.totalHoursPeriod),
      totalSessions: metrics.totalSessionsPeriod,
      avgIntensity: 'High Performance Elite',
      attendanceRate: 98,
      masteryScore: metrics.currentRating,
      entries: historicalData.map((h) => ({
        date: `${h.month} Cycle`,
        activityName: `Monthly Training Aggregate (${h.sessions} sessions)`,
        durationMinutes: Math.round(h.hours * 60),
        intensity: `${h.intensity}% intensity index`,
        rpe: 8.5,
        notes: `Technical: ${h.technical}/100, Speed: ${h.speed}/100, Stamina: ${h.stamina}/100`,
      })),
    };

    exportMonthlyTrainingCSV(exportData);
  };

  const handlePrintReport = () => {
    const exportData = {
      athleteNameEn: playerNameEn,
      athleteNameAr: playerNameAr,
      membershipId,
      sport: sportName,
      level: tier,
      month: 'Performance Season',
      year: new Date().getFullYear(),
      totalHours: parseFloat(metrics.totalHoursPeriod),
      totalSessions: metrics.totalSessionsPeriod,
      avgIntensity: 'High Performance Elite',
      attendanceRate: 98,
      masteryScore: metrics.currentRating,
      entries: historicalData.map((h) => ({
        date: `${h.month} Progress Marker`,
        activityName: `Historical Performance Milestone (${h.sessions} sessions)`,
        durationMinutes: Math.round(h.hours * 60),
        intensity: `${h.intensity}% Target`,
        rpe: 9,
        notes: `Coach Verified Index: ${h.coachScore}/100 with comprehensive biomechanics assessment.`,
      })),
    };

    printMonthlyTrainingReport(exportData, isAr);
  };

  return (
    <div className="athlete-glass-card p-5 sm:p-7 space-y-6 border-amber-400/25" id="performance-trends-dashboard">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <TrendingUp size={18} />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-amber-400">
              <BilingualText value={bi('Performance Trends Dashboard', 'لوحة مؤشرات واتجاهات الأداء')} />
            </span>
          </div>
          <h2 className="mt-1 text-lg sm:text-2xl font-black text-white">
            <BilingualText value={bi('Historical Training Data & Improvement Trajectory', 'البيانات التاريخية للتدريب ومنحنيات التطور')} />
          </h2>
          <p className="text-xs text-slate-300">
            <BilingualText
              value={bi(
                'Longitudinal analytics of training volume, load progression, and verified skill improvements.',
                'تحليلات طويلة المدى للحجم التدريبي، الحمل البدني، وتطور المؤشرات المهارية والبدنية المعتمدة.'
              )}
            />
          </p>
        </div>

        {/* View mode & Period Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Tab Buttons */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveView('volume_load')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeView === 'volume_load'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BilingualText value={bi('Volume & Load', 'الحجم والجهد')} />
            </button>
            <button
              type="button"
              onClick={() => setActiveView('skills_trajectory')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeView === 'skills_trajectory'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BilingualText value={bi('Skill Growth', 'تطور المهارات')} />
            </button>
            <button
              type="button"
              onClick={() => setActiveView('intensity_split')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeView === 'intensity_split'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BilingualText value={bi('Intensity Split', 'توزيع الشدة')} />
            </button>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs">
            {(['3m', '6m'] as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  period === p
                    ? 'bg-white/15 text-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === '3m' ? (isAr ? '3 أشهر' : '3 Months') : (isAr ? '6 أشهر' : '6 Months')}
              </button>
            ))}
          </div>

          {/* Export Report Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="p-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title={isAr ? 'تصدير التقرير الشهري (CSV)' : 'Export Monthly Report (CSV)'}
            >
              <Download size={15} />
            </button>
            <button
              type="button"
              onClick={handlePrintReport}
              className="p-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              title={isAr ? 'طباعة تقرير الأداء الرسمي' : 'Print Official Performance Summary'}
            >
              <Printer size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Performance Improvement Metric Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Activity size={13} className="text-amber-400" />
            <BilingualText value={bi('Volume Delta', 'نمو ساعات التدريب')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-400 flex items-center gap-1">
            <ArrowUpRight size={18} />
            <span>+{metrics.hoursDelta}%</span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            {metrics.totalHoursPeriod} {isAr ? 'ساعة إجمالية' : 'total hours in cycle'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Award size={13} className="text-amber-400" />
            <BilingualText value={bi('Skill Gain Index', 'معدل اكتساب المهارة')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-400 flex items-center gap-1">
            <ArrowUpRight size={18} />
            <span>+{metrics.scoreDelta}%</span>
          </div>
          <div className="text-[10px] text-amber-300 font-medium">
            {isAr ? 'تقييم فني متصاعد' : 'Continuous Upward Trajectory'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Calendar size={13} className="text-amber-400" />
            <BilingualText value={bi('Training Consistency', 'معدل الاستمرارية')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-white">
            98.2%
          </div>
          <div className="text-[10px] text-emerald-400 font-bold">
            {metrics.totalSessionsPeriod} {isAr ? 'حصة معتمدة' : 'completed sessions'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <ShieldCheck size={13} className="text-amber-400" />
            <BilingualText value={bi('Current Mastery Tier', 'المستوى الحالي')} />
          </div>
          <div className="text-lg sm:text-xl font-black text-white">
            {metrics.currentRating} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="text-[10px] text-amber-400 font-bold">
            <BilingualText value={bi('Top 5% Academy Percentile', 'ضمن أعلى 5% بالأكاديمية')} />
          </div>
        </div>
      </div>

      {/* Main Recharts Visualization Canvas */}
      <div className="pt-2">
        {activeView === 'volume_load' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 px-1 gap-2">
              <span className="font-bold">
                <BilingualText value={bi('Monthly Training Hours vs Intensity Index', 'ساعات التدريب الشهرية مقابل مؤشر الكثافة')} />
              </span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                  <BilingualText value={bi('Hours Logged (Bars)', 'ساعات التدريب (أعمدة)')} />
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
                  <BilingualText value={bi('Intensity % (Line)', 'مؤشر الكثافة (خط)')} />
                </span>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full rounded-2xl bg-slate-950/40 p-2 sm:p-4 border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historicalData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#d97706" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    unit="h"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[50, 100]}
                    stroke="#38bdf8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(56,189,248,0.2)' }}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(251,191,36,0.3)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'hours') return [`${value} ${isAr ? 'ساعة' : 'hours'}`, isAr ? 'الساعات المسجلة' : 'Hours Logged'];
                      if (name === 'intensity') return [`${value}%`, isAr ? 'مؤشر الكثافة' : 'Intensity Index'];
                      return [value, name];
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="hours"
                    fill="url(#hoursGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="intensity"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#38bdf8' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeView === 'skills_trajectory' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 px-1 gap-2">
              <span className="font-bold">
                <BilingualText value={bi('Core Performance Attributes Growth (0-100)', 'منحنيات تطور المهارات التراكمية')} />
              </span>
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <BilingualText value={bi('Coach Overall', 'التقييم العام')} />
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <BilingualText value={bi('Technical', 'الفني')} />
                </span>
                <span className="flex items-center gap-1 text-sky-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <BilingualText value={bi('Speed', 'السرعة')} />
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <BilingualText value={bi('Tactical', 'التكتيكي')} />
                </span>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full rounded-2xl bg-slate-950/40 p-2 sm:p-4 border border-white/5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    domain={[60, 100]}
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
                  <Line
                    type="monotone"
                    dataKey="coachScore"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#fbbf24' }}
                    name={isAr ? 'تقييم المدرب العام' : 'Overall Coach Score'}
                  />
                  <Line
                    type="monotone"
                    dataKey="technical"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#34d399' }}
                    name={isAr ? 'التكنيك والمهارة' : 'Technical Skill'}
                  />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#38bdf8' }}
                    name={isAr ? 'السرعة والرشاقة' : 'Speed & Pace'}
                  />
                  <Line
                    type="monotone"
                    dataKey="tactical"
                    stroke="#c084fc"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#c084fc' }}
                    name={isAr ? 'الذكاء التكتيكي' : 'Tactical IQ'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeView === 'intensity_split' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 px-1">
              <span className="font-bold">
                <BilingualText value={bi('Training Workload Intensity Breakdown', 'توزيع الجهد والحمل التدريبي')} />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center rounded-2xl bg-slate-950/40 p-4 border border-white/5">
              <div className="md:col-span-6 h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={intensityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {intensityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#090d16',
                        borderColor: 'rgba(251,191,36,0.3)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                      formatter={(val: any) => [`${val}%`, isAr ? 'النسبة المئوية' : 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-6 space-y-3">
                {intensityData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-bold text-white">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-amber-400">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Coach Summary Note */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300 font-tajawal">
        <Sparkles size={16} className="text-amber-400 shrink-0" />
        <span>
          <BilingualText
            value={bi(
              'Historical trends are verified by the United Olympics Sports Technical Coaching Council.',
              'تُعتمد كافة منحنيات التطور ومؤشرات الأداء التاريخية من المجلس الفني للأكاديمية الأولمبية.'
            )}
          />
        </span>
      </div>

    </div>
  );
}
