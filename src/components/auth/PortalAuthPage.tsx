import React from 'react';
import { AdminLoginPage } from '../../portals/admin/auth/AdminLoginPage';
import { StoreLoginPage } from '../../portals/store/auth/StoreLoginPage';
import { ParentLoginPage } from '../../portals/parent/auth/ParentLoginPage';
import { CoachLoginPage } from '../../portals/coach/auth/CoachLoginPage';

type PortalAuthPageProps = {
  portal: 'admin' | 'store' | 'parent' | 'coach';
};

export function PortalAuthPage({ portal }: PortalAuthPageProps) {
  switch (portal) {
    case 'admin':
      return <AdminLoginPage />;
    case 'store':
      return <StoreLoginPage />;
    case 'parent':
      return <ParentLoginPage />;
    case 'coach':
      return <CoachLoginPage />;
    default:
      return null;
  }
}
