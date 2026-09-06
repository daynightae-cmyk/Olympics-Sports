import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalAuthShell } from '../../shared/auth/PortalAuthShell';
import { PortalLoginForm } from '../../shared/auth/PortalLoginForm';

export function AdminLoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (uid: string) => {
    navigate('/admin/dashboard');
  };

  return (
    <PortalAuthShell portal="admin">
      <PortalLoginForm
        onSuccess={handleSuccess}
        showPreviewSelect={true}
        previewOptions={[
          { id: 'admin-1', labelEn: 'Super Admin', labelAr: 'مدير النظام' },
          { id: 'admin-2', labelEn: 'Manager', labelAr: 'مدير' }
        ]}
        onPreviewSelect={() => handleSuccess('preview')}
      />
    </PortalAuthShell>
  );
}
