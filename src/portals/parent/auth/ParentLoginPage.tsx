import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalAuthShell } from '../../shared/auth/PortalAuthShell';
import { PortalLoginForm } from '../../shared/auth/PortalLoginForm';

export function ParentLoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (uid: string) => {
    navigate('/parent');
  };

  return (
    <PortalAuthShell portal="parent">
      <PortalLoginForm
        onSuccess={handleSuccess}
        showPreviewSelect={true}
        previewOptions={[
          { id: 'parent-1', labelEn: 'Demo Parent', labelAr: 'ولي أمر تجريبي' }
        ]}
        onPreviewSelect={() => handleSuccess('preview')}
        phonePath="/parent/login" // just a dummy path for now
      />
    </PortalAuthShell>
  );
}
