import { ChangeEvent, useCallback, useState } from "react";

type UseInputReturnType = [
  string,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (value: string) => void
];

const useInput = (initialValue: string): UseInputReturnType => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return [value, handleChange, setValue];
};

export default useInput;