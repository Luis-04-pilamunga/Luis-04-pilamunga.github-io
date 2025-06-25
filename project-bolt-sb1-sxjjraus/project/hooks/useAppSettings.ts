import { useState, useEffect } from 'react';
import { AppSettings, Theme, FontFamily } from '@/types/app';

const defaultSettings: AppSettings = {
  theme: 'light',
  fontFamily: 'Inter',
  fontSize: 16,
};

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const updateTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updateFontFamily = (fontFamily: FontFamily) => {
    setSettings(prev => ({ ...prev, fontFamily }));
  };

  const updateFontSize = (fontSize: number) => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const getThemeColors = () => {
    switch (settings.theme) {
      case 'dark':
        return {
          background: '#0F172A',
          surface: '#1E293B',
          primary: '#3B82F6',
          secondary: '#64748B',
          text: '#F8FAFC',
          textSecondary: '#CBD5E1',
          border: '#334155',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        };
      case 'high-contrast':
        return {
          background: '#000000',
          surface: '#FFFFFF',
          primary: '#0000FF',
          secondary: '#666666',
          text: '#000000',
          textSecondary: '#333333',
          border: '#000000',
          success: '#008000',
          warning: '#FF8000',
          error: '#FF0000',
        };
      default: // light
        return {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          primary: '#3B82F6',
          secondary: '#64748B',
          text: '#0F172A',
          textSecondary: '#475569',
          border: '#E2E8F0',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        };
    }
  };

  const getFontFamily = () => {
    switch (settings.fontFamily) {
      case 'OpenSans':
        return {
          regular: 'OpenSans-Regular',
          medium: 'OpenSans-Medium',
          semiBold: 'OpenSans-SemiBold',
          bold: 'OpenSans-Bold',
        };
      case 'Roboto':
        return {
          regular: 'Roboto-Regular',
          medium: 'Roboto-Medium',
          semiBold: 'Roboto-Medium',
          bold: 'Roboto-Bold',
        };
      default: // Inter
        return {
          regular: 'Inter-Regular',
          medium: 'Inter-Medium',
          semiBold: 'Inter-SemiBold',
          bold: 'Inter-Bold',
        };
    }
  };

  return {
    settings,
    updateTheme,
    updateFontFamily,
    updateFontSize,
    getThemeColors,
    getFontFamily,
  };
}