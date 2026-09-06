import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalAuthShell } from '../../shared/auth/PortalAuthShell';
import { PortalLoginForm } from '../../shared/auth/PortalLoginForm';

export function CoachLoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (uid: string) => {
    navigate('/coach');
  };

  return (
    <PortalAuthShell portal="coach">
      <PortalLoginForm
        onSuccess={handleSuccess}
        showPreviewSelect={true}
        previewOptions={[
          { id: 'coach-1', labelEn: 'Demo Coach', labelAr: 'مدرب تجريبي' }
        ]}
        onPreviewSelect={() => handleSuccess('preview')}
        phonePath="/coach/login"
      />
    </PortalAuthShell>
  );
}
