/**
 * Utility to generate and download monthly training summary reports
 */

export interface TrainingExportData {
  athleteNameEn: string;
  athleteNameAr: string;
  membershipId: string;
  sport: string;
  level: string;
  month: string;
  year: number;
  totalHours: number;
  totalSessions: number;
  avgIntensity: string;
  attendanceRate: number;
  masteryScore: number;
  entries: Array<{
    date: string;
    activityName: string;
    durationMinutes: number;
    intensity: string;
    rpe?: number;
    notes?: string;
  }>;
}

/**
 * Downloads a CSV formatted training log report
 */
export function exportMonthlyTrainingCSV(data: TrainingExportData): void {
  const headers = ['Date', 'Activity', 'Duration (Minutes)', 'Duration (Hours)', 'Intensity', 'RPE (1-10)', 'Notes'];
  
  const rows = data.entries.map((e) => [
    new Date(e.date).toLocaleDateString(),
    `"${(e.activityName || 'Training Session').replace(/"/g, '""')}"`,
    e.durationMinutes,
    (e.durationMinutes / 60).toFixed(2),
    e.intensity,
    e.rpe ?? 'N/A',
    `"${(e.notes || '').replace(/"/g, '""')}"`,
  ]);

  const summaryRows = [
    ['--- ATHLETE SUMMARY ---', '', '', '', '', '', ''],
    ['Athlete Name', `"${data.athleteNameEn} (${data.athleteNameAr})"`, '', '', '', '', ''],
    ['Member ID', `"${data.membershipId}"`, '', '', '', '', ''],
    ['Sport & Level', `"${data.sport} - ${data.level}"`, '', '', '', '', ''],
    ['Report Period', `"${data.month} ${data.year}"`, '', '', '', '', ''],
    ['Total Hours Logged', `${data.totalHours} hrs`, '', '', '', '', ''],
    ['Total Sessions', `${data.totalSessions}`, '', '', '', '', ''],
    ['Average Intensity', `"${data.avgIntensity}"`, '', '', '', '', ''],
    ['Attendance Rate', `${data.attendanceRate}%`, '', '', '', '', ''],
    ['Overall Mastery Score', `${data.masteryScore}/100`, '', '', '', '', ''],
    ['Generated On', `"${new Date().toLocaleString()}"`, '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['--- DAILY LOG ENTRIES ---', '', '', '', '', '', ''],
  ];

  const csvContent = [
    summaryRows.map((r) => r.join(',')).join('\n'),
    headers.join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `UOS_Training_Report_${data.athleteNameEn.replace(/\s+/g, '_')}_${data.month}_${data.year}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Opens a print-friendly, formatted HTML training report
 */
export function printMonthlyTrainingReport(data: TrainingExportData, isAr = false): void {
  const printWindow = window.open('', '_blank', 'width=900,height=750');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html lang="${isAr ? 'ar' : 'en'}" dir="${isAr ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8" />
      <title>United Olympics Sports - Training Summary Report</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Tajawal', sans-serif;
          color: #1e293b;
          margin: 0;
          padding: 32px;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 20px;
          margin-bottom: 24px;
        }
        .logo-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .badge {
          display: inline-block;
          background: #fef3c7;
          color: #92400e;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .meta-item label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
          display: block;
          margin-bottom: 2px;
        }
        .meta-item span {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .kpi-card {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
        }
        .kpi-card .val {
          font-size: 20px;
          font-weight: 800;
          color: #b45309;
        }
        .kpi-card .lbl {
          font-size: 11px;
          color: #475569;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          text-align: left;
        }
        html[dir="rtl"] th, html[dir="rtl"] td {
          text-align: right;
        }
        th {
          background: #f1f5f9;
          color: #334155;
          font-weight: 700;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .footer {
          margin-top: 40px;
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #64748b;
        }
        .sig-block {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
        }
        .sig-line {
          width: 200px;
          border-top: 1px solid #94a3b8;
          text-align: center;
          padding-top: 6px;
          font-size: 11px;
          color: #64748b;
        }
        @media print {
          body { padding: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo-title">UNITED OLYMPICS SPORTS</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
            ${isAr ? 'تقرير التدريب والأداء الرياضي الشهري' : 'Monthly Athletic Training & Performance Report'}
          </div>
        </div>
        <div>
          <span class="badge">${data.month} ${data.year}</span>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <label>${isAr ? 'اسم الرياضي' : 'Athlete Name'}</label>
          <span>${data.athleteNameEn} / ${data.athleteNameAr}</span>
        </div>
        <div class="meta-item">
          <label>${isAr ? 'رقم العضوية' : 'Membership ID'}</label>
          <span>${data.membershipId}</span>
        </div>
        <div class="meta-item">
          <label>${isAr ? 'الرياضة والمستوى' : 'Sport & Tier'}</label>
          <span>${data.sport} (${data.level})</span>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="val">${data.totalHours} hrs</div>
          <div class="lbl">${isAr ? 'إجمالي الساعات' : 'Total Hours'}</div>
        </div>
        <div class="kpi-card">
          <div class="val">${data.totalSessions}</div>
          <div class="lbl">${isAr ? 'الحصص المكتملة' : 'Completed Sessions'}</div>
        </div>
        <div class="kpi-card">
          <div class="val">${data.attendanceRate}%</div>
          <div class="lbl">${isAr ? 'نسبة الحضور' : 'Attendance Rate'}</div>
        </div>
        <div class="kpi-card">
          <div class="val">${data.masteryScore}/100</div>
          <div class="lbl">${isAr ? 'درجة الإتقان' : 'Mastery Score'}</div>
        </div>
      </div>

      <h3 style="font-size: 14px; margin-bottom: 8px; color: #0f172a;">
        ${isAr ? 'سجل الأنشطة والتدريبات اليومية' : 'Activity & Training Breakdown'}
      </h3>

      <table>
        <thead>
          <tr>
            <th>${isAr ? 'التاريخ' : 'Date'}</th>
            <th>${isAr ? 'نوع النشاط' : 'Activity / Drill'}</th>
            <th>${isAr ? 'المدة' : 'Duration'}</th>
            <th>${isAr ? 'الشدة' : 'Intensity'}</th>
            <th>${isAr ? 'الجهد (RPE)' : 'RPE (1-10)'}</th>
            <th>${isAr ? 'ملاحظات التكنيك' : 'Technical Notes'}</th>
          </tr>
        </thead>
        <tbody>
          ${data.entries.length > 0 ? data.entries.map((e) => `
            <tr>
              <td>${new Date(e.date).toLocaleDateString()}</td>
              <td>${e.activityName || 'Academy Drill Session'}</td>
              <td>${e.durationMinutes} min (${(e.durationMinutes / 60).toFixed(1)}h)</td>
              <td><span style="text-transform: capitalize; font-weight: 600;">${e.intensity}</span></td>
              <td>${e.rpe ? `${e.rpe}/10` : '-'}</td>
              <td>${e.notes || '-'}</td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="6" style="text-align: center; color: #94a3b8; padding: 16px;">
                ${isAr ? 'لا توجد سجلات تدريبية لهذا الشهر' : 'No recorded training entries for this period'}
              </td>
            </tr>
          `}
        </tbody>
      </table>

      <div class="sig-block">
        <div class="sig-line">${isAr ? 'توقيع المدرب المسؤول' : 'Head Coach Signature'}</div>
        <div class="sig-line">${isAr ? 'اعتماد الأكاديمية الأولمبية' : 'Academy Director Seal'}</div>
      </div>

      <div class="footer">
        <div>United Olympics Sports Academy • UAE • Official Verified Athletic Record</div>
        <div>${new Date().toLocaleDateString()}</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
