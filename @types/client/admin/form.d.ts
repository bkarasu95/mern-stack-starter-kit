import { FormEvent } from "react";
import { Message } from "./redux";

export interface FieldItem {
  label?: string;
  type: "number" | "text" | "switch" | "image" | "wysiwyg";
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

export interface ICustomFormState {
  dontRedirect: boolean
}

export type ListAction = "edit" | "delete" | "show";

export interface IListActions {
  [key: number]: ListAction;
}

export interface IActionMenuState {
  opened: any;
  dialogOpened: boolean;
}
export interface IActionMenuProps {
  url: string;
  actions: IListActions;
  actionResult: (result: boolean) => void
}

export interface IResultMessageBoxProps {
  result: Message | null
}

export interface IResourceGetRequestParams {
  limit?: number;
  start?: number;
  orderBy?: string;
  search?: string;
}