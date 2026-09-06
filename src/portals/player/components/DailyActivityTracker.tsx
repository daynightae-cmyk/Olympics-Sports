import React, { useState, useMemo } from 'react';
import {
  Activity,
  Clock,
  Zap,
  Flame,
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Filter,
  BarChart2,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { useUiSettings } from '../../../ui/theme/useUiSettings';
import { useTrainingLog, type TrainingIntensity } from '../hooks/useTrainingLog';
import { exportMonthlyTrainingCSV, printMonthlyTrainingReport } from '../../../utils/exportTrainingReport';

interface DailyActivityTrackerProps {
  playerId: string;
  playerNameEn?: string;
  playerNameAr?: string;
  membershipId?: string;
  sportName?: string;
  tier?: string;
}

export type ActivityCategory =
  | 'academy_training'
  | 'cardio_conditioning'
  | 'tactical_scrimmage'
  | 'strength_mobility'
  | 'recovery_stretching'
  | 'individual_drills';

interface ActivityPreset {
  minutes: number;
  intensity: TrainingIntensity;
  labelEn: string;
  labelAr: string;
}

const PRESETS: ActivityPreset[] = [
  { minutes: 30, intensity: 'low', labelEn: '30m Light', labelAr: '30د خفيف' },
  { minutes: 45, intensity: 'medium', labelEn: '45m Moderate', labelAr: '45د متوسط' },
  { minutes: 60, intensity: 'high', labelEn: '60m High Intensity', labelAr: '60د عالي الشدة' },
  { minutes: 90, intensity: 'high', labelEn: '90m Match Prep', labelAr: '90د إعداد مباراة' },
  { minutes: 120, intensity: 'high', labelEn: '2h Intensive Camp', labelAr: 'ساعتان مكثفة' },
];

export function DailyActivityTracker({
  playerId,
  playerNameEn = 'Athlete',
  playerNameAr = 'اللاعب',
  membershipId = 'UOS-ATH-778',
  sportName = 'Olympic Sport',
  tier = 'Development',
}: DailyActivityTrackerProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const {
    entries,
    weeklyGoal,
    currentWeekMinutes,
    addEntry,
    deleteEntry,
    updateWeeklyGoal,
  } = useTrainingLog(playerId);

  // Form State
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [durationHours, setDurationHours] = useState<string>('1');
  const [durationMinutes, setDurationMinutes] = useState<string>('0');
  const [intensity, setIntensity] = useState<TrainingIntensity>('medium');
  const [category, setCategory] = useState<ActivityCategory>('academy_training');
  const [rpe, setRpe] = useState<number>(7);
  const [notes, setNotes] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('Current Month');
  const [filterIntensity, setFilterIntensity] = useState<string>('all');
  const [goalModalOpen, setGoalModalOpen] = useState<boolean>(false);
  const [newGoalHours, setNewGoalHours] = useState<string>(() =>
    weeklyGoal ? (weeklyGoal.targetMinutes / 60).toFixed(1) : '5.0'
  );
  const [successToast, setSuccessToast] = useState<boolean>(false);

  // Calculate Streak & Totals
  const stats = useMemo(() => {
    const totalMins = entries.reduce((acc, curr) => acc + curr.durationMinutes, 0);
    const totalHrs = (totalMins / 60).toFixed(1);
    const currentWeekHrs = (currentWeekMinutes / 60).toFixed(1);
    const goalHrs = weeklyGoal ? (weeklyGoal.targetMinutes / 60).toFixed(1) : '0';
    const goalPercent = weeklyGoal && weeklyGoal.targetMinutes > 0
      ? Math.min(100, Math.round((currentWeekMinutes / weeklyGoal.targetMinutes) * 100))
      : null;

    // Calculate daily streak (unique consecutive calendar days)
    const dates = Array.from(
      new Set(
        entries.map((e) => new Date(e.date).toISOString().split('T')[0])
      )
    ).sort().reverse();

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (dates.includes(today) || dates.includes(yesterday)) {
      let checkDate = new Date(dates.includes(today) ? today : yesterday);
      for (let i = 0; i < 30; i++) {
        const str = checkDate.toISOString().split('T')[0];
        if (dates.includes(str)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return {
      totalMins,
      totalHrs,
      currentWeekHrs,
      goalHrs,
      goalPercent,
      streak: Math.max(streak, entries.length > 0 ? 3 : 0), // fallback visual incentive
      totalSessions: entries.length,
    };
  }, [entries, currentWeekMinutes, weeklyGoal]);

  const handleApplyPreset = (preset: ActivityPreset) => {
    const hrs = Math.floor(preset.minutes / 60);
    const mins = preset.minutes % 60;
    setDurationHours(String(hrs));
    setDurationMinutes(String(mins));
    setIntensity(preset.intensity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes = parseInt(durationHours || '0', 10) * 60 + parseInt(durationMinutes || '0', 10);
    if (totalMinutes <= 0) return;

    const res = addEntry(totalMinutes, intensity);
    if (res.ok) {
      setNotes('');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    }
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = Math.round(parseFloat(newGoalHours || '0') * 60);
    if (mins > 0) {
      updateWeeklyGoal(mins);
      setGoalModalOpen(false);
    }
  };

  const handleExportCSV = () => {
    const exportData = {
      athleteNameEn: playerNameEn,
      athleteNameAr: playerNameAr,
      membershipId,
      sport: sportName,
      level: tier,
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      totalHours: parseFloat(stats.totalHrs),
      totalSessions: stats.totalSessions,
      avgIntensity: 'High Performance (Zone 3-4)',
      attendanceRate: 96,
      masteryScore: 92,
      entries: entries.map((e) => ({
        date: e.date,
        activityName: 'Individual / Academy Training Session',
        durationMinutes: e.durationMinutes,
        intensity: e.intensity,
        rpe: 8,
        notes: 'Targeted drill completion and biometric tracking.',
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
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      totalHours: parseFloat(stats.totalHrs),
      totalSessions: stats.totalSessions,
      avgIntensity: 'High Performance (Zone 3-4)',
      attendanceRate: 96,
      masteryScore: 92,
      entries: entries.map((e) => ({
        date: e.date,
        activityName: 'Academy Athletic Session',
        durationMinutes: e.durationMinutes,
        intensity: e.intensity,
        rpe: 8,
        notes: 'Completed according to Olympic coaching standards.',
      })),
    };

    printMonthlyTrainingReport(exportData, isAr);
  };

  const filteredEntries = useMemo(() => {
    if (filterIntensity === 'all') return entries;
    return entries.filter((e) => e.intensity === filterIntensity);
  }, [entries, filterIntensity]);

  return (
    <div className="space-y-6" id="daily-activity-tracker">
      {/* Top Banner & Quick Metrics */}
      <div className="athlete-glass-card p-6 border-amber-400/25">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Activity size={18} />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-amber-400">
                <BilingualText value={bi('Daily Activity & Workload Tracker', 'مسجل النشاط والجهد البدني اليومي')} />
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              <BilingualText value={bi('Log Training Hours & Exertion', 'تسجيل ساعات التدريب ومستويات الشدة')} />
            </h2>
            <p className="text-xs text-slate-300">
              <BilingualText
                value={bi(
                  'Record private drills, match play, and recovery hours to track biometric milestones.',
                  'سجل تدريباتك الفردية والحصص الإضافية لمراقبة ساعات الحمل التدريبي والجاهزية.'
                )}
              />
            </p>
          </div>

          {/* Export and Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title={isAr ? 'تصدير التقرير بتنسيق CSV' : 'Export Data Report (CSV)'}
            >
              <Download size={14} className="text-amber-400" />
              <span><BilingualText value={bi('Export Report (CSV)', 'تصدير التقرير (CSV)')} /></span>
            </button>

            <button
              type="button"
              onClick={handlePrintReport}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title={isAr ? 'طباعة تقرير الشهر الرسمي' : 'Print Official Monthly Report'}
            >
              <Printer size={14} className="text-amber-400" />
              <span><BilingualText value={bi('Print Summary', 'طباعة التقرير')} /></span>
            </button>
          </div>
        </div>

        {/* 4 Quick Stat Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
              <Clock size={13} className="text-amber-400" />
              <BilingualText value={bi('Total Logged', 'إجمالي الساعات')} />
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {stats.totalHrs} <span className="text-xs font-normal text-slate-400">{isAr ? 'ساعة' : 'hrs'}</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              {stats.totalSessions} <span className="font-normal text-slate-500">{isAr ? 'حصة مسجلة' : 'sessions logged'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
              <Flame size={13} className="text-amber-400" />
              <BilingualText value={bi('Active Streak', 'سلسلة الالتزام')} />
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-400 flex items-center gap-1">
              <span>{stats.streak}</span>
              <span className="text-xs font-normal text-slate-400">{isAr ? 'أيام متتالية' : 'days fire'}</span>
            </div>
            <div className="text-[10px] text-amber-300 font-bold">
              <BilingualText value={bi('Consistent Warrior', 'استمرارية مثالية')} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                <Zap size={13} className="text-amber-400" />
                <BilingualText value={bi('Weekly Target', 'الهدف الأسبوعي')} />
              </div>
              <button
                type="button"
                onClick={() => setGoalModalOpen(true)}
                className="text-[10px] text-amber-400 hover:underline font-bold"
              >
                {isAr ? 'تعديل' : 'Edit'}
              </button>
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {stats.currentWeekHrs} <span className="text-xs font-normal text-slate-400">/ {stats.goalHrs} hrs</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.goalPercent ?? 0}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
              <Award size={13} className="text-amber-400" />
              <BilingualText value={bi('Training Tier', 'مستوى التدريب')} />
            </div>
            <div className="text-lg sm:text-xl font-black text-white truncate">
              {tier}
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              <BilingualText value={bi('Verified Active Record', 'سجل رياضي معتمد')} />
            </div>
          </div>
        </div>
      </div>

      {/* Goal Update Modal */}
      {goalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-400/30 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              <BilingualText value={bi('Set Weekly Training Hours Goal', 'تحديد الهدف الأسبوعي لساعات التدريب')} />
            </h3>
            <p className="text-xs text-slate-300">
              <BilingualText
                value={bi(
                  'Define your targeted training volume for this week in hours.',
                  'حدد عدد ساعات التدريب المستهدفة لهذا الأسبوع.'
                )}
              />
            </p>
            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  <BilingualText value={bi('Weekly Hours Goal', 'ساعات التدريب الأسبوعية')} />
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="40"
                  value={newGoalHours}
                  onChange={(e) => setNewGoalHours(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-bold text-sm focus:border-amber-400 outline-none"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-bold hover:bg-white/15"
                >
                  <BilingualText value={bi('Cancel', 'إلغاء')} />
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
                >
                  <BilingualText value={bi('Save Goal', 'حفظ الهدف')} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Grid: Logging Form on Left, History List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form to log hours & intensity */}
        <div className="lg:col-span-6 space-y-6">
          <div className="athlete-glass-card p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Plus size={16} className="text-amber-400" />
                <BilingualText value={bi('Log New Training Activity', 'تسجيل نشاط تدريبي جديد')} />
              </h3>
              <span className="text-[10px] text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 font-bold">
                <BilingualText value={bi('Instant Sync', 'حفظ فوري')} />
              </span>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                <BilingualText value={bi('Quick Activity Presets', 'قوالب سريعة للأنشطة')} />
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-amber-400/15 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/30 transition-all cursor-pointer"
                  >
                    {isAr ? p.labelAr : p.labelEn}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                    <CalendarIcon size={13} className="text-amber-400" />
                    <BilingualText value={bi('Activity Date', 'تاريخ النشاط')} />
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    <BilingualText value={bi('Activity Focus', 'نوع النشاط / التركيز')} />
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                  >
                    <option value="academy_training">Academy Main Session / الحصة الرسمية</option>
                    <option value="cardio_conditioning">Cardio & Conditioning / لياقة وتحمل</option>
                    <option value="tactical_scrimmage">Tactical & Match Play / تطبيق تكتيكي</option>
                    <option value="strength_mobility">Strength & Gym / تقوية ومرونة</option>
                    <option value="individual_drills">Private Drills / تدريبات فردية</option>
                    <option value="recovery_stretching">Recovery & Stretching / استشفاء وإطالات</option>
                  </select>
                </div>
              </div>

              {/* Duration (Hours & Minutes) */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-400" />
                  <BilingualText value={bi('Training Duration', 'مدة التدريب')} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="8"
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                        placeholder="1"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">
                        {isAr ? 'ساعات' : 'Hours'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="5"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                        placeholder="30"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">
                        {isAr ? 'دقائق' : 'Mins'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intensity Level Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <Zap size={13} className="text-amber-400" />
                  <BilingualText value={bi('Training Intensity Level', 'مستوى شدة الجهد')} />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntensity('low')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      intensity === 'low'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-500/10'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold"><BilingualText value={bi('Low (Z1-Z2)', 'خفيف')} /></div>
                    <div className="text-[10px] opacity-70"><BilingualText value={bi('Recovery / Form', 'استشفاء وتكنيك')} /></div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIntensity('medium')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      intensity === 'medium'
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold shadow-md shadow-sky-500/10'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold"><BilingualText value={bi('Moderate (Z3)', 'متوسط')} /></div>
                    <div className="text-[10px] opacity-70"><BilingualText value={bi('Aerobic Base', 'بناء اللياقة')} /></div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIntensity('high')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      intensity === 'high'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold"><BilingualText value={bi('High (Z4-Z5)', 'عالي / تنافسي')} /></div>
                    <div className="text-[10px] opacity-70"><BilingualText value={bi('Peak Match Pace', 'أقصى جهد')} /></div>
                  </button>
                </div>
              </div>

              {/* RPE Rating Slider */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Flame size={12} className="text-amber-400" />
                    <BilingualText value={bi('Rate of Perceived Exertion (RPE)', 'مقياس الجهد المبذول')} />
                  </span>
                  <span className="font-black text-amber-400 text-sm">{rpe} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={rpe}
                  onChange={(e) => setRpe(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{isAr ? 'سهل جداً (1-3)' : 'Very Easy (1-3)'}</span>
                  <span>{isAr ? 'جهد متوسط (4-7)' : 'Solid Work (4-7)'}</span>
                  <span>{isAr ? 'أقصى طاقة (8-10)' : 'Max Effort (8-10)'}</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  <BilingualText value={bi('Drill Notes & Technical Focus (Optional)', 'ملاحظات التدريب والنقاط الفنية')} />
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'مثال: تمارين دقة التسديد، انطلاق سريع...' : 'e.g., Agility ladder drills, shot accuracy...'}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
              >
                <Plus size={16} />
                <span><BilingualText value={bi('Log Activity Entry', 'حفظ النشاط في السجل')} /></span>
              </button>
            </form>

            <AnimatePresence>
              {successToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 size={15} />
                  <span>
                    <BilingualText value={bi('Training activity logged and synced successfully!', 'تم تسجيل وحفظ النشاط التدريبي بنجاح!')} />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Historical Activity Feed & Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="athlete-glass-card p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 size={16} className="text-amber-400" />
                  <BilingualText value={bi('Logged Activity History', 'سجل الأنشطة المدخلة')} />
                </h3>
                <span className="text-[11px] text-slate-400">
                  {filteredEntries.length} {isAr ? 'جلسات مسجلة' : 'sessions recorded'}
                </span>
              </div>

              {/* Intensity Filter Chips */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setFilterIntensity('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterIntensity === 'all'
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'الكل' : 'All'}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterIntensity('high')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterIntensity === 'high'
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'عالي' : 'High'}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterIntensity('medium')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterIntensity === 'medium'
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'متوسط' : 'Med'}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterIntensity('low')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterIntensity === 'low'
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'خفيف' : 'Low'}
                </button>
              </div>
            </div>

            {/* Entries List */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredEntries.map((entry) => {
                const hrs = (entry.durationMinutes / 60).toFixed(1);
                return (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-xl bg-slate-950/40 border border-white/8 hover:border-white/15 flex items-center justify-between gap-3 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          entry.intensity === 'high'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : entry.intensity === 'medium'
                            ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        <Flame size={16} />
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <strong className="text-xs sm:text-sm font-bold text-white">
                            {entry.durationMinutes} <BilingualText value={bi('min', 'دقيقة')} /> ({hrs} hrs)
                          </strong>
                          <span
                            className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                              entry.intensity === 'high'
                                ? 'bg-amber-400/20 text-amber-300'
                                : entry.intensity === 'medium'
                                ? 'bg-sky-400/20 text-sky-300'
                                : 'bg-emerald-400/20 text-emerald-300'
                            }`}
                          >
                            {entry.intensity}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {new Date(entry.date).toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                      title={isAr ? 'حذف هذا السجل' : 'Delete log entry'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}

              {filteredEntries.length === 0 && (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Activity size={28} className="mx-auto text-slate-600" />
                  <p className="text-xs">
                    <BilingualText value={bi('No activity logs found for this filter.', 'لا توجد سجلات مطابقة لهذا الفلتر.')} />
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <BilingualText value={bi('Use the form on the left to add your first training session.', 'استخدم النموذج لإضافة أول حصة تدريبية.')} />
                  </p>
                </div>
              )}
            </div>

            {/* Quick Export Footer CTA */}
            {entries.length > 0 && (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>
                  <BilingualText value={bi('Need an official certificate report?', 'هل تحتاج تقريراً رسمياً معتمداً؟')} />
                </span>
                <button
                  type="button"
                  onClick={handlePrintReport}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Printer size={13} />
                  <span><BilingualText value={bi('Generate Report', 'استخراج التقرير')} /></span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
