import { useState } from 'react';
import { Translation } from '@/types/app';

export function useTranslations() {
  const [translations, setTranslations] = useState<Translation[]>([
    {
      id: '1',
      type: 'signs-to-text',
      input: 'Señas de saludo',
      output: 'Hola, ¿cómo estás?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'text-to-signs',
      input: 'Gracias por tu ayuda',
      output: 'Señas de agradecimiento',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'audio-to-signs',
      input: 'Buenos días',
      output: 'Señas de saludo matutino',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);

  const addTranslation = (translation: Omit<Translation, 'id' | 'timestamp'>) => {
    const newTranslation: Translation = {
      ...translation,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setTranslations(prev => [newTranslation, ...prev]);
  };

  const clearHistory = () => {
    setTranslations([]);
  };

  return {
    translations,
    addTranslation,
    clearHistory,
  };
}