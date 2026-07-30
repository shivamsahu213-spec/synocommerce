/**
 * Admin Authentication & Context Provider
 * @module apps/admin/src/providers/auth-provider
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserResponseDto } from '@/modules/iam';

export interface AuthContextType {
  user: UserResponseDto | null;
  isAuthenticated: boolean;
  activeTenant: string;
  activeStore: string;
  setTenant: (tenant: string) => void;
  setStore: (store: string) => void;
  login: (user: UserResponseDto) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponseDto | null>({
    id: 'usr_admin_001',
    email: 'admin@synocommerce.com',
    firstName: 'System',
    lastName: 'Admin',
    status: 'ACTIVE',
    isEmailVerified: true,
    isMfaEnabled: false,
    roles: ['admin'],
  });
  const [activeTenant, setTenant] = useState<string>('tenant-main');
  const [activeStore, setStore] = useState<string>('store-us-east');

  const login = (newUser: UserResponseDto) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.roles.includes('admin')) return true;
    return true; // Simplified permission check for admin UI
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeTenant,
        activeStore,
        setTenant,
        setStore,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
