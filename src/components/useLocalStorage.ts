import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValues: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValues === "function") {
        return (initialValues as () => T)();
      } else {
        return initialValues;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);
  return [value, setValue] as [T, typeof setValue];
}
