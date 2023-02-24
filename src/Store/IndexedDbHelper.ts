import { del, get, set } from 'idb-keyval';

export const createIndexedDbHelper = <T>(key: string) => {
  const save = async (value: T | null) => {
    if (value === null) {
      await remove();
    }
    else {
      await set(key, value);
    }
  };

  const load = async () => {
    const value = await get(key) as T | undefined ?? null;
    return value;
  };

  const remove = async () => {
    await del(key);
  };

  return {
    save,
    load,
    remove,
  };
};