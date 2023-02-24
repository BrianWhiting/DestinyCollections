export const createLocalStorageHelper = (key: string) => {
  const save = (value: string | null) => {
    if (value === null) {
      remove();
    }
    else {
      localStorage.setItem(key, value);
    }
  };

  const load = () => {
    return localStorage.getItem(key);
  };

  const remove = () => {
    localStorage.removeItem(key);
  };

  return {
    save,
    load,
    remove,
  };
};

export const createLocalStorageHelperWithSerialization = <T>(key: string) => {
  const localStorageHelper = createLocalStorageHelper(key);

  const save = (value: T | null) => {
    if (value === null) {
      localStorageHelper.remove();
    }
    else {
      const json = JSON.stringify(value);
      localStorageHelper.save(json);
    }
  };

  const load = () => {
    const json = localStorageHelper.load();
    if (json === null) {
      return null;
    }
    else {
      const value = JSON.parse(json) as T;
      return value;
    }
  };

  const remove = () => {
    localStorageHelper.remove();
  };

  return {
    save,
    load,
    remove,
  };
};