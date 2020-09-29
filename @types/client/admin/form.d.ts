import { FormEvent } from "react";

export interface FieldItem {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  initialValue?: any;
}

export interface IFieldItemState {
  value: string | null | number | boolean;
}

export interface ICustomFormProps {
  items: Array<FieldItem>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export type ListAction = "edit" | "delete" | "show";

export interface IListActions {
  [key: number]: ListAction;
}

export interface IActionMenuState {
  opened: any;
}
export interface IActionMenuProps {
  url: string;
  actions: IListActions;
}
