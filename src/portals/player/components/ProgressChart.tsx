import React, { useMemo } from 'react';
import type { AttendanceRecord } from '../../../domain/contracts';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

interface ProgressChartProps {
  records: AttendanceRecord[];
}

type AttendanceBar = {
  date: string;
  label: string;
  count: number;
};

export function ProgressChart({ records }: ProgressChartProps) {
  const data = useMemo<AttendanceBar[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bars: AttendanceBar[] = Array.from({ length: 30 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (29 - index));
      return {
        date: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        count: 0,
      };
    });

    const byDate = new Map(bars.map((bar) => [bar.date, bar]));
    records.forEach((record) => {
      if (record.status !== 'present' && record.status !== 'late') return;
      const parsedDate = new Date(record.date);
      if (Number.isNaN(parsedDate.getTime())) return;
      const key = parsedDate.toISOString().slice(0, 10);
      const bar = byDate.get(key);
      if (bar) bar.count += 1;
    });

    return bars;
  }, [records]);

  const max = Math.max(0, ...data.map((item) => item.count));
  const hasRecordedAttendance = max > 0;

  return (
    <section className="athlete-glass-card p-5" aria-labelledby="player-attendance-frequency-title">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 id="player-attendance-frequency-title" className="text-sm font-bold text-white">
            <BilingualText value={bi('Recorded Attendance Frequency', 'تكرار الحضور المسجل')} />
          </h3>
          <p className="mt-1 text-[11px] text-slate-400">
            <BilingualText value={bi('Last 30 days from available attendance records.', 'آخر 30 يومًا وفق سجلات الحضور المتاحة.')} />
          </p>
        </div>
      </div>

      {!hasRecordedAttendance ? (
        <div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
          <p className="max-w-sm text-xs leading-relaxed text-slate-400">
            <BilingualText value={bi('No recorded attendance is available for this period.', 'لا توجد سجلات حضور متاحة لهذه الفترة.')} />
          </p>
        </div>
      ) : (
        <div className="h-52 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickMargin={8} minTickGap={15} />
              <YAxis hide={true} domain={[0, 'dataMax']} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fbbf24' }}
              />
              <Bar dataKey="count" fill="#fbbf24" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="sr-only">
        {data.map((item) => `${item.label}: ${item.count}`).join(', ')}
      </div>
    </section>
  );
}