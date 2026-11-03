import { useState, useCallback } from 'react';

export function useFileBuffer() {
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);

  const loadFile = useCallback(async (file?: File) => {
    if (!file) {
      setBuffer(null);
      return;
    }

    try {
      const data = await file.arrayBuffer();
      setBuffer(data);
    } catch {
      setBuffer(null);
    }
  }, []);

  const reset = useCallback(() => {
    setBuffer(null);
  }, []);

  return {
    buffer,
    loadFile,
    reset,
  };
}
