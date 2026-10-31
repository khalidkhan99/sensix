'use client';

import { useEffect } from 'react';

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[SensiX SW] Registered successfully with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[SensiX SW] Registration failed:', err);
        });
    }
  }, []);

  return null;
}
