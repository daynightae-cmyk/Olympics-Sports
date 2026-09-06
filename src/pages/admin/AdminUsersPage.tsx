import { ArrowRight, Filter, Plus, Search, SlidersHorizontal, X, Shield, User as UserIcon } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, StatusBadge, UserAvatar } from '../../components/admin/AdminUI';
import { BilingualText, bi } from '../../components/bilingual/BilingualText';
import { useUsers } from '../../admin/data/adminHooks';

// In a real application, we would use the update hook from adminHooks.
// For this prototype, we'll manage local state to demonstrate dynamic toggling.
export function AdminUsersPage() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data } = useUsers({ page: 1, pageSize: 20 });
  
  // Local state for dynamic role toggling in the preview
  const [localUsers, setLocalUsers] = useState<any[]>([]);

  useEffect(() => {
    if (data?.items) {
      setLocalUsers(data.items);
    }
  }, [data]);

  const handleToggleRole = (userId: string, newRole: string) => {
    setLocalUsers(prev => prev.map(u => {
      if (u.id === userId) {
        // Simple toggle for the prototype: replace roles array with the new single role.
        return { ...u, roles: [newRole] };
      }
      return u;
    }));
  };

  const users = useMemo(() => localUsers.filter(user => {
    const matchesQuery = `${user.name.en} ${user.name.ar} ${user.email}`.toLowerCase().includes(query.toLowerCase());
    const matchesRole = role === 'all' || user.roles.some((r: string) => r.toLowerCase() === role);
    return matchesQuery && matchesRole && (status === 'all' || user.status === status);
  }), [localUsers, query, role, status]);

  return (
    <div className="admin-page">
      <PageHeader 
        eyebrow={bi('Access Management', 'إدارة الوصول')} 
        title={bi('Users & Roles', 'المستخدمون والصلاحيات')} 
        description={bi('Preview of administrative users and role assignments.', 'معاينة للمستخدمين الإداريين وتخصيص الأدوار.')} 
        actions={
          <button className="admin-primary-button" onClick={() => setShowForm(true)}>
            <Plus />
            <BilingualText value={bi('Add User', 'إضافة مستخدم')} />
          </button>
        } 
      />

      <section className="player-filter-bar">
        <label className="filter-search">
          <Search />
          <span className="sr-only">Search Users | البحث عن المستخدمين</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Users | البحث عن المستخدمين" />
        </label>
        <button className="filter-drawer-button" onClick={() => setFiltersOpen(!filtersOpen)}>
          <Filter />
          <BilingualText value={bi('Filters', 'الفلاتر')} />
        </button>

        <div className={`filter-fields ${filtersOpen ? 'open' : ''}`}>
          <label>
            <BilingualText value={bi('Role', 'الدور')} />
            <select value={role} onChange={event => setRole(event.target.value)}>
              <option value="all">All Roles | كل الأدوار</option>
              <option value="admin">Admin | مدير</option>
              <option value="manager">Manager | مشرف</option>
              <option value="coach">Coach | مدرب</option>
              <option value="viewer">Viewer | مشاهد</option>
              <option value="player">Player | لاعب</option>
            </select>
          </label>
          <label>
            <BilingualText value={bi('Status', 'الحالة')} />
            <select value={status} onChange={event => setStatus(event.target.value)}>
              <option value="all">All Statuses | كل الحالات</option>
              <option value="active">Active | نشط</option>
              <option value="inactive">Inactive | غير نشط</option>
            </select>
          </label>
          <span className="result-count">
            <SlidersHorizontal />
            <BilingualText value={bi(`${users.length} preview records`, `${users.length} سجلات تجريبية`)} />
          </span>
        </div>
      </section>

      <section className="player-table-wrap">
        <table className="player-table">
          <caption className="sr-only">Users Directory | دليل المستخدمين</caption>
          <thead>
            <tr>
              {[
                bi('Avatar', 'الصورة'), 
                bi('Name', 'الاسم'), 
                bi('Email', 'البريد'), 
                bi('Roles', 'الأدوار'), 
                bi('Status', 'الحالة'), 
                bi('Assign Role', 'تخصيص الدور'), 
                bi('Actions', 'الإجراءات')
              ].map(label => (
                <th key={label.en} scope="col">
                  <BilingualText value={label} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const isAdmin = user.roles.includes('admin');
              const isPlayer = user.roles.includes('player');
              return (
                <tr key={user.id}>
                  <td><UserAvatar name={user.name.en} /></td>
                  <td><BilingualText value={user.name} /></td>
                  <td><code>{user.email}</code></td>
                  <td>
                    {user.roles.map((r: string) => (
                      <span key={r} className="role-badge">
                        <BilingualText value={{ en: r, ar: r }} />
                      </span>
                    ))}
                  </td>
                  <td><StatusBadge active={user.status === 'active'} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleToggleRole(user.id, 'admin')}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${isAdmin ? 'bg-[#d8b35a]/10 text-[#d8b35a] border border-[#d8b35a]/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
                      >
                        <Shield size={14} />
                        Admin
                      </button>
                      <button 
                        onClick={() => handleToggleRole(user.id, 'player')}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${isPlayer ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
                      >
                        <UserIcon size={14} />
                        Player
                      </button>
                    </div>
                  </td>
                  <td>
                    <Link className="row-action" to={`/admin/users/${user.id}`} aria-label={`Open ${user.name.en} | فتح ${user.name.ar}`}>
                      <ArrowRight />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Mobile view logic omitted for brevity as the request emphasizes the core feature toggle design */}
      
      {showForm && (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={() => setShowForm(false)}>
          <section className="admin-modal" role="dialog" aria-modal="true" aria-label="Add User Preview Form | نموذج معاينة إضافة مستخدم" onMouseDown={event => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <BilingualText value={bi('Add User', 'إضافة مستخدم')} />
                <small><BilingualText value={bi('Local Preview State Only', 'حالة معاينة محلية فقط')} /></small>
              </div>
              <button className="admin-icon-button" onClick={() => setShowForm(false)} aria-label="Close | إغلاق">
                <X />
              </button>
            </div>
            
            <div className="preview-warning">
              <BilingualText value={bi('This form does not save to a database. It prepares the future data-entry experience only.', 'هذا النموذج لا يحفظ في قاعدة بيانات. إنه يجهز تجربة إدخال البيانات المستقبلية فقط.')} />
            </div>

            <div className="preview-form-grid">
              <label>
                <BilingualText value={bi('Name', 'الاسم')} />
                <input placeholder="Preview name | اسم تجريبي" />
              </label>
              <label>
                <BilingualText value={bi('Email', 'البريد الإلكتروني')} />
                <input type="email" placeholder="user@example.com" />
              </label>
              <label>
                <BilingualText value={bi('Roles', 'الأدوار')} />
                <select multiple>
                  <option>admin</option>
                  <option>manager</option>
                  <option>coach</option>
                  <option>viewer</option>
                  <option>player</option>
                </select>
              </label>
              <label>
                <BilingualText value={bi('Status', 'الحالة')} />
                <select>
                  <option value="active">Active | نشط</option>
                  <option value="inactive">Inactive | غير نشط</option>
                </select>
              </label>
            </div>
            
            <button className="admin-secondary-button" onClick={() => setShowForm(false)}>
              <BilingualText value={bi('Close Preview Form', 'إغلاق نموذج المعاينة')} />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
