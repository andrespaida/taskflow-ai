import { useCallback, useState } from 'react';

export function useLiveAnnouncer() {
  const [message, setMessage] = useState('');

  const announce = useCallback((text: string) => {
    setMessage('');
    requestAnimationFrame(() => setMessage(text));
  }, []);

  return { message, announce };
}
