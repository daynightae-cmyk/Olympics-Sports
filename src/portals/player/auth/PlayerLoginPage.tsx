import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerSession } from '../PlayerSessionContext';
import { PortalAuthShell } from '../../shared/auth/PortalAuthShell';
import { PortalLoginForm } from '../../shared/auth/PortalLoginForm';

export function PlayerLoginPage() {
  const { allPlayers, login } = usePlayerSession();
  const navigate = useNavigate();

  const handleSuccess = (uid: string) => {
    login(allPlayers[0]?.id || 'player-demo-001');
    navigate('/player/home');
  };

  const handlePreviewSelect = (id: string) => {
    login(id);
    navigate('/player/home');
  };

  const previewOptions = allPlayers.map((p) => ({
    id: p.id,
    labelEn: `${p.nameEn} (${p.sportId.toUpperCase()})`,
    labelAr: p.nameAr,
  }));

  return (
    <PortalAuthShell portal="player">
      <PortalLoginForm
        onSuccess={handleSuccess}
        showPreviewSelect={true}
        previewOptions={previewOptions}
        onPreviewSelect={handlePreviewSelect}
        phonePath="/player/phone"
      />
    </PortalAuthShell>
  );
}
