import { ChangeEvent, useState } from "react";

const useForm = (defaults: any) => {
  const [values, setValues] = useState(defaults);

  function updateValue(e: ChangeEvent<HTMLInputElement>) {
    let value: string | number = e.target.value;
    if (e.target.type === "number") {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
};

export default useForm;
