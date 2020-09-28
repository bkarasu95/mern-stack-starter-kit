import { FormEvent } from "react";

export interface FieldItem {
  label: string;
  type: string;
  name: string;
}

export interface ICustomFormProps {
  items: Array<FieldItem>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
