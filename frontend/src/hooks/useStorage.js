import { useState, useEffect } from 'react';

export default function useStorage(storage, key) {
  const [value, setValue] = useState(JSON.parse(storage.getItem(key)));

  useEffect(() => {
    if (value === null) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, JSON.stringify(value));
  }, [value, storage, key]);

  return [value, setValue];
}
