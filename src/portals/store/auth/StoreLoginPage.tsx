import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalAuthShell } from '../../shared/auth/PortalAuthShell';
import { PortalLoginForm } from '../../shared/auth/PortalLoginForm';

export function StoreLoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (uid: string) => {
    navigate('/store'); // Store portal might not exist, but we have the login page.
  };

  return (
    <PortalAuthShell portal="store">
      <PortalLoginForm
        onSuccess={handleSuccess}
        showPreviewSelect={false}
      />
    </PortalAuthShell>
  );
}
