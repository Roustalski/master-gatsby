import { ChangeEvent, useState } from "react";
import DynamicForm from "../types/dynamic-form";

const useForm = (defaults: DynamicForm) => {
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
